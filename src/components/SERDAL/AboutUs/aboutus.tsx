import { ReactNode, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { Link, useLocation } from "react-router-dom";
import Loader2 from "../../../common/Loader/Loader2";
import titleHeader from "../components/titleHeader";

import aboutUsData from "../Resources/AboutUs/aboutData";
import partnersLogo from "../Resources/AboutUs/partners";
import SERDALVideo from "../Resources/AboutUs/videoContent";

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

interface iSERDALVideo {
    id: number;
    title: string;
    vid: string;
}


function AboutUs () {
    const [data, setData] = useState<data[]>([])
    const [partners, setPartners] = useState<parteners[]>([])
    const [videoData, setVideoData] = useState<iSERDALVideo[]>([])

    const location = useLocation();
  
    useEffect(() =>{
        setData(aboutUsData);
        setPartners(partnersLogo);
        setVideoData(SERDALVideo);
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
                    {titleHeader("Data-Driven. Purpose-Led.")}

                    <div id="" className="flex items-center justify-center md:px-20 flex-col md:flex-row">
                        <div className="w-full flex-1 flex items-center justify-center p-5 text-xl order-2 md:text-3xl lg:order-1">
                            {data[0].summary}
                        </div>
                        <div className="w-full flex-1 flex items-center justify-center p-5 order-1 lg:order-2">
                            <img src= {data[0].img} />
                        </div>
                    </div>

                    <div id="" className="flex items-center justify-center md:px-20 flex-col md:flex-row bg-primary text-white">
                        <div className="basis-[60%] h-full flex items-center justify-center  p-5 md:p-1 text-xl md:text-3xl order-2 lg:order-2">
                            {data[1].summary}
                        </div>
                        <div className="basis-[50%] flex justify-center">
                            <div className="relative w-full max-w-[500px] my-20">
                                {/* MAIN IMAGE */}
                                <img
                                src={data[1].img}
                                alt="Main visual"
                                className="w-[400px] object-cover my-10"
                                />

                                {/* OVERLAY LOGO (scales with image) */}
                                {
                                    partners.map((p) => (
                                    <div key={`key${p.id}`} id={`id${p.id}`} className={`absolute flex flex-col items-center justify-center w-[30%] aspect-square text-center ${p.logolocation}`}>
                                        {
                                           ![7,6].includes(p.id) && (
                                            <Link to={p?.link} className="z-50 cursor-pointer" >
                                                <label className={`text-white font-bold z-10 hover:underline cursor-pointer ${p.id == 0 ? "mb-2":"mb-0"}`}>{p.name}</label>
                                           </Link>
                                        )
                                        }                                        
                                        <a href={p?.link} target={p?.id == 0 ? undefined:"_blank"}
                                            rel="noopener noreferrer"
                                             className={`block ${p.imgsize} z-10`}
                                        >
                                            
                                            <motion.img
                                            src={p?.img}
                                            alt="SERDAL Logo"
                                            className="w-full h-full object-contain rounded-full"
                                            animate={{ scale: p.id === 0 ? 1.3 : 1 }}
                                            whileHover={{ scale: p.id === 0 ? 1.5 : 1.2 }}
                                            transition={{ type: "spring", stiffness: 500, damping: 10 }}
                                            />
                                        </a>
                                        {
                                           [7,6].includes(p.id) && (
                                            <Link to={p?.link} className="z-50" >
                                                <label className="text-white font-bold z-10 hover:underline cursor-pointer">{p.name}</label>
                                           </Link>)
                                        }

                                        <motion.div
                                        className="hidden absolute top-20 left-0 md:flex w-[200vw] h-32 z-1"
                                        initial={{ x: "-100vw" }}
                                        animate={{ x: "0vw" }}
                                        transition={{
                                            duration: 10,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                        >
                                        
                                        <Cloud />
                                        <Cloud />
                                        </motion.div>

                                        <div className={`absolute  flex items-center p-1 justify-center aspect-square rounded-full bg-black-2 group-hover:scale-110 transition-transform duration-300 ease-in-out ${p.pinLocation} z-10`}>
                                            {
                                                p?.id == 0 ?(
                                                <MdLocationPin className="relative font-bold h-8 w-8" />  
                                                ):( <MdLocationPin className="relative font-bold h-4 w-4 group-hover:text-primary" />  )
                                            }
                                                         
                                        </div>
                                    </div>
                                    ))
                                }

                            </div>
                        </div>


                    </div>

                    <div className="py-5 md:py-10">
                        <h1 className="font-optima text-3xl font-bold py-5 text-center">SERDAL Videos</h1>
                        <div id="" className="flex items-center justify-center md:px-10 flex-col md:flex-row">
                            {
                                videoData.map((v) => (
                                    <div key={`K-${v.id}`} id={`ID-${v.id}`} className="w-full flex-1 flex items-center justify-center p-2 order-1 lg:order-2">
                                        <iframe
                                            src={v.vid}
                                            className="w-full h-[200px] md:h-[255px] rounded shadow-lg"
                                            allow="autoplay"
                                            title={v.title}
                                        ></iframe>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                </div>
            )
        }

        </>
    );
}


const Cloud = () => {
  return (
    <div className="relative w-[100vw] h-full">
      {/* Core puff */}
      <div className="absolute w-72 h-5 bg-white/80 rounded-full blur-2xl top-2 left-12 shadow-white/30 shadow-md" />

      {/* Side fluff */}
      <div className="absolute w-44 h-5 bg-white/70 rounded-full blur-2xl top-4 opacity-5 left-[-200px]" />
      <div className="absolute w-40 h-5 bg-white/70 rounded-full blur-2xl top-6 opacity-5  right-0" />

      {/* Extra softness */}
      <div className="absolute w-32 h-5 bg-white/60 rounded-full blur-2xl top-10  opacity-5 left-54" />
      <div className="absolute w-28 h-5 bg-white/50 rounded-full blur-2xl top-12 opacity-5  left-[-100px]" />
    </div>
  );
};

export default AboutUs;