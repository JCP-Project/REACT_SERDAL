import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface Publication {
  id: number;
  title: string;
  imageUrl: string;
}

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
  isDeleted: number;
}

interface datas{
  data: ApiData[];
}


const PublicationList: React.FC<datas> = ({data}) =>{

  //console.log("TEST", data);
  const truncateTitle = (title: string): string => {
    if (title.length > 121) {
      return `${title.slice(0, 121 - 10)}...`;
    }
    return title;
  };

  return(
      <>
        {
          data.map((publication) => (
            <div
              key={publication.id}
              className="max-w-[155px] md:max-w-[325px] h-[380px] md:h-[670px] 
                        bg-white border border-gray-200 rounded-lg shadow-sm m-1 md:m-2 
                        flex flex-col hover:bg-[#f7fcfc]" 
              >
                        <a href="#">
                          <img
                            className="rounded-t-lg h-[220px] md:h-[500px] object-contain"
                            src={publication.imgPath}
                            alt={publication.title}
                          />
                        </a>
              
                        <Link to={`/Publication/Info/${publication.id}`}>
                            <div className="p-2 ">
                                <h5 className="mb-2 text-xs md:text-lg font-bold text-[#43B4BE]">
                                  {truncateTitle(publication.title)}
                                </h5>
                            </div>
                        </Link>

                        {/* This p tag will be pushed to the bottom */}
                        <p className="text-black-980 text-black-800 text-xs md:text-sm mt-auto ml-3 mb-3">
                          <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                          <span>
                            {new Date(publication.createdDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </p>
                </div>
              
            ))
        }
      </>

  );
}



// function PublicationList1({data} :{data:ApiData[]} ) {
//   const [publications, setPublications] = useState<ApiData[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string>('');
//   const [displayPublications, setDisplayPublications] = useState<ApiData[]>([]); // Display Publications
  
//   const itemsPerPage = 6;

//   useEffect(() => {
//     // Fetch the publications data from JSON file
//     const fetchData = async () => {
//       try {
//         // if (!response.ok) {
//         //   throw new Error('Failed to fetch publications');
//         // }
        
//         //const data = await response.json();
//         setPublications(data);
//         console.log("TEST",data);
//         setDisplayPublications(data.slice(0, itemsPerPage)); // Display first page of publications initially
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // useEffect(() => {
//   //   const fetchData = async () => {
      
//   //     try {
//   //       const response = await fetch(`https://localhost:7242/api/Publication/Publication`, {
//   //         method: "GET",
//   //       });

//   //       if (response.ok) {
//   //         const jsonData: ApiData[] = await response.json();
//   //         setPublications(jsonData);
//   //         setDisplayPublications(jsonData.slice(0, itemsPerPage)); 

//   //       } else {
//   //         console.error("Error fetching publication data");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error fetching publication data:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchData();  // Call the function when the component mounts
//   // }, []);  // Empty dependency array ensures it runs once when the component mounts

  
//   if (loading) {
//     console.log("loading");
//     return <div className="text-center">Loading...</div>;

//   }

//   if (error) {
//     return <div className="text-center text-red-500">{`Error: ${error}`}</div>;
//   }

//   const totalPages = Math.ceil(publications.length / itemsPerPage);

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//       setDisplayPublications(publications.slice((page - 1) * itemsPerPage, page * itemsPerPage)); // Set new publications
//     }
//   };


//   const truncateTitle = (title: string): string => {
//     if (title.length > 121) {
//       return `${title.slice(0, 121 - 10)}...`;
//     }
//     return title;
//   };
  

//   return (
//     <>
//       <div className="flex flex-wrap items-center justify-center">
//         {displayPublications.length > 0 ? (
//           displayPublications.map((publication) => (
//         <div
//           key={publication.id}
//           className="max-w-[155px] md:max-w-[325px] h-[380px] md:h-[670px] 
//                     bg-white border border-gray-200 rounded-lg shadow-sm m-1 md:m-2 
//                     flex flex-col" 
//         >
//           <a href="#">
//             <img
//               className="rounded-t-lg h-[220px] md:h-[500px] object-contain"
//               src={publication.imgPath}
//               alt={publication.title}
//             />
//           </a>

//           <a href="#">
//             <div className="p-2 hover:bg-[#f7fcfc]">
//               <h5 className="mb-2 text-xs md:text-lg font-bold text-[#43B4BE]">
//                 {truncateTitle(publication.title)}
//               </h5>
//             </div>
//           </a>

//           {/* This p tag will be pushed to the bottom */}
//           <p className="text-black-980 text-black-800 text-xs md:text-sm mt-auto ml-3 mb-3">
//             <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
//             <span>
//               {new Date(publication.createdDate).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//               })}
//             </span>
//           </p>
//         </div>

//           ))
//         ) : (
//           <div className="w-full text-center text-gray-500">Loading publications...</div>
//         )}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center my-5">
//         {/* Previous Button */}
//         <button
//           className={`px-4 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white'}`}
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           &lt;
//         </button>

//         {/* Page Number Buttons */}
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             className={`px-4 py-1 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}

//         {/* Next Button */}
//         <button
//           className={`px-4 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary text-white'}`}
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           &gt;
//         </button>
//       </div>
//     </>
//   );
// }

export default PublicationList;
