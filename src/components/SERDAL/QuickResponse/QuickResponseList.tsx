
import { faCalendar, faCalendarAlt, faDownload, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import quickResponseData from "./Data/QuickResponseData";
import { QuickResponseData } from "./Data/QuickResponseData";



interface ApiData {
    id: number;
    citation: string;
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
    institution:number;
    publication_Institutions: string;
    download: number;
    isDeleted: number;
    publicationDate: string;
    publicationYear: number;
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

  interface QuickResponseListProps {
  data: QuickResponseData[];
}



const QuickResponseList: React.FC<QuickResponseListProps> = ({data}) =>{

        const truncateTitle = (title: string): string => {
          if (title.length > 30) {
            return `${title.slice(0, 50 - 5)}...`;
          }
          return title;
        };

      const truncateAbstract = (value: any): string => {
        if (typeof value === "string") {
          return value.length > 500 ? value.slice(0, 200) + "..." : value;
        }

        // If it's a JSX element (e.g., <p>text</p>)
        if (value && typeof value === "object" && "props" in value) {
          const text = (value as any).props.children;
          if (typeof text === "string") {
            return text.length > 500 ? text.slice(0, 200) + "..." : text;
          }
        }
        return ""; 
      };

    return (
      <> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 m-2">
          {data.map((item) => (
            <div
              className="group w-full border border-secondary rounded-md overflow-hidden shadow-sm hover:shadow-lg hover:bg-gray-200 transition-shadow duration-300"
            >
               <Link to={`/QuickResponse/Info/${item.id}`}>
              <div className="overflow-hidden">
                <img
                  src={item.img}
                  alt="Example Image"
                  className="w-full h-55 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-4">
             
                <h2 className="text-lg font-semibold text-gray-800 cursor-pointer hover:underline group-hover:text-primary">
                  {truncateTitle(item.title)}
                </h2>
              

                <p className="text-sm font-semibold text-gray-800 my-3">
                  <span className="mr-2"><FontAwesomeIcon icon={faCalendarAlt}/></span>{item.year}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {truncateAbstract(item.Abstract)}
                </p>
              </div>
              </Link>
            </div>
          ))}
        </div>
      </>
    );

}

export default QuickResponseList;