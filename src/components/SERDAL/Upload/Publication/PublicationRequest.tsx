import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Card,CardHeader,Typography,CardBody,Chip,CardFooter,Tabs,TabsHeader,Tab,} from "@material-tailwind/react";
import { faCancel, faCheck, faClose, faEye, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "0",
  },
  {
    label: "Approved",
    value: "1",
  },
  {
    label: "Declined",
    value: "2",
  },

];

interface ApiData {
  id: number;
  title: string;
  author: string;
  summary: string;
  createdDate: string;
  createdBy: number;
  status: number;
  modifiedBy: number;
  modifiedDate: string;
  imgPath: string;
  pdfLink: string;
  pdfFile: string;
  category: string;
  email: string;
  firstname: string;
  lastname: string;
}

  const statusMap: { [key: number]: string } = {
    0: "pending",
    1: "approved",
    2: "declined",
  };
 
interface UpdateStatus{
  Id: number;
  status: number;
  ModifiedBy: number;
  isDeleted: number;
}

  
export default function PublicationRequest() {
  const apiUrl = import.meta.env.VITE_API_URL;
   const [activeTab, setActiveTab] = useState("all");
  const [filter, setFilter] = useState("");
  const [data, setData] = useState<ApiData[]>([]);
  const [status, setStatus] = useState<UpdateStatus>();

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
  };

  // Handle input change
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value); // Update the search query
  };


//Get All publication
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/Publication`, {
        method: "GET", // Use GET to fetch data
      });

      if (response.ok) {
        const jsonData: ApiData[] = await response.json();
        setData(jsonData);       
      } else {
        console.error("Error fetching publication data");
      }
    } catch (error) {
      console.error("Error fetching publication data:", error);
    }
  };


//update status
const ApproveRequest = async (bodyData: UpdateStatus, actionText:string) => {
  try {
    const response = await fetch(`${apiUrl}/api/Publication/UpdateStatus`, {
      method: "POST",  // Correct method spelling
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    if (response.ok) {   
      fetchData();
      // Success Alert with Tailwind CSS classes
      const swalWithTailwindButtons = Swal.mixin({
        customClass: {
          confirmButton: "bg-primary text-white py-2 px-4 rounded-md focus:outline-none",
          cancelButton: "bg-gray-500 text-white py-2 px-4 rounded-md  focus:outline-none",
        },
        buttonsStyling: false,
      });

      swalWithTailwindButtons.fire({
        title: "Change status",
        text: `Publication ${actionText} successfully`,
        icon: "success",
      });
    } else {
      const errorResponse = await response.json();
      console.error("Error message", errorResponse.message || "Unknown error");

      const swalWithTailwindButtons = Swal.mixin({
        customClass: {
          confirmButton: "bg-green-500 text-white py-2 px-4 rounded-md focus:outline-none",
          cancelButton: "bg-gray-500 text-white py-2 px-4 rounded-md focus:outline-none", 
        },
        buttonsStyling: false,
      });

      swalWithTailwindButtons.fire({
        title: "Failed to Update!",
        text: errorResponse.message || "An error occurred while updating.",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error fetching publication data:", error);

    const swalWithTailwindButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-500 text-white py-2 px-4 rounded-md focus:outline-none",
        cancelButton: "bg-gray-500 text-white py-2 px-4 rounded-md focus:outline-none",
      },
      buttonsStyling: false,
    });

    swalWithTailwindButtons.fire({
      title: "Network Error!",
      text: "There was an issue connecting to the server.",
      icon: "error",
    });
  } finally {
    // You can stop loading spinner here if you have one
    // setLoading(false);
  }
};
  //#endregion

  useEffect(() => {
    fetchData();
  }, []); 

  const handleStatus = (id: number, status: number, isDelete: number) => {
    const userId = Number(sessionStorage.getItem('id'));
    const actionText = status === 1 ? "approve" : "decline";

    const updateStatus: UpdateStatus = {
      Id: id,
      status: status,
      ModifiedBy: userId,
      isDeleted: isDelete,
    };
  
    setStatus(updateStatus);
  
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
        text: `You want to ${actionText} this publication`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Trigger the API call
          ApproveRequest(updateStatus, actionText);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwindButtons.fire({
            title: "Cancelled",
            text: "Change status cancelled",
            icon: "error",
          });
        }
      });
  };
  
  

  // Filter and sort rows based on the active tab and search query
  const filteredRows = data
    .filter((row) => {
      // First filter by active tab (status)
      if (activeTab !== "all" && row.status.toString() !== activeTab) {
        return false; // Exclude the row if it doesn't match the selected tab
      }
      // Then filter by the search query (title, author, or status)
      return (
        row.title.toLowerCase().includes(filter.toLowerCase()) ||
        row.author.toLowerCase().includes(filter.toLowerCase()) ||
        statusMap[row.status].includes(filter.toLowerCase())
      );
    })
    .sort((a, b) => {
      // First, sort by status
      const statusComparison = a.status - b.status;
      if (statusComparison !== 0) return statusComparison; // If status is different, return the result of status comparison

      // If status is the same, then sort by upload date
      return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
    });



    const truncateTitle = (title: string): string => {
      if (title.length > 80) {
        return `${title.slice(0, 80 - 10)}...`;
      }
      return title;
    };

  return (
    <>
          <div className="bg-primary text-left py-8">
          <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
                  <h1 className="text-2xl font-bold text-left text-white px-3 lg:px-5">Publications</h1>
        </motion.div>
      </div>
    <Card className="h-full w-full px-2 rounded-lg px-1 md:px-5">
      <CardHeader floated={false} shadow={false} className="rounded-none">


        {/* Tabs */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex">
            {TABS.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(tab.value)}
                className={`px-6 py-2 text-md font-medium rounded-2xl transition-all ${activeTab === tab.value ? 'text-white bg-primary' : 'text-gray-500 hover:text-primary'}`}
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
                TITLE
              </Typography>
            </th>
            <th key="author" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
              <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                UPLOADER
              </Typography>
            </th>
            <th key="status" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
              <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                STATUS
              </Typography>
            </th>
            <th key="uploaddate" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
              <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                UPLOAD DATE
              </Typography>
            </th>
            <th key="delete" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
              <Typography   color="blue-gray"  className="text-md leading-none opacity-70">
                ACTION
              </Typography>
            </th>

            
        </tr>
      </thead>
      <tbody >
        {filteredRows.map(
          ({ id, title, author,firstname,lastname, email, status, createdDate }) => {
            const classes = "p-1 border-b border-blue-gray-50";
            
            return (
              <tr key={id}>
                <td className={classes}>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                    <Link to={`/Publication/Info/${id}`}>
                      <Typography  color="blue-gray" className="text-md" >
                      {truncateTitle(title)}
                      </Typography>
                    </Link>
                      <Typography  color="blue-gray" className="text-md opacity-70">
                        {truncateTitle(author)}
                      </Typography>
                    </div>
                  </div>
                </td>
                <td className={classes}>
                  <div className="block">
                    <Typography   color="blue-gray" className="text-md">
                    {`${firstname} ${lastname}`}
                    </Typography>
                    <Typography   color="blue-gray" className="text-md opacity-70">
                      {email}
                    </Typography>
                  </div>
                </td>
                <td className={`${classes}`}>
                <div className="flex items-center justify-center">
                    <div
                      className={`text-white px-2 py-1 m-0 text-sm text-center w-25 rounded-sm font-bold ${
                        status === 0
                          ? "bg-yellow-400"  // yellow-400 for pending
                          : status === 1
                          ? "bg-green-700"   // green-700 for approved
                          : status === 2
                          ? "bg-red-700"     // red-700 for declined
                          : "bg-white"       // white for unknown
                      }`}
                    >
                      {status === 0
                        ? "Pending"
                        : status === 1
                        ? "Approved"
                        : status === 2
                        ? "Declined"
                        : "unknown"}
                    </div>
                  </div>
                </td>
                <td className={`${classes} text-center`}>
                  <Typography  color="blue-gray" className="text-md" >
                  {new Intl.DateTimeFormat('en-US', {
                          month: '2-digit',
                          day: '2-digit',
                          year: 'numeric',
                        }).format(new Date(`${createdDate}Z`))}
                  </Typography>
                </td>
                <td className={`${classes} text-center z-40`}>
                  <span>
                    <Link to={`/Publication/Info/${id}`}>
                    <button 
                    className="md:m-0 bg-primary text-white rounded-md hover:bg-secondary text-md px-2 py-0 md:px-2
                                hover:scale-110 transition-transform duration-200 ease-in-out
                    ">
                      <FontAwesomeIcon icon={faEye} />
                      <span className=""></span>
                    </button>
                    </Link>

                  </span>
                  <span>
                    <button 
                      onClick={() => handleStatus(id, 1, 0)} 
                      disabled={status === 1} // Disable button if status is 1
                      className={`mx-1 text-white rounded-md text-md px-2 py-0 md:px-2
                        ${status === 1 ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'} 
                        ${status === 1 ? '' : 'hover:scale-110 transition-transform duration-200 ease-in-out'}
                      `}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                      <span></span>
                    </button>
                  </span>

                  <span>
                    <button 
                      onClick={() => handleStatus(id, 2, 0)} 
                      disabled={status === 2} // Disable button if status is 2
                      className={`md:m-0 text-white rounded-md text-md px-2 py-0 md:px-2
                        ${status === 2 ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-gray-500'} 
                        ${status === 2 ? '' : 'hover:scale-110 transition-transform duration-200 ease-in-out'}
                      `}
                    >
                      <FontAwesomeIcon icon={faClose} />
                      <span></span>
                    </button>
                  </span>

                </td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  </div>
</CardBody>



      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-3 z-50">
        <div className="flex gap-2">
        </div>
      </CardFooter>
    </Card>
    </>
  );
}