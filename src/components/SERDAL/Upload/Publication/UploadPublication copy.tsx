// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { PencilIcon, UserPlusIcon} from "@heroicons/react/24/solid";
// import {Card,CardHeader,Typography,CardBody,Chip,CardFooter,Tabs,TabsHeader,Tab} from "@material-tailwind/react";
// import { faFilePdf, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import ModalRequest from "./ModalRequestUpload";
// import { Link } from "react-router-dom";
 
// const TABS = [
//   {
//     label: "All",
//     value: "all",
//   },
//   {
//     label: "Pending",
//     value: "0",
//   },
//   {
//     label: "Approved",
//     value: "1",
//   },
//   {
//     label: "Declined",
//     value: "2",
//   },

// ];
 

// const TABLE_ROWS = [
//    {
//     id: 0,
//     title: "Publication 1",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Juan Dela Cruz",
//     location: "Laguna",
//     status: 0,
//     uploaddate: "01/18/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.pdf",
//   },
//   {
//     id: 1,
//     title: "Publication 2",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Maria Clara",
//     location: "Manila",
//     status: 1,
//     uploaddate: "02/15/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.pdf",
//   },
//   {
//     id: 2,
//     title: "Publication 3",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Pedro Garcia",
//     location: "Cebu",
//     status: 2,
//     uploaddate: "03/22/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.pdf",
//   },
//   {
//     id: 3,
//     title: "Publication 4",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Ana Santos",
//     location: "Davao",
//     status: 0,
//     uploaddate: "04/10/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.pdf",
//   },
//   {
//     id: 4,
//     title: "Publication 5",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Carlos Reyes",
//     location: "Quezon City",
//     status: 1,
//     uploaddate: "05/05/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.pdf",
//   },
//   {
//     id: 5,
//     title: "Publication 6",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Bea Fernandez",
//     location: "Iloilo",
//     status: 2,
//     uploaddate: "06/18/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-6.pdf",
//   },
//   {
//     id: 6,
//     title: "Publication 7",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Rafael Cruz",
//     location: "Batangas",
//     status: 0,
//     uploaddate: "07/20/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-7.pdf",
//   },
//   {
//     id: 7,
//     title: "Publication 8",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Sophia Reyes",
//     location: "Zamboanga",
//     status: 1,
//     uploaddate: "08/15/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-8.pdf",
//   },
//   {
//     id: 8,
//     title: "Publication 9",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Luis Garcia",
//     location: "Taguig",
//     status: 2,
//     uploaddate: "09/09/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-9.pdf",
//   },
//   {
//     id: 9,
//     title: "Publication 10",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Julia Mendoza",
//     location: "Quezon Province",
//     status: 0,
//     uploaddate: "10/12/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-10.pdf",
//   },
//   {
//     id: 10,
//     title: "Publication 11",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Liza Soberano",
//     location: "Cagayan de Oro",
//     status: 1,
//     uploaddate: "11/05/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-11.pdf",
//   },
//   {
//     id: 11,
//     title: "Publication 12",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Enrique Gil",
//     location: "Baguio",
//     status: 2,
//     uploaddate: "12/08/25",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-12.pdf",
//   },
//   {
//     id: 12,
//     title: "Publication 13",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Gerald Anderson",
//     location: "Naga",
//     status: 0,
//     uploaddate: "01/20/26",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-13.pdf",
//   },
//   {
//     id: 13,
//     title: "Publication 14",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Kylie Padilla",
//     location: "Dumaguete",
//     status: 1,
//     uploaddate: "02/10/26",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-14.pdf",
//   },
//   {
//     id: 14,
//     title: "Publication 15",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Alonzo Muhlach",
//     location: "Marinduque",
//     status: 2,
//     uploaddate: "03/17/26",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-15.pdf",
//   },
//   {
//     id: 15,
//     title: "Publication 16",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Diana Zubiri",
//     location: "Siquijor",
//     status: 0,
//     uploaddate: "04/25/26",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-16.pdf",
//   },
//   {
//     id: 16,
//     title: "Publication 17",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Dingdong Dantes",
//     location: "Laguna",
//     status: 1,
//     uploaddate: "05/15/26",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-17.pdf",
//   },
//   {
//     id: 17,
//     title: "Publication 18",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Jennylyn Mercado",
//     location: "Tagbilaran",
//     status: 2,
//     uploaddate: "06/05/26",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-18.pdf",
//   },
//   {
//     id: 18,
//     title: "Publication 19",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Lovi Poe",
//     location: "Batangas",
//     status: 0,
//     uploaddate: "07/18/26",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-19.pdf",
//   },
//   {
//     id: 19,
//     title: "Publication 20",
//     description: "This is a placeholder text for the title of the publication",
//     author: "Maja Salvador",
//     location: "Davao",
//     status: 1,
//     uploaddate: "08/09/26",
//     pdfLink: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-20.pdf",
//   },
// ];

//   const statusMap: { [key: number]: string } = {
//     0: "pending",
//     1: "approved",
//     2: "declined",
//   };
  
// export default function UploadPublication() {
//    const [activeTab, setActiveTab] = useState("all"); // Active tab state
//   const [filter, setFilter] = useState(""); // Filter state to hold the search query

//   // Handle tab changes and reset to the first page when changing the tab
//   const handleTabChange = (newValue: string) => {
//     setActiveTab(newValue); // Update the active tab
//   };

//   // Handle input change
//   const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFilter(event.target.value); // Update the search query
//   };

//   // Filter and sort rows based on the active tab and search query
//   const filteredRows = TABLE_ROWS
//     .filter((row) => {
//       // First filter by active tab (status)
//       if (activeTab !== "all" && row.status.toString() !== activeTab) {
//         return false; // Exclude the row if it doesn't match the selected tab
//       }
//       // Then filter by the search query (title, author, or status)
//       return (
//         row.title.toLowerCase().includes(filter.toLowerCase()) ||
//         row.author.toLowerCase().includes(filter.toLowerCase()) ||
//         statusMap[row.status].includes(filter.toLowerCase())
//       );
//     })
//     .sort((a, b) => {
//       // First, sort by status
//       const statusComparison = a.status - b.status;
//       if (statusComparison !== 0) return statusComparison; // If status is different, return the result of status comparison

//       // If status is the same, then sort by upload date
//       return new Date(a.uploaddate).getTime() - new Date(b.uploaddate).getTime();
//     });

//     const [open, setOpen] = useState(false);

//     const handleOpen = () => {
//       setOpen((prevState) => !prevState);
//     };


//   return (
//     <>
//     <ModalRequest open={open} handleOpen={handleOpen} />
//     <div className="bg-primary px-40 py-7 text-center md:text-left lg:text-left xl:text-left 2xl:text-left">
//               <h1 className="text-2xl font-bold text-white">Publication</h1>
//               <h5 className="text-sm px-5 pt-3 font-bold text-white">Request - Upload</h5>
//     </div>

//     <div className="">
//       <Card className="h-full w-full bg-white px-50 mt-5">
//         <CardHeader floated={false} shadow={false} className="rounded-none">
//           <div className="mb-2 flex items-center justify-between gap-8">
//             {/* <div>
//                 <Typography variant="h5" color="blue-gray">
//                   Publication
//                 </Typography>
//                 <Typography color="gray" className="mt-1">
//                   Upload Publication
//                 </Typography>
//               </div> */}
//               {/* <div className="w-full md:w-72">
//                 <div className="relative h-8 w-full min-w-[500px]">
//                   <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
//                       <FontAwesomeIcon icon={faSearch} className="w-5 h-5 text-gray-700" />
//                   </div>
//                   <input  className="peer h-full w-full rounded-[7px] border border-[#6F9B9E] border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm text-[11px] text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-[#6F9B9E] placeholder-shown:border-t-[#6F9B9E] focus:border-2 focus:border-[#6F9B9E] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" 
//                           placeholder=" " 
//                           value={filter}
//                           onChange={handleFilterChange}
//                   />
//                   <label
//                     className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] text-[11px] leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[10px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-[#6F9B9E] before:transition-all after:pointer-events-none after:mt-[10.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-[#6F9B9E] after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-[#6F9B9E] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#6F9B9E] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-[#6F9B9E] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-[#6F9B9E] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-[#6F9B9E]">                  
//                     Search
//                   </label>
//                 </div>
//               </div> */}


//           <div className="w-full md:w-96 xl:w-1/2 relative flex items-center p-1 rounded-lg border-[1.5px] border-stroke bg-stroke">
//             <input
//               type="text"
//               placeholder="Search Article..."
//               value={filter}
//               onChange={handleFilterChange}
//               className="placeholder-black-900 text-lg px-5 w-full text-black outline-none transition bg-stroke"
//             />
//             <FontAwesomeIcon icon={faSearch} size="lg" color=" text-secondary" />
//           </div>

//               <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
//                 <Link to="/createpublication">
//                     <button className="flex items-center gap-3 bg-[#17C0CC] text-white px-4 py-1 rounded-md hover:bg-[#139B99]">
//                       <FontAwesomeIcon icon={faFilePdf} className="cursor-pointer" />
//                       Upload
//                   </button>
//                 </Link>
              
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
//               <Tabs value={activeTab} className="w-full md:w-max">
//                 <TabsHeader>
//                   {TABS.map(({ label, value }) => (
//                     <Tab key={`Tab${value}`} value={value}>
//                       <button className="text-[12px]" key={value} onClick={() => handleTabChange(value)}>&nbsp;&nbsp;{label}&nbsp;&nbsp;</button>                
//                     </Tab>
//                   ))}
//                 </TabsHeader>
//               </Tabs>
              

//             </div>
//           </CardHeader>

//           <CardBody className="px-0">
//       {/* Wrapper div for scrolling */}
//       <div className="max-h-[500px] min-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-white">
//         <table className="mt-2 w-full min-w-max table-auto text-left">
//           {/* Make the header sticky */}
//           <thead className="sticky top-0 bg-white z-50">
//             <tr>
//                 <th key="title" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
//                   <Typography  variant="small" color="blue-gray"  className="text-[11px] leading-none opacity-70">
//                     TITLE
//                   </Typography>
//                 </th>
//                 <th key="author" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2">
//                   <Typography  variant="small" color="blue-gray"  className="text-[11px] leading-none opacity-70">
//                     AUTHOR
//                   </Typography>
//                 </th>
//                 <th key="status" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
//                   <Typography  variant="small" color="blue-gray"  className="text-[11px] leading-none opacity-70">
//                     STATUS
//                   </Typography>
//                 </th>
//                 <th key="uploaddate" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
//                   <Typography  variant="small" color="blue-gray"  className="text-[11px] leading-none opacity-70">
//                     UPLOAD DATE
//                   </Typography>
//                 </th>
//                 <th key="delete" className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-2 text-center">
//                   <Typography  variant="small" color="blue-gray"  className="text-[11px] leading-none opacity-70">
//                     DELETE
//                   </Typography>
//                 </th>

                
//             </tr>
//           </thead>
//           <tbody >
//             {filteredRows.map(
//               ({ id, title, description, author, location, status, uploaddate, pdfLink }) => {
//                 const classes = "p-1 border-b border-blue-gray-50";
                
//                 return (
//                   <tr key={id}>
//                   <td className={classes}>
//                     <div className="flex items-center gap-3">
//                       <div className="flex flex-col">
//                         <Typography variant="small" color="blue-gray" className="text-[11px]" >
//                           {title}
//                         </Typography>
//                         <Typography variant="small" color="blue-gray" className="text-[11px] opacity-70">
//                           {description}
//                         </Typography>
//                       </div>
//                     </div>
//                   </td>
//                   <td className={classes}>
//                     <div className="block">
//                       <Typography  variant="small" color="blue-gray" className="text-[11px]">
//                         {author}
//                       </Typography>
//                       <Typography  variant="small" color="blue-gray" className="text-[11px] opacity-70">
//                         {location}
//                       </Typography>
//                     </div>
//                   </td>
//                   <td className={`${classes}`}>
//                     <div>
//                       <div>
//                         <Chip className="text-white p-0 m-0 text-[8px] text-center"
//                           value={   status === 0 ? "pending" :
//                                     status === 1 ? "approved" :
//                                     status === 2 ? "declined" : "unknown"
//                                   }
//                           style={{
//                             backgroundColor: status === 0 ? "#fbbf24" :  // yellow-400
//                                               status === 1 ? "#16a34a" :  // green-700
//                                               status === 2 ? "#b91c1c" :  // red-700
//                                               "#ffffff",  // white for default
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </td>
//                   <td className={`${classes} text-center`}>
//                     <Typography variant="small" color="blue-gray" className="text-[11px]" >
//                       {uploaddate}
//                     </Typography>
//                   </td>
//                     <td className={`${classes} text-center z-40`}>
//                       <button className="mt-2 mb-2 md:m-0 bg-red text-white rounded-lg hover:bg-red-500 text-[10px] px-2 py-0 lg:px-2 mx-auto">
//                         <FontAwesomeIcon icon={faTrash} />
//                         <span className="pl-2">Delete</span>
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               }
//             )}
//           </tbody>
//         </table>
//       </div>
//     </CardBody>



//           <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-3 z-50">
//             <div className="flex gap-2">
//             </div>
//           </CardFooter>
//         </Card>
//     </div>
//     </>
//   );
// }