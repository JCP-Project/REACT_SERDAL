import { ReactNode, useEffect, useState } from "react";
import peopleData from "../Resources/People/peopleData";
import { motion } from 'framer-motion';
import { useLocation } from "react-router-dom";
import Loader2 from "../../../common/Loader/Loader2";
import titleHeader from "../components/titleHeader";

import aboutUsData from "../Resources/AboutUs/aboutData";
import partnersLogo from "../Resources/AboutUs/partners";

import SERDALlogo from '../Resources/logo.png'

import { SlLocationPin } from "react-icons/sl";
import { MdLocationPin } from "react-icons/md";

interface data {
    id: number;
    title: string;
    summary: string;
    img: string;  
}
interface parteners {
    id: number;
    name: ReactNode;
    link: string;
    img: string;
    imgsize:string;
    pin:string;
    logolocation: string;
    pinLocation: string;
}

function AboutUs () {
    const [data, setData] = useState<data[]>([])
    const [partners, setPartners] = useState<parteners[]>([])

    const location = useLocation();
  
    useEffect(() =>{
        setData(aboutUsData);
        setPartners(partnersLogo);
    },[])

    useEffect(() => {
    if (location.hash) {
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
        el.scrollIntoView({ behavior: "smooth" }); // or just { behavior: "auto" }
        }
    }
    }, [location]);


    return(
        <>
        {
            !data || data.length === 0 ? (
                <div>
                    <Loader2/>
                </div>
            ):
            (
                <div className="w-full">
                    {titleHeader("Data-Driven. Purpose-Led")}

                    <div id="" className="flex items-center justify-center md:px-20 flex-col md:flex-row">
                        <div className="w-full flex-1 flex items-center justify-center p-5 text-xl order-2 md:text-2xl lg:order-1">
                            {data[0].summary}
                        </div>
                        <div className="w-full flex-1 flex items-center justify-center p-5 order-1 lg:order-2">
                            <img src= {data[0].img} />
                        </div>
                    </div>

                    <div id="" className="flex items-center justify-center md:px-20 flex-col md:flex-row bg-primary text-white">
                        <div className="basis-[30%] h-full flex items-center justify-center px-1 text-xl order-2 lg:order-2">
                            {data[1].summary}
                        </div>
                        <div className="basis-[70%] flex justify-center">
                            <div className="relative w-full max-w-[500px] my-20">
                                {/* MAIN IMAGE */}
                                <img
                                src={data[1].img}
                                alt="Main visual"
                                className="w-full object-cover my-10"
                                />

                                {/* OVERLAY LOGO (scales with image) */}
                                {
                                    partners.map((p) => (
                                    <div key={`key${p.id}`} id={`id${p.id}`} className={`group absolute flex flex-col items-center justify-center w-[30%] aspect-square text-center ${p.logolocation}`}>
                                        <label className="text-white font-bold">{p.name}</label>
                                        <a href={p?.link} target="_blank"
                                            rel="noopener noreferrer"
                                            title="Logo 1" className={`block ${p.imgsize}`}
                                        >
                                            
                                            <img src={p?.img} alt="SERDAL Logo"
                                            className="w-full h-full object-contain rounded-full group-hover:scale-110 transition-transform"
                                            />
                                        </a>

                                        <div className={`absolute  flex items-center p-1 justify-center aspect-square rounded-full bg-black-2 group-hover:scale-110 transition-transform duration-300 ease-in-out ${p.pinLocation}`}>
                                            <MdLocationPin className="relative font-bold h-10 w-10 text-secondary" />                
                                        </div>
                                    </div>
                                    ))
                                }


                                {/* <div className="group absolute flex flex-col items-center justify-center top-[12%] left-[4%] w-[30%] aspect-square text-center">
                                    <label className="text-white font-bold">{partners[2]?.name}</label>
                                    <a href={partners[2]?.link} target="_blank"
                                        rel="noopener noreferrer"
                                        title="Logo 1" className="block w-15 h-15"
                                    >
                                        
                                        <img src={partners[2]?.img} alt="SERDAL Logo"
                                        className="w-full h-full object-contain rounded-full group-hover:scale-110 transition-transform"
                                        />
                                    </a>

                                    <div className="absolute top-[108%] left-[200%]  flex items-center p-1 justify-center aspect-square rounded-full bg-black-2 group-hover:scale-110 transition-transform duration-300 ease-in-out">
                                        <MdLocationPin className="relative font-bold h-10 w-10 text-secondary" />                
                                    </div>
                                </div> */}

                            </div>
                        </div>


                    </div>


                <div className="hidden">
                    <div className="text-left md:text-justify text-lg px-5 md:px-20 py-10">
                        {data[1].summary}

                            <a
                                href="https://link-for-logo-1.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-[20%] left-[15%] bg-red w-[50px] h-[50px] rounded-full hover:scale-110 transition-transform"
                                title="Logo 1"
                            ></a>
                    </div>

                    <div>
                        <div className="relative w-full max-w-[800px] mx-auto">
                            <img src={data[1].img} alt="NetworkMap" className="w-full h-auto" />

                            {/* Clickable logo 1 */}
                            <a
                                href="https://link-for-logo-1.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-[20%] left-[15%] bg-red w-[50px] h-[50px] rounded-full hover:scale-110 transition-transform"
                                title="Logo 1"
                            >
                                {/* Optional: Add hover effect or transparent div */}
                            </a>

                            {/* Clickable logo 2 */}
                            <a
                                href="https://link-for-logo-2.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute top-[40%] left-[30%] w-[50px] h-[50px] rounded-full hover:scale-110 transition-transform"
                                title="Logo 2"
                            />

                            {/* Add more logo zones similarly */}
                        </div>
                    </div>
                </div>   

                </div>
            )
        }

        </>
    );
}

export default AboutUs;