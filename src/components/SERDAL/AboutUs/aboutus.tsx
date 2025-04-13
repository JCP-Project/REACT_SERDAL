import { useEffect, useState } from "react";
import peopleData from "../Resources/People/peopleData";
import { motion } from 'framer-motion';
import { useLocation } from "react-router-dom";
import aboutUsData from "../Resources/AboutUs/aboutData";
import Loader2 from "../../../common/Loader/Loader2";
import titleHeader from "../components/titleHeader";

interface data {
    id: number;
    title: string;
    summary: string;
    img: string;  
}

function AboutUs () {
    const [data, setData] = useState<data[]>([])

    const location = useLocation();
  
    useEffect(() =>{
        setData(aboutUsData);
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
                        <div className="w-full flex-1 flex items-center justify-center p-5 text-xl order-2 lg:order-2">
                            {data[1].summary}
                        </div>
                        <div className="w-full flex-1 flex items-center justify-center p-5 order-1 lg:order-1">
                            <img src= {data[1].img} />
                        </div>
                    </div>


                <div className="hidden">
                    <div className="text-left md:text-justify text-lg px-5 md:px-20 py-10">
                        {data[1].summary}
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