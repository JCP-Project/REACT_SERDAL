import { ReactNode, useEffect, useState } from "react";
import contactUsData from "../Resources/ContactUs/contactData";
import titleHeader from "../components/titleHeader";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

interface ContactData {
    address: ReactNode;
    contact1: string;
    contact2: string;
    email: string;
    fb: string;
    img: string;
}

function ContactUs() {
    const [data, setData] = useState<ContactData>()

    useEffect(() =>{
        setData(contactUsData);
    },[])

    return(
        <>
            <div className="">
                {titleHeader("Contact Us")}

                <div>
                {   
                <div className={`flex flex-col md:flex-row items-center justify-center px-6 md:px-[200px]`}
                    >
                    <div
                        className={`w-full md:flex-1 flex items-center justify-center mb-6 md:mb-0`}
                    >
                        <img src={data?.img} alt="Contact Us" className="h-[250px] md:h-[400px] object-contain" />
                    </div>

                    <div  className={`w-full md:flex-1 px-3 md:px-5`}>
                        <div className="flex items-center space-x-5 my-3">
                            <div><FaMapLocationDot  size={30} className="text-primary" /></div>
                            <div>{ data?.address}</div>
                        </div>
                        <div className="flex items-center space-x-5 my-3">
                            <div><FaPhoneAlt size={20} className="text-primary" /></div>
                            <div>{ data?.contact1}(Viber)</div>
                        </div>
                        <div className="flex items-center space-x-5 my-3">
                            <div><FaPhoneAlt size={20} className="text-primary" /></div>
                            <div>{ data?.contact2}</div>
                        </div>
                        <div className="flex items-center space-x-5 my-3">
                            <div><MdEmail size={20} className="text-primary" /></div>
                            <div>{ data?.email}</div>
                        </div>
                        <div className="flex items-center space-x-5 my-3">
                            <div><Link to={data?.fb ?? ""} ><FaFacebookSquare size={20} className="text-primary" /></Link></div>
                            <div><Link to={data?.fb ?? ""} className="hover:underline" >UPLB SERDAL FB Page </Link></div>
                        </div>
                    </div>
                </div>
        
                }
            </div>

            </div>
        </>
    );
}

export default ContactUs;
