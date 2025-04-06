import { faFilePdf, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



interface ApiData {
    publications: Publication[]; 
    institution: Institution[];
  }
  
  interface Publication {
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
    institution: number;
    download: number;
    isDeleted: number;
  }
  
  interface Institution {
    id: number;
    value: string;
    label: string;
    isDeleted: number;
  }



function RecentUpload()
{
    const apiUrl = import.meta.env.VITE_API_URL;

    const [publications, setPublications] = useState<Publication[]>([]);
    const [institution, setInstitution] = useState<Institution[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchPublications();
    },[])

        //API Call
        const fetchPublications = async () => {
            setLoading(true);
          
            try {
              const response = await fetch(`${apiUrl}/api/Dashboard/RecentPublication`);
      
              if (response.ok) {
                const jsonData = await response.json(); 
                  
                setPublications(jsonData.publications);
                setInstitution(jsonData.institution);
                console.log(institution);   
                
              }
            } catch (error) {
              console.error('Error fetching publications:', error);
            } finally {
              setLoading(false);
              console.log(publications);
            }
          };
      //#endregion

      const getUniversity = (id:number) =>{
        //console.log(institution);
        //console.log(id);
        const filter = institution.find((uni) => uni.id === id);
       // console.log(filter);
        return filter ? filter?.label : "Unknown Institution"; 
    
      }

      const formatDateTime = (date: string) => {

        if (!date.endsWith('Z')) {
            date = date + 'Z';
          }

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

      const truncateSummary = (title: string): string => {
        if (title.length > 100) {
          return `${title.slice(0, 200 - 10)}...`;
        }
        return title;
      };

    return(
    <div className="col-span-1 rounded-sm border border-stroke bg-white px-4 py-3 shadow-default xl:col-span-4">
        <h1 className="text-xl font-bold my-5">Recent upload</h1>
                {publications.map((post) => (
                    <div key={post.id} id={`publication-${post}`} className="flex flex-col md:mx-10 py-1   border-b border-gray-300"> 

                        <div className=" flex items-center justify-between text-sm my-1">
                            <div><h5 className="font-bold">{getUniversity(post.institution)}</h5></div>
                            <div><h5>{formatDateTime(post.createdDate)}</h5></div>
                            
                        </div>

                        <h5 className="text-md font-bold uppercase text-primary py-1 text-left">
                            <Link      to={`/Publication/Info/${post.id}`} // Ensure this is the correct route
                                onClick={(e) => {
                                  e.preventDefault(); // Prevent React Router's default navigation behavior
                                  window.location.href = `/Publication/Info/${post.id}`; // Force a full page reload
                                }}
                                className="hover:underline"
                              >
                                {
                                    post.title
                                }
                            </Link>
                        </h5>

                        <div className="text-sm text-justify">
                            <p>{truncateSummary(post.summary)}</p>
                        </div>

                        <div className="mt-4 flex">
                        {
                            post.pdfFile &&(
                              <div className="">
                                <a href={post.pdfFile} target="_blank" onClick={() =>DownloadClick(post.id)}>
                                  <button className="md:m-0 flex items-center bg-red-600 text-white rounded-sm hover:bg-red-700 text-sm px-2 lg:px-2 py-1">
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
    );
}

export default RecentUpload;