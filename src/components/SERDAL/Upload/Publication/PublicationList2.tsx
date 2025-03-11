import { faArrowRight, faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PublicationList2() {
  const publications = new Array(54).fill(null);

  return (
    <>
      <div className="overflow-y-auto max-h-[100vh] sm:max-h-400px scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-[#EDFEFF] flex flex-wrap items-center justify-center z-50 ">
        {publications.map((_, index) => (
          <div key={index} className="max-w-[155px] sm:max-w-[180px]  lg:max-w-[200px] xxl:max-w-[200px] 
                            bg-white border border-gray-200 rounded-lg shadow-sm 
                            m-1 z-1 sm:m-1 lg:m-1.5 xl:1.5 xxl:1.5
                            hover:border-b-primary hover:shadow-lg transition-all duration-300 delay-200">
           
            <a href="#">
              <img className="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
            </a>
            <div className="p-2">
              <a href="#">
                <h5 className="mb-2 text-sm font-bold tracking-tight text-secondary dark:text-white">
                  Publication {index + 1}
                </h5>
              </a>
              <p className="mb-3 text-gray-700 dark:text-gray-400 text-justify leading-tight text-[10px] ">
              This is a placeholder text for the title of the publication
              </p>

              <div className="flex items-center justify-between w-full">
                    <FontAwesomeIcon className="pl-1 text-red text-xl hover:text-red-500" icon={faFilePdf} />
                    <button className="mt-2 mb-2 md:m-0 bg-primary text-white rounded-lg hover:bg-secondary text-[10px] px-2 py-0 lg:px-2 flex items-center justify-center pr-1">
                        <span className="mr-1">Read more</span>
                        <FontAwesomeIcon className="text-sm" icon={faArrowRight} />
                    </button>
                </div>
              

            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PublicationList2;
