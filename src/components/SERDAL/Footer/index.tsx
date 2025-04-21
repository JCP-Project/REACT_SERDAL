import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMessage, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FaFacebook, FaFacebookF, FaLinkedin, FaTwitter, FaX, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";
import contactUsData from '../Resources/ContactUs/contactData'
import { ReactNode, useEffect, useState } from "react";

import { SocialIcon } from 'react-social-icons'

import UPLB from '../Resources/logo.png'
import { FaInstagram } from "react-icons/fa";

interface ContactData {
    address: ReactNode;
    contact1: string;
    contact2: string;
    email: string;
    fb: string;
}

function footer() {
    const [data, setData] = useState<ContactData>()

    useEffect(() =>{
        setData(contactUsData);
    },[])

  return (
        <>
            <div className="font-optima flex items-center justify-center md:justify-between flex-wrap text-sm py-15">

                <div className="max-w-100 max:h-50 text-justify">
                    <div className="w-auto h-50 flex items-center justify-center"><img src={UPLB} className="w-auto h-50"></img></div>
                    <div className="py-2">Building Capacity, Shaping Data-Driven Futures.</div>
                </div>

                <div className="max-w-100">
                    <h2 className="text-primary text-2xl">Contact Us</h2>
                    <div className="flex items-center text-white text-sm py-2">
                        <FontAwesomeIcon icon={faHouse}  className="text-xl pr-3"/>
                        {data?.address}
                    </div>
                    <div className="flex items-center text-white text-sm py-2">
                        <FontAwesomeIcon icon={faPhone}  className="text-xl pr-3"/>
                        {data?.contact1} (Viber)
                    </div>
                    <div className="flex items-center text-white text-sm py-2">
                        <FontAwesomeIcon icon={faPhone}  className="text-xl pr-3"/>
                        {data?.contact2}
                    </div>
                    <div className="flex items-center text-white text-sm py-2">
                        <FontAwesomeIcon icon={faMessage}  className="text-xl pr-3"/>               
                        {data?.email}
                    </div>
                    <div className="flex items-center text-white text-sm py-3 space-x-3">
                        <Link to={data?.fb ?? ""} target="_">
                        <div className="bg-[#1877F2] text-white p-2  rounded-full hover:opacity-80">
                            <FaFacebook size={15} />
                        </div>  
                        </Link>
                        <div className="bg-[#E1306C] text-white p-2 rounded-full hover:opacity-80">
                            <FaInstagram size={15} />
                        </div>
                        <div className="bg-[#000000] text-white p-2 rounded-full hover:opacity-80">
                            <FaXTwitter size={15} />
                        </div>
                        <div className="bg-[#FF0000] text-white p-2 rounded-full hover:opacity-80">
                            <FaYoutube size={15} />
                        </div>
                        <div className="bg-[#0A66C2] text-white p-2 rounded-full hover:opacity-80">
                            <FaLinkedin size={15} />
                        </div>         
                    </div>


                </div>
            </div>
        </>
  );
}

export default footer;
