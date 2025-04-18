import { ChangeEvent, useEffect, useRef, useState } from "react";
import Loader from "../../../../common/Loader/Loader2";
import Select, { StylesConfig } from 'react-select';
import { motion } from 'framer-motion';
import DatasetList from "./DatasetList";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import { FaFileUpload } from "react-icons/fa";

interface DatasetGroup {
  id: number;
  categoryName: string;
  dataset : DataSets[]
}

interface DataSets {
  id: number;
  title: string;
  img: string;
}

interface DatasetCategory {
  id: number;
  categoryName: string;
}

interface Series {
  name: string;
  data: number[];
}

function Datasets() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("APIToken");

  const { dataset } = useParams();



  const [sort, setSort] = useState<any>(null);

  const [dataSetGroup, setDataSetGroup] = useState<DatasetGroup[]>([]);
  const [dataSet, setDataSet] = useState<DataSets[]>([]);

  const [datasetCategory, setDatasetCategory] = useState<DatasetCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const [errorMessage, seterrorMessage] = useState<string>("");

  const [modal, setmodal] = useState(false);

  const hasFetched = useRef(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("Select Excel file");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    category: false,
    file: false,
    image: false,
  });



  // Define adminStatus variable here
  const adminStatus = localStorage.getItem('isAdmin') === 'true';

 const openModal = () =>{
    setmodal(true);
    setFile(null);
    setImage(null);
    setPreview(null);
 }


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };


  useEffect(() => {
    if (!hasFetched.current) {
      fetchDataSets();
      fetchCategoryList();
      hasFetched.current = true;
    }
  }, []);

  const fetchDataSets = async () => {
    seterrorMessage("");
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/Dataset/GetAllDataSets`);

      if (!response.ok) {
        seterrorMessage("No Dataset found");
        return;
      }

      const jsonresult: DatasetGroup[] = await response.json();
      setDataSetGroup(jsonresult);

    } catch (error) {
      console.error(error);
      seterrorMessage("Failed to fetch dataset from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  }, [dataSet]);

  const handleSort = (selected: any) => {
    setSort(selected);
  };

  
  const categoryList = datasetCategory.map((category) => ({
    value: category.id,
    label: category.categoryName,
  }));

  const sortOptions = [
    { label: 'Title (A-Z)', value: 'title_asc' },
    { label: 'Title (Z-A)', value: 'title_desc' },
  ];

  useEffect(() => {
    if (sort) {
      const sortedData = [...dataSet];
      if (sort.value === 'title_asc') {
        sortedData.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort.value === 'title_desc') {
        sortedData.sort((a, b) => b.title.localeCompare(a.title));
      }
      setDataSet(sortedData);
    }
  }, [sort, dataSet]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      const file = event.target.files[0];
      setFileName(file.name);
      setFile(selectedFile);
    }else {
      setFileName("Select Excel file");
    }
  };

  const isExist = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('Id', selectedCategory.value);
    formData.append('img', image)
 
    try {

      if (!token) {
        console.error("No token found, ");
        return Swal.fire({
          icon: 'error',
          title: 'No token found',
          text: 'User is not authenticated. Please try again.',
          confirmButtonColor: '#2591DE',
        });
	    }

      const response = await fetch(`${apiUrl}/api/Dataset/isExist`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        handleFileUpload();
      } else {
        const jsonresult = await response.json();
        if (jsonresult.code === 400) {
                const swalWithTailwindButtons = Swal.mixin({
                  customClass: {
                    confirmButton: "bg-primary text-white py-2 px-4 rounded-md focus:outline-none m-2", 
                    cancelButton: "bg-gray-500 text-white py-2 px-4 rounded-md focus:outline-none m-2",
                  },
                  buttonsStyling: false,
                });
              
                swalWithTailwindButtons
                  .fire({
                    title: "The dataset already exists",
                    text: jsonresult.message.toString(),
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes",
                    cancelButtonText: "No",
                    reverseButtons: true,
                  })
                  .then((result) => {
                    if (result.isConfirmed) {
                      setmodal(false);
                      handleFileUpload(file);
                    }
                  });
        }
      }


    } catch (error) {
      console.error('Upload error:', error);
      Swal.fire({
        title: 'Dataset Upload Failed',
        text: 'Error uploading file.',
        icon: 'error',
        confirmButtonColor: '#2591DE',
      });
    } finally {
     // swalLoading.close();
     setmodal(false);
    }
  };




  const handleFileUpload = async () => {
    const swalLoading = Swal.fire({
      title: 'Uploading...',
      text: 'Please wait while the dataset is uploading.',
      icon: '',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      backdrop: `rgba(0,0,0,0.4) url("https://loading.io/spinners/comets/index.svg?color=%2317C0CC") left top no-repeat`,
      customClass: {
        popup: 'swal-popup',
      },
      showConfirmButton: false,
    });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('Id', selectedCategory.value);
    formData.append('img', image)

    try {

      if (!token) {
        console.error("No token found, ");
        return Swal.fire({
          icon: 'error',
          title: 'No token found',
          text: 'User is not authenticated. Please try again.',
          confirmButtonColor: '#2591DE',
        });
	    }

      const response = await fetch(`${apiUrl}/api/Dataset/UploadExcel`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        Swal.fire({
          title: 'Success!',
          text: 'File uploaded successfully.',
          icon: 'success',
          confirmButtonColor: '#2591DE',
          timer: 3000,
          willClose: () => {
            fetchDataSets();
          }
        });

      } else {
        Swal.fire({
          title: 'Dataset Upload Failed',
          text: 'Error uploading file.',
          icon: 'error',
          confirmButtonColor: '#2591DE',
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      Swal.fire({
        title: 'Dataset Upload Failed',
        text: 'Error uploading file.',
        icon: 'error',
        confirmButtonColor: '#2591DE',
      });
    } finally {
      swalLoading.close();
      setmodal(false);
    }
  };
  
  const fetchCategoryList = async () => {

    try {
      const response = await fetch(`${apiUrl}/api/Dataset/CategoryList`);

      if (response.ok) {
        const jsonresult: DatasetCategory[] = await response.json();
        setDatasetCategory(jsonresult);
      }
  
    } catch (error) {
      console.error(error)
    }

  }



  
  const save = async (e: React.FormEvent) =>{
    e.preventDefault();

    const newErrors = {
      category: !selectedCategory,
      file: !file,
      image: !image,
    };
  
    setErrors(newErrors);
  
    const hasErrors = Object.values(newErrors).some((v) => v);
    if (hasErrors) return;
  
    isExist();
  }

  return (
    <>
    <div className="bg-white lg:min-h-[90vh]">
      <div className="bg-primary text-left py-8">
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <h1 className={`text-2xl font-bold text-left text-white px-3 ${adminStatus ? 'lg:px-5' : 'lg:px-40'}  `}>Datasets</h1>
        </motion.div>
      </div>

      <div className={`px-0 mt-5 ${adminStatus ? 'lg:px-10' : 'lg:px-40'}`}>
        <div className="block md:flex md:items-center md:justify-end sm:flex-wrap border-b border-gray-300">
          <div className="flex items-center justify-center py-1 mx-1">
            {/* <Select
              id="SortID"
              placeholder="Sort By"
              value={sort}
              onChange={handleSort}
              options={sortOptions}
              styles={customStyles}
              isClearable={true}
              className="text-sm w-full md:w-auto z-10"
            /> */}
          </div>
          <div className={`${adminStatus ? 'block' : 'hidden'} flex justify-end my-3 mx-1`}>
              <button
                className="flex items-center gap-3 bg-primary text-white px-4 py-2 rounded-md hover:bg-[#139B99]"
                //onClick={() => document.getElementById('fileInput')?.click()}
                onClick={() => openModal(true)}
              >
                Upload
              </button>

              <input
                id="fileInput"
                type="file"
                accept=".xlsx, .xls"
                className="hidden"
                onChange={handleFileChange}
              />
          </div>
        </div>

        {loading ? (
          <div><Loader /></div>
        ) : (
          errorMessage ? (
            <div className='w-[100%] text-center py-20 text-gray-400 font-bold text-lg'>
            {errorMessage}
          </div>
          ) : (
            <DatasetList dataSets={dataSetGroup} fetchDataSets={fetchDataSets} /> // Display dataset list if no error
          )
        )}

      </div>
    </div>


        {modal && (
      <div className="fixed inset-0 text-sm flex justify-center items-center bg-gray-600 bg-opacity-50 z-[9999]">
        <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-5 px-10 text-lg">
          <h2 className="text-2xl font-bold mb-4">Upload Dataset</h2>
          
          <form onSubmit={save} className="w-full">

            {/* Category Selection */}
            <section className="mt-10 flex flex-col">
            <Select
              id="category"
              placeholder="Choose Sector"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e)}
              options={categoryList}
              styles={customStyles}
              className={`text-sm w-full md:w-full mx-1 ${errors.category ? 'border border-red-500 rounded' : ''}`}
            />
            {errors.category && <p className="text-red-500 text-xs mt-1 ml-1">Category is required.</p>}
            </section>

            {/* File Upload */}
            <section className="my-5 ml-1">
            <label
                htmlFor="fileInput"
                className={`flex items-center gap-3 px-4 py-2 border border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors ${
                  errors.file ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <FaFileUpload color="green" />
                <span className="text-sm text-gray-600 truncate w-48">{fileName}</span>
                <input
                  id="fileInput"
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {errors.file && <p className="text-red-500 text-xs mt-1">Excel File is required.</p>}
            </section>

            <section>
            <div className="flex flex-col gap-2 items-start">
                <label className={`w-64 h-64 border border-dashed rounded flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                  errors.image ? 'border-red-500' : 'border-gray-400'
                }`}>
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-500 text-sm text-center px-4">
                      Click to upload an image
                    </span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {errors.image && <p className="text-red-500 text-xs">Image is required.</p>}
              </div>
            </section>

            <section className="mt-3 flex justify-end">
              <button
                type="submit"
                className="mt-4 py-2 bg-primary text-white rounded-sm px-5 mx-1"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setmodal(false)}
                className="mt-4 py-2 bg-gray-400 text-white rounded-sm px-5 mx-1"
              >
                Close
              </button>
            </section>

          </form>
        </div>
      </div>
    )}

    </>
  );
}

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    fontSize: '1rem',
    border: "2px solid #2591DE",
    boxShadow: 'none',
    minWidth: '200px',
    width: '100%',
    '&:hover': {
      borderColor: "#2591DE",
    },
    '&:focus': {
      borderColor: "#2591DE",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.9rem',
    backgroundColor: state.isSelected ? "#2591DE" : 'transparent',
    color: state.isSelected ? '#fff' : '#000',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#2591DE",
      color: '#fff',
    },
  }),
};

export default Datasets;
