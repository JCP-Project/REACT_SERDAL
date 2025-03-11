import { useEffect, useRef, useState } from "react";
import Loader from "../../../../common/Loader/Loader2"; // Assuming you have this component
import Select, { StylesConfig } from 'react-select'; // Assuming you're using react-select
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";


interface DataSets {
  id: number;
  title: string;
  dataGroup: DataGroup[];
}

interface DataGroup {
  production: string;  // ✅ Correct key
  description: string;
  dataYear: string[];
  series: Series[];
}


interface Series {
  name: string;
  data: number[];
}


const DatasetList: React.FC<{dataSets:DataSets[]}> = ({dataSets}) => { // Remove the <> if you're not using props



  return (
<>
            <div className="w-full">
                {dataSets.map((data) => (
                    <div key={data.id} id={`publication-${data.id}`} className="flex flex-col px-4 py-5   border-b border-gray-300"> 

                        <h5 className="text-lg font-bold uppercase text-primary py-2 text-left">
                            <Link  to={`/datasets/generatechart/${data.id}`}>
                                {
                                    data.title
                                }
                            </Link>
                        </h5>
                        <ul className="list-disc list-inside space-y-2 text-gray-800">
                            {data.dataGroup.map((datagroup, index) => (
                              <li
                                key={index}
                                className=""
                              >
                                <span className="text-sm text-primary-600">
                                  {datagroup.production}
                                </span>
                              </li>
                            ))}
                          </ul>


                        {/* <div className="mt-4 flex">
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


                        </div> */}
 
                    </div>
                ))}

            </div>
        </>
  );
}

export default DatasetList; // Correct the export statement
