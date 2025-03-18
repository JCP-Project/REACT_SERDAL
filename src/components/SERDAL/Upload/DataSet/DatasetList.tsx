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
 
                    </div>
                ))}

            </div>
        </>
  );
}

export default DatasetList; // Correct the export statement
