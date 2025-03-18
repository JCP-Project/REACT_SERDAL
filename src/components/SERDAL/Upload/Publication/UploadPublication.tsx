import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card, CardHeader, Typography, CardBody, Chip, CardFooter, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import { faCheck, faClose, faEye, faFilePdf, faL, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Loader from '../../../../common/Loader/Loader2';
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
  keywords: string;
  isDeleted: number;
  publicationDate: Date;
}

 
interface UpdateStatus{
  Id: number;
  status: number;
  ModifiedBy: number;
  isDeleted: number;
  CreatedDate: string;
}



  const statusMap: { [key: number]: string } = {
    0: "pending",
    1: "approved",
    2: "declined",
  };
  
export default function UploadPublication() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [activeTab, setActiveTab] = useState("all");
  const [filter, setFilter] = useState("");
  const [data, setData] = useState<ApiData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<UpdateStatus>();

  useEffect(() => {
    fetchData();
  }, []); 

  //#region API Call

  //#region  fetch data
  const fetchData = async () => {
    setLoading(true);
    setErrorMessage(null);
    const id = sessionStorage.getItem('id');
    try {
      const response = await fetch(`${apiUrl}/api/Publication/Publication/${id}`, {
        method: "GET",
      });

      if (response.ok) {
        const jsonData: ApiData[] = await response.json();
        console.log("Fetched publication by Id:",id, jsonData);
        setData(jsonData);
      } else {       
        const errorResponse = await response.json();
        console.error("Error message", errorResponse.message || "Unknown error");
        setErrorMessage(errorResponse.message);
      }
    } catch (error) {
      console.error("Error fetching publication data:", error);
      setErrorMessage("Error fetching publication data");
    }
    finally {
      setLoading(false);
    }
  };
  //#endregion

  //update status
  const CancelRequest = async (bodyData: UpdateStatus) => {
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
            cancelButton: "bg-gray-500 text-white py-2 px-4 rounded-md focus:outline-none",
          },
          buttonsStyling: false,
        });
  
        swalWithTailwindButtons.fire({
          title: "Change status",
          text: `Publication request cancelled successfully`,
          icon: "success",
        });
      } else {
        const errorResponse = await response.json();
        console.error("Error message", errorResponse.message || "Unknown error");
  
        const swalWithTailwindButtons = Swal.mixin({
          customClass: {
            confirmButton: "bg-primary text-white py-2 px-4 rounded-md focus:outline-none",
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
          confirmButton: "bg-primary text-white py-2 px-4 rounded-md focus:outline-none",
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

  //#endregion


//#region  Filter

  //Filter Status
  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
  };

  //Searchbox
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  const filteredRows = data
    .filter((row) => {
      if (activeTab !== "all" && row.status.toString() !== activeTab) {
        return false;
      }
      return (
        row.title.toLowerCase().includes(filter.toLowerCase()) ||
        row.author.toLowerCase().includes(filter.toLowerCase()) ||
        statusMap[row.status].includes(filter.toLowerCase())
      );
    })
    .sort((a, b) => {
      const statusComparison = a.status - b.status;
      if (statusComparison !== 0) return statusComparison;
      return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
    });

//#endregion

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen((prevState) => !prevState);
    };

    const showMessage = () => {

      setTimeout(() => {
        setIsVisible(true);
        fetchData();
        setTimeout(() => {
          setIsVisible(false);
        }, 4000);
      }, 1200);
    };


      const handleStatus = (id: number, status: number, isDelete: number) => {
        const userId = Number(sessionStorage.getItem('id'));
 
        const updateStatus: UpdateStatus = {
          Id: id,
          status: status,
          ModifiedBy: userId,
          isDeleted: isDelete,
          CreatedDate: new Date().toISOString(),

        };
      
        setStatus(updateStatus);
      
        const swalWithTailwindButtons = Swal.mixin({
          customClass: {
            confirmButton: "bg-primary text-white py-2 px-4 rounded-md  focus:outline-none m-2", 
            cancelButton: "bg-gray-500 text-white py-2 px-4 rounded-md  focus:outline-none m-2",
          },
          buttonsStyling: false,
        });
      
        swalWithTailwindButtons
          .fire({
            title: "Are you sure?",
            text: `You want to cancel this publication request`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              // Trigger the API call
              CancelRequest(updateStatus);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              swalWithTailwindButtons.fire({
                title: "Cancelled",
                text: "Change status cancelled",
                icon: "error",
              });
            }
          });
      };
      
      
      const truncateTitle = (title: string): string => {
        if (title.length > 90) {
          return `${title.slice(0, 90 - 10)}...`;
        }
        return title;
      };
      

  return (
    <>


    <div className="bg-primary text-left py-5 pl-3 md:px-5">

        <motion.div
          initial={{ x: -300 }} // Start from the left (off-screen)
          animate={{ x: 0 }}     // End at position x = 0 (default position)
          transition={{ type: 'spring', stiffness: 100 }} // Smooth transition
        >
                  <h1 className="text-2xl font-bold text-left text-white">Publication</h1>
        </motion.div>

        <h1 className="text-sm font-bold text-left text-white">Request</h1>

    </div>

    <div className="">
      <Card className="h-full w-full bg-white lg:px-5 lg:mt-5">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="flex items-center justify-between gap-8 m-2">

          <div className="flex justify-between w-full mb-5  ">
              <div className="w-full md:w-96 xl:w-1/2 relative flex items-center p-1 rounded-lg border-[2px] border-stroke bg-white">
                <input
                  type="text"
                  placeholder="Search Article..."
                  value={filter}
                  onChange={handleFilterChange}
                  className="placeholder-black-900 text-lg px-5 w-full text-blue-gray-500 outline-none transition bg-white"
                />
                <FontAwesomeIcon icon={faSearch} size="lg" color=" text-secondary" />
              </div>

                  <div className="flex shrink-0 flex-col gap-2 sm:flex-row p-1">
                    <Link to="/createpost">
                        <button className="flex items-center gap-3 bg-[#17C0CC] text-white px-4 py-1 rounded-md hover:bg-[#139B99]">
                          <FontAwesomeIcon icon={faFilePdf} className="cursor-pointer" />
                          Upload
                      </button>   
                    </Link>              
                  </div>
            </div>

          </div>


            {/* Tabs */}
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value={activeTab} className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={`Tab${value}`} value={value}>
                      <button className="text-sm" key={value} onClick={() => handleTabChange(value)}>&nbsp;&nbsp;{label}&nbsp;&nbsp;</button>                
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
            </div>
        </CardHeader>
        

        <CardBody className="px-0">
            <div className="max-h-[500px] min-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-white">
              <table className="mt-2 w-full min-w-max table-auto text-left">

                <thead className="sticky top-0 bg-white z-50">
                  <tr>
                      <th key="title" className="border-y  bg-blue-gray-50/50 py-5">
                        <Typography  variant="small" color="blue-gray"  className="text-sm leading-none opacity-70">
                          TITLE
                        </Typography>
                      </th>
                      <th key="status" className="border-y  bg-blue-gray-50/50 p-2 text-center">
                        <Typography  variant="small" color="blue-gray"  className="text-sm leading-none opacity-70">
                          STATUS
                        </Typography>
                      </th>
                      <th key="uploaddate" className="border-y bg-blue-gray-50/50 p-2 text-center">
                        <Typography  variant="small" color="blue-gray"  className="text-sm leading-none opacity-70">
                          UPLOAD DATE
                        </Typography>
                      </th>
                      <th key="delete" className="border-y  bg-blue-gray-50/50 p-2 text-center">
                        <Typography  variant="small" color="blue-gray"  className="text-sm leading-none opacity-70">
                          ACTION
                        </Typography>
                      </th>

                      
                  </tr>
                </thead>
                <tbody >
                  {filteredRows.map(
                    ({ id, title, author, status, createdDate }) => {
                      const classes = "p-1 border-b";
                      
                      return (
                        <tr key={id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3 my-4">
                            <div className="flex flex-col">
                              <Typography variant="small" color="blue-gray" className="text-sm" >
                              {truncateTitle(title)}
                              </Typography>
                              <Typography variant="small" color="blue-gray" className="text-sm opacity-70">
                              {truncateTitle(author)}
                              </Typography>
                            </div>
                          </div>
                        </td>

                        <td className={`${classes}`}>
                          <div className="flex items-center justify-center">
                          <Chip className="text-white px-2 py-1 m-0 text-sm text-center w-25"
                              value={   status === 0 ? "pending" :
                                        status === 1 ? "approved" :
                                        status === 2 ? "declined" : "unknown"
                                      }
                              style={{
                                backgroundColor: status === 0 ? "#fbbf24" :  // yellow-400
                                                  status === 1 ? "#16a34a" :  // green-700
                                                  status === 2 ? "#b91c1c" :  // red-700
                                                  "#ffffff",  // white for default
                              }}/>
                          </div>
                        </td>

                        <td className={`${classes} text-center`}>
                            <Typography variant="small" color="blue-gray" className="text-sm">
                            {new Date(`${createdDate}Z`).toLocaleDateString('en-US', {
                              month: '2-digit',
                              day: '2-digit',
                              year: 'numeric',
                            })}
                            </Typography>
                          </td>

                          <td className={`${classes} text-center z-40`}>

                          <span className="mx-1">
                            <Link to={`/Publication/Info/${id}`}>
                            <button
                                    className="my-2 md:m-0 bg-primary py-1 px-2 text-sm text-white rounded-lg hover:bg-secondary lg:px-3">
                                    <FontAwesomeIcon icon={faEye} />                                   
                                  </button>
                            </Link>
        
                          </span>

                          <button
                              disabled={status !== 0} // Disable button when status is not 0
                              onClick={() => handleStatus(id, 0, 1)}
                              className={`my-2 md:m-0 py-1 px-2 text-sm text-white rounded-lg lg:px-3 
                                ${status !== 0 ? 'bg-red-400 cursor-not-allowed' : 'bg-red hover:bg-red-600'}`} // Apply hover styles only when enabled
                            >
                              <FontAwesomeIcon 
                                icon={faClose} 
                                className={`${status !== 0 ? 'text-gray-300' : 'text-white'}`}  // Change icon color when disabled
                              />
                          </button>






                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
              
              {
                
                loading && <div><Loader /></div>
              }

              {
                !loading && errorMessage && (
                  <div className='w-[100%] text-center py-20 text-gray-400 font-bold text-lg'>
                    {errorMessage}
                  </div>
                )
              }

            </div>
        </CardBody>

          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-3 z-50">
            <div className="flex gap-2">
            </div>
          </CardFooter>
      </Card>
    </div>
    </>
  );
}