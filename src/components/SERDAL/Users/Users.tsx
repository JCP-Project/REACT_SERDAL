import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardHeader, Typography, CardBody,  Chip, CardFooter, Tabs, TabsHeader, Tab,} from "@material-tailwind/react";
import { faEye, faSearch} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { FaEdit } from "react-icons/fa";
import Select, { StylesConfig } from 'react-select';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
 
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

interface User {
  id: number;
  imagePath: string;
  firstName: string;
  lastName:string;
  email: string;
  role: string;
  isActive: number;
  createDateTime: string; 
}
 
  
export default function Users() {
  const apiUrl = import.meta.env.VITE_API_URL;

   const [activeTab, setActiveTab] = useState("all"); // Active tab state
  const [filter, setFilter] = useState(""); // Filter state to hold the search query
  const [modal, setmodal] = useState(false);
  const [selectedInfo, setSelected] = useState<User>();
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);

  const [tableRows, setTableRows] = useState<User[]>([]);

  const adminStatus = sessionStorage.getItem('isAdmin') === 'true';

  useEffect(() => {

    fetchTableRows();
  }, []);

  const fetchTableRows = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Users/users`);
      if (!response.ok) {
        console.log("Network response was not ok", response);
        throw new Error("Network response was not ok");
      }
      
      const rowsData = await response.json();
      setTableRows(rowsData);
    } catch (error) {
      console.error("Error fetching table rows:", error);
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
      row.email.toLowerCase().includes(filter.toLowerCase()) ||
      row.role.toLowerCase().includes(filter.toLowerCase()) || 
      row.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      row.lastName.toLowerCase().includes(filter.toLowerCase())
    );
  });



  const saveEdit = async () => {

    const userId = Number(sessionStorage.getItem('id'));
    const userUpdate = {
      id: selectedInfo?.id,
      firstName: selectedInfo?.firstName,
      lastName:selectedInfo?.lastName,
      role: selectedInfo?.role,
      isActive: selectedInfo?.isActive,
      modifiedBy: userId,
    }

    try {
      const response = await fetch(`${apiUrl}/api/Users/UpdateUserInfo`, {
        method: 'PUT', // or 'PATCH' depending on the API design
        headers: {
          'Content-Type': 'application/json', // Set the request content type to JSON
        },
        body: JSON.stringify(userUpdate), // Convert selectedInfo to JSON
      });
  
      if (!response.ok) {
        console.log("Network response was not ok", response);
        throw new Error("Network response was not ok");
      }
  
      //const rowsData = await response.json();
                Swal.fire({
                  title: 'Success!',
                  text: 'Saved successfully.',
                  icon: 'success',
                  confirmButtonText: 'Okay',
                  confirmButtonColor: '#17C0CC',
                }).then(() => {
                  fetchTableRows();
                });;

      setmodal(false); // Close the modal after saving
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };


  const UserInfo = async (Id: number) => {
    setmodal(true);
    const filterUser = tableRows.find(x => x.id === Id);
  
    if (filterUser) {
      setSelected(filterUser);
      setSelectedRole({ label: filterUser.role, value: filterUser.role });  // Setting correct object format for Select
      setSelectedStatus({ label: filterUser.isActive === 1 ? "Active" : "Inactive", value: filterUser.isActive });  // Setting correct object format for Select
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setSelected((prev) => {
      if (prev) {
        return { ...prev, [name]: value };  // Update selectedInfo's respective field
      }
      return prev;
    });
  };

  const handleRoleChange = (selected: any) => {
    setSelectedRole(selected);
    
    // Update selectedInfo with the new role
    if (selectedInfo) {
      setSelected({
        ...selectedInfo,
        role: selected.value,  // Update the role in selectedInfo
      });
    }
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
            <h1 className={`text-2xl font-bold text-left text-white px-3 ${adminStatus ? 'lg:px-5' : 'lg:px-40'}`}>Users</h1>
          </motion.div>
      </div>


    <Card className="h-full w-full px-3 md:px-10 rounded-lg">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-2 flex items-center justify-between gap-8">

        </div>

        {/* Tabs */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
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


        <div className="w-full md:w-72">
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
          </div>
        </div>
      </CardHeader>

<CardBody className="px-0">
  {/* Wrapper div for scrolling */}
  <div className="max-h-[500px] min-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-white">
    <table className="mt-2 w-full min-w-max table-auto text-left">
      {/* Make the header sticky */}
      <thead className="sticky top-0 bg-white z-50">
        <tr>
            <th key="title" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
              <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                NAME
              </Typography>
            </th>
            <th key="author" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
              <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                ROLE
              </Typography>
            </th>
            <th key="status" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
              <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                STATUS
              </Typography>
            </th>
            <th key="uploaddate" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
              <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                REGISTERED DATE
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
  {filteredRows.map(({ id, imagePath, firstName, lastName, email, role, isActive, createDateTime }) => {
    const classes = "p-1 border-b border-blue-gray-50";

    return (
      <tr key={id}>
        <td className={classes}>
          <div className="flex items-center gap-3 lg:w-45">
            <div>
              <div className="flex items-center">
                <div className="rounded-full bg-primary text-white w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  {firstName.charAt(0).toUpperCase()}{lastName.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <Typography  color="blue-gray" className="text-md">
                {firstName} {lastName}
              </Typography>
              <Typography  color="blue-gray" className="text-md opacity-70">
                {email || "No Email Available"} {/* Fallback */}
              </Typography>
            </div>
          </div>
        </td>
        <td className={classes}>
          <div className="block text-center">
            <Typography  color="blue-gray" className="text-md">
            {role ? `${role.charAt(0).toUpperCase()}${role.slice(1).toLowerCase()}` : "No Role Available"}
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
              : "No Date Available"} {/* Fallback */}
          </Typography>
        </td>
        <td className={`${classes} text-center`}>
          <div>
            <button onClick={() => UserInfo(id)}>
              <FaEdit />
            </button>
          </div>

        </td>
      </tr>
    );
  })}
</tbody>

    </table>
  </div>
</CardBody>



      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-3 z-50">
        <div className="flex gap-2">
        </div>
      </CardFooter>
    </Card>



    {modal && (
        <div className="fixed inset-0 text-sm flex justify-center items-center z-50 bg-gray-600 bg-opacity-50 ">
          <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-5 px-10 text-lg">
            <h2 className="text-2xl font-bold mb-4">Info</h2>

            <section className="mt-3 flex">
  <input
    required
    type="text"
    id="FirstName"
    name="firstName"  // Ensure the name is correct (matches selectedInfo's property)
    placeholder="First Name"
    value={selectedInfo?.firstName || ""}  // Fallback to empty string to avoid undefined errors
    onChange={handleInputChange}  // This will call the handleInputChange function
    className="mt-4 mx-2 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
  />
  <input
    required
    type="text"
    id="LastName"
    name="lastName"  // Ensure the name is correct (matches selectedInfo's property)
    placeholder="Last Name"
    value={selectedInfo?.lastName || ""}  // Fallback to empty string to avoid undefined errors
    onChange={handleInputChange}  // This will call the handleInputChange function
    className="mt-4 mx-2 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
  />
</section>

            <section className="mt-3 flex">
            <input
                required
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={selectedInfo?.email}
                onChange={handleInputChange}
                className="mt-4 mx-2 w-full border-b-2 border-gray-300 bg-transparent focus:border-primary focus:outline-none"
                disabled
              />
            </section>
            <section className="mt-3 flex">
              <Select
                  id="role"
                  placeholder="Role"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  options={optionRole}
                  styles={customStyles}
                  className="text-sm w-full md:w-full mx-1"  // Full width on mobile, 200px on larger screens, auto on desktop
              />
                <Select
                  id="status"
                  placeholder="Status"
                  value={selectedStatus}
                  onChange={handleSatusChange}
                  options={optionStatus}
                  styles={customStyles}
                  className="text-sm w-full md:w-full mx-1"  // Full width on mobile, 200px on larger screens, auto on desktop
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