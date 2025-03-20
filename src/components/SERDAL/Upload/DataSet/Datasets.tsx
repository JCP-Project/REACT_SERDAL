import { useEffect, useRef, useState } from "react";
import Loader from "../../../../common/Loader/Loader2";
import Select, { StylesConfig } from 'react-select';
import { motion } from 'framer-motion';
import DatasetList from "./DatasetList";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';

interface DataSets {
  title: string;
  dataGroup: DataGroup[]; 
}

interface DataGroup {
  production: string;
  description: string;
  dataYear: string[];
  series: Series[];
}

interface Series {
  name: string;
  data: number[];
}

function Datasets() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { dataset } = useParams();

  const [sort, setSort] = useState<any>(null);
  const [dataSet, setDataSet] = useState<DataSets[]>([]);
  const [errorMessage, seterrorMessage] = useState<string>("");

  const hasFetched = useRef(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  // Define adminStatus variable here
  const adminStatus = sessionStorage.getItem('isAdmin') === 'true';

  useEffect(() => {
    if (!hasFetched.current) {
      fetchDataSets();
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

      const jsonresult: DataSets[] = await response.json();
      setDataSet(jsonresult);

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
      setFile(selectedFile);

      isExist(selectedFile);
      event.target.value = '';
    }
  };


  const isExist = async (file: File) => {
        const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(`${apiUrl}/api/Dataset/isExist`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        handleFileUpload(file);
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
        confirmButtonColor: '#17C0CC',
      });
    } finally {
     // swalLoading.close();
    }
  };




  const handleFileUpload = async (file: File) => {
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

    try {
      const response = await fetch(`${apiUrl}/api/Dataset/UploadExcel`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();

        Swal.fire({
          title: 'Success!',
          text: 'File uploaded successfully.',
          icon: 'success',
          confirmButtonColor: '#17C0CC',
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
          confirmButtonColor: '#17C0CC',
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      Swal.fire({
        title: 'Dataset Upload Failed',
        text: 'Error uploading file.',
        icon: 'error',
        confirmButtonColor: '#17C0CC',
      });
    } finally {
      swalLoading.close();
    }
  };

  return (
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
            <Select
              id="SortID"
              placeholder="Sort By"
              value={sort}
              onChange={handleSort}
              options={sortOptions}
              styles={customStyles}
              isClearable={true}
              className="text-sm w-full md:w-auto z-10"
            />
          </div>
          <div className={`${adminStatus ? 'block' : 'hidden'} flex justify-end my-3 mx-1`}>
              <button
                className="flex items-center gap-3 bg-[#17C0CC] text-white px-4 py-2 rounded-md hover:bg-[#139B99]"
                onClick={() => document.getElementById('fileInput')?.click()}
              >
                <FontAwesomeIcon icon={faAdd} className="cursor-pointer" />
                Upload Dataset
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
            <DatasetList dataSets={dataSet} fetchDataSets={fetchDataSets} /> // Display dataset list if no error
          )
        )}

      </div>
    </div>
  );
}

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    fontSize: '.8rem',
    border: "2px solid #17C0CC",
    boxShadow: 'none',
    minWidth: '200px',
    width: '100%',
    '&:hover': {
      borderColor: "#17C0CC",
    },
    '&:focus': {
      borderColor: "#17C0CC",
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '0.7rem',
    backgroundColor: state.isSelected ? "#17C0CC" : 'transparent',
    color: state.isSelected ? '#fff' : '#000',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#17C0CC",
      color: '#fff',
    },
  }),
};

export default Datasets;
