
import { faDownload, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";



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
    university:number;
    download: number;
    isDeleted: number;
  }
  

  interface University {
    id: number;
    value: string;
    label: string;
    isDeleted: number;
  }

  interface datas{
    data: ApiData[];
    university: University[];
  }



const PublicationsList: React.FC<datas> = ({data, university}) =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [publications, setPublications] = useState<ApiData[]>(data);

    const DownloadClick = async (Id: number) => {
        try {
          const response = await fetch(`${apiUrl}/api/Publication/Download/${Id}`, {
            method: "POST",
          });
      
          if (response.ok) {
            console.log("Download count updated successfully!");
            setPublications((prevPublications) => 
                prevPublications.map((publication) =>
                  publication.id === Id
                    ? { ...publication, download: publication.download + 1 } // Update the download count locally
                    : publication
                ));
          } else {
            console.error("Error updating download count.");
          }
        } catch (error) {
          console.error("Error submitting request:", error);
        }
      };
         

  const truncateTitle = (title: string): string => {
    if (title.length > 500) {
      return `${title.slice(0, 500 - 10)}...`;
    }
    return title;
  };


  const getUniversity = (id:number) =>{
    const filter = university.find((uni) => uni.id === id);
    return filter ? filter?.label : "Unknown University"; 

  }

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


    return(
        <>
            <div className="w-full">
                {publications.map((post) => (
                    <div key={post.id} id={`publication-${post}`} className="flex flex-col px-4 py-5   border-b border-gray-300"> 

                        <div className=" flex items-center justify-between text-sm my-3">
                            <div><h5 className="font-bold">{getUniversity(post.university)}</h5></div>
                            <div><h5>{formatDateTime(post.createdDate)}</h5></div>
                            
                        </div>

                        <h5 className="text-lg font-bold uppercase text-primary py-2 text-left">
                            <Link  to={`/Publication/Info/${post.id}`}>
                                {
                                    post.title
                                }
                            </Link>
                        </h5>

                        <div className="text-sm text-justify">
                            <p>{truncateTitle(post.summary)}</p>
                        </div>

                        <div className="mt-4 flex">
                        {
                            post.pdfFile &&(
                              <div className="">
                                <a href={post.pdfFile} target="_blank" onClick={() =>DownloadClick(post.id)}>
                                  <button className="md:m-0 flex items-center bg-red-600 text-white rounded-lg hover:bg-red-700 text-[10px] px-2 lg:px-2">
                                    <FontAwesomeIcon icon={faFilePdf} />
                                    <span className="pl-2">PDF</span>
                                  </button> 
                                </a> 
                            </div>
                            )
                          }

                          {
                            post.pdfLink &&(
                              <div className="mx-2">
                                <a href={post.pdfLink} target="_blank">
                                  <button className="md:m-0 flex items-center bg-red-600 text-white rounded-lg hover:bg-red-700 text-[10px] px-2 lg:px-2">
                                    <FontAwesomeIcon icon={faFilePdf} />
                                    <span className="pl-2">PDF</span>
                                  </button> 
                                </a> 
                            </div>
                            )
                          }

                          <div className="flex items-center text-xs mx-2">
                            <label><FontAwesomeIcon icon={faDownload} className="" /> <span className="">{post.download}</span></label>
                          </div>


                        </div>
 
                    </div>
                ))}

            </div>
        </>
    );
}

export default PublicationsList;