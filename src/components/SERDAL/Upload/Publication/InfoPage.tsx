import { faArrowCircleLeft, faArrowLeft, faCalendarAlt, faCheck, faClose, faFilePdf, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectGroupOrderBy from "../../../Template/Forms/SelectGroup/SelectGroupOrderBy";
import PublicationList from "./PublicationList";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";
import Swal from 'sweetalert2';

interface APIData {
  id: number;
  title: string;
  author: string;
  summary: string;
  university: number; 
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
  publicationDate:string;
  journal: string;
  citation: string;
  publication_Institutions: string;
  universityList: University[];
}

interface Publication {
  id: number;
  title: string;
  author: string;
  summary: string;
  institution: number; 
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
  journal: string;
  citation: string;
  publication_Institutions: string;
  publicationDate:string;
}

interface University {
  id: number;
  value: string;  // Name or other info of the university
  label: string;  // A label or additional info
  isDeleted: number;
}

interface UpdateStatus{
  Id: number;
  status: number;
  ModifiedBy: number;
  isDeleted: number;
}


function Info() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("APIToken");

  const { infopage } = useParams(); 
  const [data, setData] = useState<APIData>();
  const [relatedArticle, setrelatedArticle] = useState<Publication[]>([]);
  const [university, setUniversity] = useState<University[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to the top on every route change
    fetchData(Number(infopage));  // Fetch the data for the specific page
  }, [infopage]);  // Depend on `infopage` so it runs when it changes

  useEffect(() => {
    const [postId] = infopage.split('-'); 
   fetchData(Number(postId));
  }, []); 



  

  const fetchData = async (id:number) => {

   try {
     const response = await fetch(`${apiUrl}/api/Publication/Info/${id}`, {
       method: "GET",
     });
 
     if (response.ok) {
       const jsonData: APIData = await response.json();
      setData(jsonData.publication);     
      setUniversity(jsonData.university);
      fetchRelatedArticle(jsonData.publication.keywords, jsonData.publication.university);
     } else {
       console.error("Error fetching publication data");
     }
   } catch (error) {
     console.error("Error fetching publication data:", error);
   }
 };



 const fetchRelatedArticle = async (keywords:string,Id:number) => {
 try {
    const response = await fetch(`${apiUrl}/api/Publication/RelatedArticle?keywords=${encodeURIComponent(keywords)}&Id=${Id}`);

   if (response.ok) {
     const jsonData: Publication[] = await response.json();
     setrelatedArticle(jsonData);
   } else {
     console.log("No related article found");
   }
 } catch (error) {
   console.error("Error fetching publication data:", error);
 }
};

const getUniversity =  (id:number) =>{
  const filter = university.find((uni) => uni.id === id);
  return filter ? filter?.label : "Unknown University"; 
}


  const handleBackClick = () => {
    window.history.back();
  };

  const adminStatus = localStorage.getItem('isAdmin') === 'true';

  const truncateTitle = (title: string): string => {
    if (title.length > 500) {
      return `${title.slice(0, 500 - 10)}...`;
    }
    return title;
  };

  const handleReloadAndNavigate = (id:number) => {
    window.location.href = `/Publication/Info/${id}`;
    window.location.reload(); // Forces a full reload
  };


  const formatDateTime = (date: string) => {
    const d = new Date(date);
    
    // Create the options object with the correct format
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // AM/PM format
    };
  
    return d.toLocaleString('en-US', options);
  };




    const handleStatus = (status: number, isDelete: number) => {
      const userId = Number(localStorage.getItem('id'));
      const actionText = status === 1 ? "approve" : "decline";
      const updateStatus: UpdateStatus = {
        Id: Number(data?.id),
        status: status,
        ModifiedBy: userId,
        isDeleted: isDelete,
      };
    
      //setStatus(updateStatus);
    
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



  //update status
  const ApproveRequest = async (bodyData: UpdateStatus, actionText:string) => {
    try {
      const response = await fetch(`${apiUrl}/api/Publication/UpdateStatus`, {
        method: "POST",  // Correct method spelling
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bodyData),
      });
  
      if (response.ok) {
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

        fetchData(Number(infopage));

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


  


  return (
    <>
    {
      adminStatus && (
            <div className="fixed ml-2 top-1/2 transform -translate-y-1/2">
            <button
              onClick={handleBackClick}
              className="bg-primary text-white py-8 px-1 text-lg font-semibold rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary-400
                        hover:scale-110 transition-transform duration-200 ease-in-out"
            >
              <FaAngleLeft />
            </button>
          </div>        
      )
    }




      <div className="bg-white min-h-screen px-4 md:px-[15%] pt-5 md:pt-10">



          <div>
               <p className="text-black-980 text-black-800 text-xs md:text-sm mt-auto mb-3">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                    <span>
                    {new Date(`${data?.publicationDate}Z`).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    </span>
                </p>            
          </div>

          <div className="py-1 text-xs lg:text-lg text-primary leading-relaxed flex justify-center items-center">
            <div><h5><span className="font-bold"></span>{data?.citation}</h5></div>
          </div>

          <div className="py-2 text-xs lg:text-4xl font-bold leading-relaxed flex justify-center items-center">
            <div><h5><span className="font-bold"></span>{data?.journal}</h5></div>
          </div>

          <div className="text-left py-2 md:py-10"><h1 className="text-sm lg:text-3xl md:text-4xl leading-relaxed text-primary">  {data?.title} </h1></div>

          <div className="py-2 text-xs lg:text-lg leading-relaxed">
            <div><h5><span className="font-bold">Authors: </span>{data?.author}</h5></div>
          </div>

          <div className="py-2 text-xs lg:text-lg leading-relaxed">
            <div><h5><span className="font-bold">Institutions: </span>{data?.publication_Institutions}</h5></div>
          </div>

          {
            data?.imgPath && data.imgPath.trim() !== "" ? (
                <div>
                  <img className="mx-auto md:h-[800px] border-[3px] rounded-lg border-primary" src={data.imgPath} alt="Publication" />
                </div>
              ) : null
            }
          <div className="yp-2 lg:py-5 text-xs md:text-lg leading-relaxed">
            <div className="py-1"><h5><span className="font-bold">Abstract:</span></h5></div>
            <div><p className="text-left lg:text-justify ">{data?.summary}</p></div>
          </div>

          <div className="py-4 lg:py-10 text-xs lg:text-lg leading-relaxed">
            <div><h5><span className="font-bold">Keywords: </span>{data?.keywords}</h5></div>
          </div>


          <div className="py-1 text-xs lg:text-lg lg:py-5">
            
            {
              !data?.pdfFile || data?.pdfFile.trim() === "" ? 
              (
                <div>PDF File: ---</div>
                
              ):(
                <div><span className="font-bold">PDF File: </span><a href={data?.pdfFile} target="_blank" className="pl-1 hover:text-primary"><span className="text-red"><FontAwesomeIcon icon={faFilePdf}/></span>View PDF</a></div>
              )
            }
            
            
            {
              !data?.pdfLink || data?.pdfLink.trim() === "" ? 
              (
                <div>PDF Link: ---</div>
                
              ):(
                <div><span className="font-bold">PDF Link: </span><a href={data?.pdfLink} target="_blank" className="pb-5 text-blue-500 underline hover:text-primary">Click here</a></div>
              )
            }
            
          </div>

          {
            relatedArticle.length > 0 && (
              <div className={`${adminStatus ? 'hidden' : 'block'}`}> 
              <div className="border-b-2 border-dashed border-gray-500 h-10 mb-5"></div>          
              <div>
                <h1 className="text-black text-sm lg:text-3xl pb-10">RELATED ARTICLES</h1>
              </div>
  
              <div className="flex items-center justify-center flex-wrap">
  
                  <div className="w-full lg:py-5"
                    >
                    {relatedArticle.map(({id, title, summary, pdfFile, pdfLink, createdDate, institution}) => (
  
                        <div key={id} id={`relatedArticleId-${id}`} className="flex flex-col px-4 py-2 border-b">
                          <Link
                              key={id}
                              to={`/Publication/Info/${id}`}
                              onClick={(e) => {
                                e.preventDefault(); // Prevent default navigation behavior
                                window.location.href = `/Publication/Info/${id}`; // Navigate and reload
                              }}
                            >
                          <div className=" flex items-center justify-between text-xs my-3">
                          {/* <div><h5 className="font-bold">{getUniversity(institution)}</h5></div> */}
  
                              <div>
                                    <p className="text-black-980 text-black-800 text-xs md:text-xs mt-auto mb-3">
                                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                    <span>
                                    {new Date(`${createdDate}Z`).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                    </span>
                                </p> 
                              </div>
                              
                          </div>
  
                          <h5 className="text-xs lg:text-sm font-bold uppercase text-primary py-2">
                            {truncateTitle(title.trim())}
                          </h5>
  
                          <div className="text-xs lg:text-sm text-justify">
                            <p>{truncateTitle(summary.trim())}</p>
                          </div>
                          </Link>
                          <div className="mt-4 flex">
                            {
                              pdfFile &&(
                                <div>
                                  <a href={pdfFile} target="_blank">
                                    <button className="md:m-0 flex items-center bg-red-600 text-white rounded-lg hover:bg-red-700 text-[10px] px-2 lg:px-2">
                                      <FontAwesomeIcon icon={faFilePdf} />
                                      <span className="pl-2">PDF</span>
                                    </button> 
                                  </a> 
                              </div>
                              )
                            }
  
                            {
                              pdfLink &&(
                                <div className="mx-1">
                                  <a href={pdfLink} target="_blank">
                                    <button className="md:m-0 flex items-center bg-red-600 text-white rounded-lg hover:bg-red-700 text-[10px] px-2 lg:px-2">
                                      <FontAwesomeIcon icon={faFilePdf} />
                                      <span className="pl-2">PDF</span>
                                    </button> 
                                  </a> 
                              </div>
                              )
                            }
                          </div>
                        </div>
  
                    ))}
                  </div>
  
  
                </div>
            </div>
            )
          }


          {
            data && (
              <div>
          {
            adminStatus && data.status == 0 &&( 
          <div className="fixed bottom-5 right-5">
            <div className="flex w-80 h-10 justify-end">
                  <div>
                    <span>
                    <button className="bg-primary text-white font-medium mx-2 px-6 py-2 rounded-lg shadow-md 
                      hover:bg-primary-dark transition duration-300 ease-in-out 
                      active:scale-95 focus:outline-none" 
                      onClick={() => handleStatus(1, 0)}
                      >
                        Approve
                    </button>
                    </span>
                  </div>

                  <div>
                    <span>
                    <button className="bg-red-500 text-white font-medium mx-2 px-6 py-2 rounded-lg shadow-md 
                      hover:bg-primary-dark transition duration-300 ease-in-out 
                      active:scale-95 focus:outline-none"
                      onClick={() => handleStatus(2, 0)}
                      >
                        Decline
                    </button>

                    </span>
                </div>

            </div>
          </div>
          )
        }
              </div>
            )
          }


      </div>


    </>
  );
}

export default Info;
