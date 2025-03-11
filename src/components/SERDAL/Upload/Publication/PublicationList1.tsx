import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PublicationList1()
{
  const publications = new Array(20).fill(null);

    return(
        <>
            <div className="overflow-y-auto max-h-[100vh] sm:max-h-400px scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-[#EDFEFF]">
                {publications.map((_, index) => (
                    <div key={index + 1} id={`publication-${index + 1}`} className="flex flex-col px-4 py-1 mt-1 border-b border-gray-300">
                        <h5 className="text-xs font-bold uppercase text-secondary">Publication {index + 1}</h5>

                        <div className="block md:flex items-center justify-between">
                            <div className="text-secondary text-[11px]">This is a placeholder text for the title of the publication</div>
                            <div>
                                <button className="mt-2 mb-2 md:m-0 flex items-center bg-red-600 text-white rounded-lg hover:bg-red-700 text-[10px] px-2 py-0  lg:px-2">
                                    <FontAwesomeIcon icon={faFilePdf}></FontAwesomeIcon>
                                    <span className="pl-2">PDF</span>
                                </button>    
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );
}

export default PublicationList1;