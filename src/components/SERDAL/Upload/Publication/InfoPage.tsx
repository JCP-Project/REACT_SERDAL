import { faArrowCircleLeft, faArrowLeft, faCalendarAlt, faCheck, faClose, faFilePdf, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectGroupOrderBy from "../../../Template/Forms/SelectGroup/SelectGroupOrderBy";
import PublicationList from "./PublicationList";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';



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

  universityList: University[];
}

interface Publication {
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
}

interface University {
  id: number;
  value: string;  // Name or other info of the university
  label: string;  // A label or additional info
  isDeleted: number;
}


function Info() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { infopage } = useParams(); 
  const [data, setData] = useState<APIData>();
  const [relatedArticle, setrelatedArticle] = useState<Publication[]>([]);
  const [university, setUniversity] = useState<University[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
   fetchData(Number(infopage));
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
     console.error("Error fetching publication data");
   }
 } catch (error) {
   console.error("Error fetching publication data:", error);
 }
};

const getUniversity =  (id:number) =>{
  const filter = university.find((uni) => uni.id === id);
  return filter ? filter?.label : "Unknown University"; 

}





  // if (loading) {
  //   return <div className="text-center">Loading...</div>;
  // }

  const handleBackClick = () => {
    window.history.back(); // This will navigate to the previous page in the browser's history
  };

  const adminStatus = sessionStorage.getItem('isAdmin') === 'true';

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
              <FontAwesomeIcon icon={faArrowLeft} className="font-bold" />
            </button>
          </div>        
      )
    }


    
      <div className="bg-white min-h-screen px-4 md:px-[15%] pt-1 md:pt-10 ">



          <div>
               <p className="text-black-980 text-black-800 text-xs md:text-sm mt-auto mb-3">
                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                    <span>
                    {new Date(data?.createdDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    </span>
                </p>            
          </div>

          <div className="text-left py-2 md:py-10"><h1 className="text-sm lg:text-3xl md:text-4xl leading-relaxed text-primary">  {data?.title} </h1></div>

          <div className="py-5 text-xs lg:text-lg leading-relaxed">
            <div><h5><span className="font-bold">Authors: </span>{data?.author}</h5></div>
          </div>

          {
            data?.imgPath && data.imgPath.trim() !== "" ? (
                <div>
                  <img className="mx-auto md:h-[800px] border-[3px] rounded-lg border-primary" src={data.imgPath} alt="Publication" />
                </div>
              ) : null
            }



          <div className="yp-2 lg:py-10 text-xs md:text-lg leading-relaxed">
            <div className="py-1 lg:py-5"><h5><span className="font-bold">Abstract:</span></h5></div>
            <div><p className="text-left lg:text-justify ">{data?.summary}</p></div>
          </div>

          <div className="py-4 lg:py-10 text-xs lg:text-lg leading-relaxed">
            <div><h5><span className="font-bold">Keywords: </span>{data?.keywords}</h5></div>
          </div>


          <div className="py-1 text-xs lg:text-lg lg:py-5">
            <div><span className="font-bold">PDF File: </span><a href={data?.pdfFile} target="_blank" className="pl-1 hover:text-primary"><span className="text-red"><FontAwesomeIcon icon={faFilePdf}/></span>View PDF</a></div>
            {
              !data?.pdfLink || data?.pdfLink.trim() === "" ? 
              (
                <div></div>
                
              ):(
                <div><span className="font-bold">PDF Link: </span><a href={data?.pdfLink} target="_blank" className="pb-5 text-blue-500 underline hover:text-primary">Click here</a></div>
              )
            }
            
          </div>
          {/* <div>
            <div className="py-5">Note:</div>
            <div className="text-left pb-5">
              <p>
                  This policy brief is an output of the participants of the Development Innovations and Policy Laboratory (DIP Lab) Policy Hackathon, Polisiya, Pasya, Syensya: Sta Cruz Watershed, and is intended to promote policy-relevant ideas among key decision makers. This publication has been internally reviewed but not peer-reviewed. Published by the Center for Strategic Planning and Policy Studies, and the Development Innovations and Policy Laboratory, in celebration of the 25th Founding Anniversary of the College of Public Affairs and Development, University of the Philippines Los Baños.
              </p>
            </div>
          </div> */}

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
                    {relatedArticle.map(({id, title, summary, pdfFile, pdfLink, createdDate, university}) => (
  
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
                          <div><h5 className="font-bold">{getUniversity(university)}</h5></div>
  
                              <div>
                                    <p className="text-black-980 text-black-800 text-xs md:text-xs mt-auto mb-3">
                                  <FontAwesomeIcon icon={faCalendarAlt} className="mr-1" />
                                    <span>
                                    {new Date(createdDate).toLocaleDateString('en-US', {
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
            adminStatus &&( 
          <div className="fixed bottom-5 right-5">
            <div className="flex w-80 h-10 justify-end">
                  <div>
                    <span>
                    <button className="bg-primary text-white font-medium mx-2 px-6 py-2 rounded-lg shadow-md 
                      hover:bg-primary-dark transition duration-300 ease-in-out 
                      active:scale-95 focus:outline-none" disabled = {data?.status == 0 ? true : false}>
                        Approve
                    </button>
                    </span>
                  </div>

                  <div>
                    <span>
                    <button className="bg-red-500 text-white font-medium mx-2 px-6 py-2 rounded-lg shadow-md 
                      hover:bg-primary-dark transition duration-300 ease-in-out 
                      active:scale-95 focus:outline-none" disabled = {data?.status == 0 ? true : false}>
                        Decline
                    </button>

                    </span>
                </div>

            </div>
          </div>
          )
        }
      </div>


    </>
  );
}

export default Info;
