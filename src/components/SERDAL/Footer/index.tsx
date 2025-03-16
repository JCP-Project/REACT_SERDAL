import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMessage, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";


function footer() {



  return (
        <>
            <div className="flex items-center justify-center md:justify-between flex-wrap text-sm py-15">

                <div className="max-w-100 max:h-50 text-justify">
                    <div className="w-auto h-50 flex items-center justify-center"><img src="/logo.png" className="w-auto h-50"></img></div>
                    <div className="py-2">Advancing Socio-Economics Research through Data Analytics</div>
                </div>

                <div className="max-w-100">
                    <h2 className="text-primary text-2xl">Contact Us</h2>
                    <div className="flex items-center text-white text-sm py-2">
                        <FontAwesomeIcon icon={faHouse}  className="text-xl pr-3"/>
                        Institute of Cooperatives and Bio-Enterprise Development (ICOPED) Fabian A. Tiongson Avenue, University of the Philippines Los Baños, College, Laguna, 4031 Philippines
                    </div>
                    <div className="flex items-center text-white text-sm py-2">
                        <FontAwesomeIcon icon={faPhone}  className="text-xl pr-3"/>
                        +63 961-057-5841 (also available in viber)
                    </div>
                    <div className="flex items-center text-white text-sm py-2">
                        <FontAwesomeIcon icon={faPhone}  className="text-xl pr-3"/>
                        +63 927-963-4704
                    </div>
                    <div className="flex items-center text-white text-sm py-2">
                        <FontAwesomeIcon icon={faMessage}  className="text-xl pr-3"/>               
                        Serdal.uplb@up.edu.ph
                    </div>
                    <div className="flex items-center text-white text-sm py-3">
                        <Link to={"https://www.facebook.com/UPLB.SERDAL"} target="_">
                            <div className="bg-[#1877F2] h-9 w-9 flex items-center justify-center  rounded-full">
                            <FaFacebook className="h-5 w-5" />
                            </div>     
                        </Link>          
                    </div>


                </div>
            </div>
        </>
  );
}

export default footer;
