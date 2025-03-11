import { faFilePdf, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function RecentUpload()
{
    const publications = new Array(5).fill(null);

    return(
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-md font-semibold text-black dark:text-white">
            Recent Upload
          </h4>
        </div>

      </div>

            <div className="mt-5">
                {publications.map((_, index) => (
                    <div key={index + 1} id={`publication-${index + 1}`} className="flex flex-col px-2 py-1 mt-1 border-b border-gray-300">
                        <h5 className="text-xs font-bold uppercase text-secondary">Publication {index + 1}</h5>

                        <div className="block md:flex items-center justify-between">
                            <div className="text-secondary text-[11px]">This is a text for the title of the publication</div>
                            <div>
                                <button className="mt-2 mb-2 md:m-0 flex items-center bg-red-600 text-white rounded-lg hover:bg-red-700 text-[10px] px-2 py-0  lg:px-2">
                                    <FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon>
                                    <span className="pl-2">PDF</span>
                                </button>    
                            </div>
                        </div>
                        <div className="text-secondary text-[8px] m-0 p-0">
                            {index} day's ago
                        </div>
                    </div>
                ))}

            </div>

    </div>
    );
}

export default RecentUpload;