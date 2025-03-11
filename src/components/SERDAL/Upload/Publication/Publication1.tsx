import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectGroupOrderBy from "../../../Template/Forms/SelectGroup/SelectGroupOrderBy";
import PublicationList from "./PublicationList1";


function Publication1()
{

    return(
            <div>
                 <div className="bg-white py-4 mx-auto max-w-[100%]  lg:py-7 xl:max-w-[60%] md:max-w-[90%] " >
                    <div className="flex items-center justify-center">
                        <h1 className="text-sm font-bold uppercase text-[#17C0CC]">Publication</h1>
                    </div>

                    <div className="relative flex items-center justify-center my-3 lg:my-5">
                        <div className="w-full md:w-96 xl:w-1/2 relative flex items-center p-1 rounded-lg border-[1.5px] border-stroke bg-[#85E0E7]">
                        <input type="text" placeholder="Search Publication" className="placeholder-white text-sm px-5 w-full text-white outline-none transition bg-[#85E0E7]" />
                            <FontAwesomeIcon icon={faSearch} size="sm" color="#ffffff" />
                        </div>
                    </div>

                    <div className="px-1 pt-1 pb-1 border-b-[1.5px] border-[#6F9B9E]">
                        <div className="block sm:flex items-center justify-between gap-3 p-1 xl:p-1">
                            <div className="flex items-center justify-center">
                                <h5 className="text-sm font-bold uppercase text-[#6F9B9E]">1000+ Publication Found</h5>     
                            </div>
                            <div className="flex items-center justify-center m-2">
                                <SelectGroupOrderBy Title='Order by' />
                            </div>
                        </div>           
                    </div>

                   <PublicationList/>
                </div>
            </div>
    );
}

export default Publication1;