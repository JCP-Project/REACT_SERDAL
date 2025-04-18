import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardHeader, Typography, CardBody,  Chip, CardFooter, Tabs, TabsHeader, Tab,} from "@material-tailwind/react";
import { faAdd, faEye, faSearch} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { FaEdit } from "react-icons/fa";
import Select, { StylesConfig } from 'react-select';
import Swal from 'sweetalert2';
import { FaTrashCan } from "react-icons/fa6";
import Loader from '../../../../common/Loader';
 
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "1",
  },
  {
    label: "Inactive",
    value: "0",
  },

];

interface Institution {
  id: number;
  value: string;
  label: string;
  isDeleted:number;
  isActive: number;

  createDateTime:string;
  modifiedDateTime:string;

  modifiedBy: number;
  createdBy: number; 
}
 
  
export default function Institution() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("APIToken");

  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, seterrorMessage] = useState<string>("");

   const [activeTab, setActiveTab] = useState("all");
  const [filter, setFilter] = useState("");
  
  const [selectedInfo, setSelected] = useState<Institution>();
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const [tableRows, setTableRows] = useState<Institution[]>([]);

  const [modal, setmodal] = useState(false);
  const [modalCreate, setmodalCreate] = useState(false);

  const adminStatus = localStorage.getItem('isAdmin') === 'true';
  const userId = Number(localStorage.getItem('id'));

    const [formData, setFormData] = useState({
      label: "",
      value: "",
    });

    
  useEffect(() => {

    fetchTableRows();
  }, []);

  const fetchTableRows = async () => {
    setLoading(true);
    seterrorMessage("");
    try {
      const response = await fetch(`${apiUrl}/api/Institution/GetAllInstitution`);
      if (!response.ok) {
        console.log("Network response was not ok", response);
        seterrorMessage("Failed to fetch Institution from the server.");
        throw new Error("Network response was not ok");
      }
      
      const rowsData = await response.json();
      setTableRows(rowsData);
    } catch (error) {
      console.error("Error fetching table rows:", error);
      seterrorMessage("Failed to fetch Institution from the server.");
    }
    finally{
      setLoading(false);
    }
  };



  // Handle tab changes and reset to the first page when changing the tab
  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue); // Update the active tab
  };

  // Handle input change
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value); // Update the search query
  };

  // Filter and sort rows based on the active tab and search query
  const filteredRows = tableRows
  .filter((row) => {
    // First filter by active tab (status)
    if (activeTab !== "all" && row.isActive.toString() !== activeTab) {
      return false; // Exclude the row if it doesn't match the selected tab
    }
    // Then filter by the search query (title, author, or status)
    return (
      row.label.toLowerCase().includes(filter.toLowerCase()) ||
      row.value.toLowerCase().includes(filter.toLowerCase())
    );
  });


  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault();
    const data = {
        id: 0,
        label: formData.label,
        value: formData.value,
        isActive: 1,
        modifiedBy: userId,
    }

    try {

      if (!token) {
        console.error("No token found, ");
        return Swal.fire({
          icon: 'error',
          title: 'No token found',
          text: 'User is not authenticated. Please try again.',
          confirmButtonColor: '#17C0CC',
        });
      }

        const response = await fetch(`${apiUrl}/api/Institution/CreateInstitution`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
          });

          if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Saved successfully.',
                icon: 'success',
                confirmButtonText: 'Okay',
                confirmButtonColor: '#17C0CC',
              }).then(() => {
                fetchTableRows();
              });;
          }
          else{
            const jsonresult = await response.json();
            Swal.fire({
                title: 'Error!',
                text: jsonresult.message || 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonText: 'Okay',
                confirmButtonColor: '#E74C3C',
              });
          }

    } catch (error) {
        console.error(error);
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again.',
            icon: 'error',
            confirmButtonText: 'Okay',
            confirmButtonColor: '#E74C3C',
          });
    }
    finally{
        setmodalCreate(false);
    }
  }



  const saveEdit = async () =>{

    const data = {
        id: selectedInfo?.id,
        label: selectedInfo?.label,
        value: selectedInfo?.value,
        isActive: selectedInfo?.isActive,
        modifiedBy: userId,
    }

    try {

      

      if (!token) {
        console.error("No token found, ");
        return Swal.fire({
          icon: 'error',
          title: 'No token found',
          text: 'User is not authenticated. Please try again.',
          confirmButtonColor: '#17C0CC',
        });
	    }

      const response = await fetch(`${apiUrl}/api/Institution/UpdateInstitution`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {

        return Swal.fire({
          icon: 'error',
          title: 'Failed',
          text: 'Something went wrong. Please try again.',
          confirmButtonColor: '#17C0CC',
        });
      }
                Swal.fire({
                  title: 'Success!',
                  text: 'Saved successfully.',
                  icon: 'success',
                  confirmButtonText: 'Okay',
                  confirmButtonColor: '#17C0CC',
                }).then(() => {
                  fetchTableRows();
                });;


    } catch (error) {
      console.error("Error saving user data:", error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
        confirmButtonText: 'Okay',
        confirmButtonColor: '#E74C3C',
      });
    }
    finally{
        setmodal(false);
    }
  };


  const DeleteInstitution = async (Id: number, label: string) => {
         const swalWithTailwindButtons = Swal.mixin({
            customClass: {
              confirmButton: "bg-primary text-white py-2 px-4 rounded-md focus:outline-none m-2", 
              cancelButton: "bg-gray-500 text-white py-2 px-4 rounded-md focus:outline-none m-2",
            },
            buttonsStyling: false,
          });
        
          swalWithTailwindButtons
            .fire({
              title: "Are you sure?",
              text: `You want to Delete "${label}"`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes",
              cancelButtonText: "No",
              reverseButtons: true,
            })
            .then((result) => {
              if (result.isConfirmed) {
                Delete(Id);
              }
            });
  }



  const Delete = async (Id: number) => {
    const data = {
        id: Id,
        modifiedBy: userId,
    }

    try {

      if (!token) {
        console.error("No token found, ");
        return Swal.fire({
          icon: 'error',
          title: 'No token found',
          text: 'User is not authenticated. Please try again.',
          confirmButtonColor: '#17C0CC',
        });
	    }

        const response = await fetch(`${apiUrl}/api/Institution/DeleteInstitution`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          console.log("Network response was not ok", response);
          return Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Something went wrong. Please try again.',
            confirmButtonColor: '#17C0CC',
          });
        }
            Swal.fire({
                    title: 'Success!',
                    text: 'Deleted successfully.',
                    icon: 'success',
                    confirmButtonText: 'Okay',
                    confirmButtonColor: '#17C0CC',
                  }).then(() => {
                    fetchTableRows();
                  });;
  
      } catch (error) {
        console.error("Error saving user data:", error);
        Swal.fire({
            title: 'Error!',
            text: 'Something went wrong. Please try again.',
            icon: 'error',
            confirmButtonText: 'Okay',
            confirmButtonColor: '#E74C3C',
          });
      }
      finally{
          setmodal(false);
      }
  }


  const InstitutionInfo = async (Id: number) => {
    setmodal(true);
    const filterUser = tableRows.find(x => x.id === Id);
  
    if (filterUser) {
      setSelected(filterUser);
      setSelectedStatus({ label: filterUser.isActive === 1 ? "Active" : "Inactive", value: filterUser.isActive });
    }
  };


  const handleInputFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setSelected((prev) => {
      if (prev) {
        return { ...prev, [name]: value };
      }
      return prev;
    });
  };



  // Handle status change
  const handleSatusChange = (selected: any) => {
    setSelectedStatus(selected);
    
    // Update selectedInfo with the new status
    if (selectedInfo) {
      setSelected({
        ...selectedInfo,
        isActive: selected.value,  // Update the status in selectedInfo
      });
    }
  };


  const optionStatus = [
    { label: 'Active', value: 1 },
    { label: 'Inactive', value: 0 },
  ];

  const optionRole = [
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ];



  return (
    <>
      <div className="bg-primary text-left py-8">
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <h1 className={`text-2xl font-bold text-left text-white px-3 ${adminStatus ? 'lg:px-5' : 'lg:px-40'}`}>Institution</h1>
          </motion.div>
      </div>


    <Card className="h-full w-full px-3 md:px-10 rounded-lg">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">

        </div>

        {/* Tabs */}
        <div className="block md:flex md:items-center md:justify-between border-b border-gray-300">
            <div className="flex">
                {TABS.map((tab, index) => (
                <button
                    key={index}
                    onClick={() => handleTabChange(tab.value)}
                    className={`px-6 py-2 text-sm font-medium rounded-2xl transition-all ${activeTab === tab.value ? 'text-white bg-primary' : 'text-gray-500 hover:text-primary'}`}
                >
                    {tab.label}
                </button>
                ))}
            </div>


            <div className=" md:flex md:items-center md:justify-center py-1 mx-1">
                <div className="relative h-8 w-full min-w-[200px]">
                    <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                        <FontAwesomeIcon icon={faSearch} className="w-5 h-5 text-gray-700" />
                    </div>
                    <input  className="peer h-full w-full rounded-[7px] border border-[#6F9B9E] border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm text-md text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#6F9B9E] placeholder-shown:border-t-[#6F9B9E] focus:border-2 focus:border-[#6F9B9E] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
                            placeholder=" " 
                            value={filter}
                            onChange={handleFilterChange}
                    />
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-md text-md leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[10px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-[#6F9B9E] before:transition-all after:pointer-events-none after:mt-[10.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-[#6F9B9E] after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-[#6F9B9E] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-md peer-focus:leading-tight peer-focus:text-[#6F9B9E] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#6F9B9E] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#6F9B9E] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#6F9B9E]">               
                        Search
                    </label>
                </div>

                <div className="flex justify-end  lg:justify-end lg:ml-1 py-3">                                             
                    <button onClick={() =>{ setmodalCreate(true); formData.label = ""; formData.value = ""; }} className="flex items-center gap-3 bg-primary text-white px-4 py-1 rounded-md hover:bg-[#139B99]">
                        <FontAwesomeIcon icon={faAdd} className="cursor-pointer" />
                        Add
                    </button>               
                </div> 

            </div>
        </div>
      </CardHeader>

    <CardBody className="px-0">
    {loading ? (
          <div className="w-full"><Loader /></div>
      ): (
       errorMessage ? (
       <div className='h-full mb-50 w-[100%] text-center py-20 text-gray-400 font-bold text-lg'>
          {errorMessage}
       </div>
        ) : (
      <div>
        <div className="max-h-[500px] min-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-white">
            <table className="mt-2 w-full min-w-max table-auto text-left">
            {/* Make the header sticky */}
            <thead className="sticky top-0 bg-white z-50">
                <tr>
                    <th key="title" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
                    <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                        Label
                    </Typography>
                    </th>
                    <th key="author" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
                    <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                        Value
                    </Typography>
                    </th>
                    <th key="status" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
                    <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                        Status
                    </Typography>
                    </th>
                    <th key="uploaddate" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
                    <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                        Created Date
                    </Typography>
                    </th>
                    <th key="delete" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
                    <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                        Action
                    </Typography>
                    </th>

                    
                </tr>
            </thead>
            <tbody>
              {filteredRows.map(({ id, isActive, label, value, createDateTime }) => {
                  const classes = "p-1 border-b border-blue-gray-50";

                  return (
                  <tr key={id} className="hover:bg-[#daf1f8]">
                      <td className={classes}>
                      <div className="block text-left">
                              <Typography  color="blue-gray" className="text-md">
                                  {label}
                              </Typography>
                      </div>
                      </td>
                      <td className={classes}>
                      <div className="block text-left">
                              <Typography  color="blue-gray" className="text-md">
                                  {value}
                              </Typography>
                      </div>
                      </td>
                      <td className={classes}>
                      <div className='flex items-center justify-center'>
                      <div
                          className={`text-white py-2 m-0 text-sm text-center inline-block px-8 font-bold
                              ${isActive === 1 ? "bg-green-600" : isActive === 0 ? "bg-red-600" : "bg-gray-300"}`}
                          >
                          {isActive === 1 ? "Active" : isActive === 0 ? "Inactive" : "Unknown"}
                          </div>
                      </div>
                      </td>
                      <td className={`${classes} text-center`}>
                      <Typography  color="blue-gray" className="text-md">
                          {createDateTime
                          ? new Intl.DateTimeFormat('en-US', {
                              month: '2-digit',
                              day: '2-digit',
                              year: 'numeric',
                              }).format(new Date(createDateTime))
                          : "No Date Available"}
                      </Typography>
                      </td>
                      <td className={`${classes} text-center`}>
                      <div className="">
                          <div className="flex justify-center items-center">
                              <button onClick={() => InstitutionInfo(id)} className="mx-1">
                                  <FaEdit />
                              </button>
                              <button onClick={() => DeleteInstitution(id, label)} className="mx-1">
                                  <FaTrashCan color="#D32F2F" className="hover:scale-110 hover:rotate-6 transition-transform duration-200"/>
                              </button>
                          </div>
                      </div>

                      </td>
                  </tr>
                  );
              })}
              </tbody>

            </table>
        </div>
    </div>))}
    </CardBody>

    {/* <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-3 z-50">
        <div className="flex gap-2">
        </div>
      </CardFooter> */}
    </Card>




    {modalCreate && (
        <div className="fixed inset-0 text-sm flex justify-center items-center z-50 bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-5 px-10 text-lg">
            <h2 className="text-2xl font-bold mb-4">Add Institution</h2>

            <form onSubmit={handleSubmit}>
                {/* Label Input */}
                <section className="mt-3">
                <input
                    required
                    type="text"
                    id="label"
                    name="label"
                    placeholder="Enter label"
                    value={formData.label}
                    onChange={handleInputFormChange}
                    className="mt-4 mx-2 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
                />
                </section>

                <section className="mt-3">
                <input
                    required
                    type="text"
                    id="value"
                    name="value"
                    placeholder="Enter value"
                    value={formData.value}
                    onChange={handleInputFormChange}
                    className="mt-4 mx-2 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
                />
                </section>

                <section className="mt-3 flex justify-end">
                <button
                    type="submit"
                    className="mt-4 py-2 bg-primary text-white rounded-sm px-5 mx-1"
                >
                    Save
                </button>
                
                <button
                    type="button"
                    onClick={() => setmodalCreate(false)}
                    className="mt-4 py-2 bg-gray-400 text-white rounded-sm px-5 mx-1"
                >
                    Close
                </button>
                </section>
            </form>
            </div>
        </div>
    )}




    {modal && (
        <div className="fixed inset-0 text-sm flex justify-center items-center z-50 bg-gray-600 bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-5 px-10 text-lg">
            <h2 className="text-2xl font-bold mb-4">Update Institution</h2>

            <section className="mt-3">
                <input
                    required
                    type="text"
                    id="label"
                    name="label"
                    placeholder="Enter label"
                    value={selectedInfo?.label}
                    onChange={handleInputChange}
                    className="mt-4 mx-2 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
                />
            </section>

            <section className="mt-3">
                <input
                    required
                    type="text"
                    id="value"
                    name="value"
                    placeholder="Enter value"
                    value={selectedInfo?.value}
                    onChange={handleInputChange}
                    className="mt-4 mx-2 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
                />
            </section>

            <section className="mt-3">
                <Select
                  id="status"
                  placeholder="Status"
                  value={selectedStatus}
                  onChange={handleSatusChange}
                  options={optionStatus}
                  styles={customStyles}
                  className="text-sm w-full md:w-full mx-1"
              />
            </section>

            <section className="mt-3 flex justify-end">
            <button
                onClick={() => saveEdit()}
                className="mt-4 py-2 bg-primary text-white rounded-sm px-5 mx-1"
              >
                Save
              </button>
              <button
                onClick={() => setmodal(false)}
                className="mt-4 py-2 bg-gray-400 text-white rounded-sm px-5 mx-1"
              >
                Close
              </button>
            </section>


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
    border: "1px solid gray-100", // Set the border color to #17C0CC
    boxShadow: 'none', // Remove any default focus outline or shadow
    width: '100%', // Ensures it takes full width in the parent container
    '&:hover': {
      borderColor: "#17C0CC", // Border color remains #17C0CC on hover
    },
    '&:focus': {
      borderColor: "#17C0CC", // Border color remains #17C0CC when focused
    },
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: '1rem',
    backgroundColor: state.isSelected ? "#17C0CC" : 'transparent', // Background color when selected
    color: state.isSelected ? '#fff' : '#000', // Text color when selected
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: "#17C0CC", // Background color on hover
      color: '#fff', // Text color on hover
    },
  }),
};