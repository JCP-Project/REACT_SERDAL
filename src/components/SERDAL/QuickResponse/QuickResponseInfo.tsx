import { useParams } from "react-router-dom";
import quickResponseData from "./Data/QuickResponseData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faBuilding, faCalendarAlt, faPeopleArrowsLeftRight, faTag, faUsers } from "@fortawesome/free-solid-svg-icons";

const QuickResponseInfo = () => {
  const { infopage } = useParams();
  const item = quickResponseData.find((q) => q.id === Number(infopage));

  if (!item) return <p className="text-center mt-10 text-red-500">Publication not found.</p>;

  return (
    <>
    <div className="bg-primary text-white py-10 px-3 text-center">
                <h2 className="text-2xl font-bold">{item.title}</h2>
    </div>
    <div className="container mx-auto px-4 py-6">

         

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left side - Details */}
        <div className="p-6">
        

          <p className="text-sm font-semibold text-gray-600 my-1"><span className="mr-2"><FontAwesomeIcon icon={faCalendarAlt}/></span> <strong>Publication Year:</strong>  {item.year}</p>
         
          <p className="text-sm text-gray-700 my-1">
            <span className="mr-1"><FontAwesomeIcon icon={faUsers}/></span> <strong>Author(s):</strong> {item.Authors}
          </p>

          <p className="text-sm text-gray-700 my-1">
             <span className="mr-1"><FontAwesomeIcon icon={faBuilding}/></span> <strong>Institution:</strong> {item.Institution}
          </p>

          <p className="text-sm text-gray-700 my-1">
           <span className="mr-1"><FontAwesomeIcon icon={faTag}/></span>  <strong>Keywords:</strong> {item.Keywords}
          </p>
            <br/>
          <div><strong>Abstract:</strong></div>
          <div className="mt-4 text-gray-700">{item.Abstract}</div>
        </div>

        <div className="p-6 flex flex-col items-center">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-auto object-cover rounded-md mb-4 shadow"
          />
          <a
            href={item.PDF}
            target="_blank" 
            rel="noopener noreferrer"
            download
            className="bg-primary hover:bg-secondary text-white px-4 py-2 rounded flex items-center"
          >
            <FontAwesomeIcon icon={faArrowDown} className="mr-2" />
            Download File
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default QuickResponseInfo;
