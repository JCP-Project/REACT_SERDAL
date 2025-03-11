import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMessage, faPhone } from "@fortawesome/free-solid-svg-icons";


function footer() {



  return (
        <>
            <div className="flex items-center justify-center md:justify-between flex-wrap text-sm py-15">

                <div className="max-w-100 max:h-40 text-justify">
                    <div><img src="/AllLogo.png" className="w-auto"></img></div>
                    <div className="p-5">Capacity Building Toward Innovative and Inclusive Policymaking for the Development in the Agriculture, Aquatic, and Natural Resources (AANR) Sector</div>
                </div>

                <div className="max-w-100">
                    <h2 className="text-primary text-2xl">Contact Us</h2>
                    <div className="flex items-center text-white text-sm py-2">
                        <FontAwesomeIcon icon={faHouse}  className="text-xl pr-3"/>
                        Domingo M. Lantican Ave University of the Philippines Los Baños, College, Batong Malake, Los Baños, 4031 Laguna, Philippines
                    </div>
                    <div className="flex items-center text-white text-sm py-2">
                        <FontAwesomeIcon icon={faPhone}  className="text-xl pr-3"/>
                        (049) 536-3637
                    </div>
                    <div className="flex items-center text-white text-sm py-2">
                        <FontAwesomeIcon icon={faMessage}  className="text-xl pr-3"/>               
                        diplab.uplb@up.edu.ph
                    </div>


                </div>
            </div>
        </>
  );
}

export default footer;
