import { useEffect, useState } from "react";
import peopleData from "../Resources/People/peopleData";
import { motion } from 'framer-motion';
import { Link, useLocation } from "react-router-dom";
import servicesData from "../Resources/Services/servicesData";
import Loader2 from "../../../common/Loader/Loader2";
import titleHeader from "../components/titleHeader";

interface data {
    id: number;
    title: string;
    summary: string;
    img: string;  
}

function Services () {
    const [data, setData] = useState<data[]>([])

    const location = useLocation();
  
    useEffect(() =>{
        setData(servicesData);
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
                    {titleHeader("Services")}                   

                    <div>
                {   
                data.map((t,index) => (
                    <div
                    id={t.title.replace(/[\s\-]/g, '')} key={t.id}
                    className={`flex flex-col md:flex-row items-center justify-center min-h-screen py-10 px-6 md:px-[200px] ${
                        index % 2 === 0 ? 'bg-primary text-white' : ''
                    }`}
                    >
                    <div
                        className={`w-full md:flex-1 flex items-center justify-center mb-6 md:mb-0 ${
                        index % 2 === 0 ? '' : 'md:order-2'
                        }`}
                    >
                        <img src={t.img} alt={t.title} className="h-[250px] md:h-[400px] object-contain" />
                    </div>

                    <div
                        className={`w-full md:flex-1 px-3 md:px-5 ${
                        index % 2 === 0 ? '' : 'md:order-1'
                        }`}
                    >
                        <div>
                            <div className="font-bold text-black text-xl md:text-2xl pb-4 hover:underline uppercase">
                                
                                <Link to={`/trainings/Info/${t.id}`}
                                    onClick={(e) => {
                                    e.preventDefault();
                                    window.location.href = `/trainings/Info/${t.id}-${encodeURIComponent(t.title)}`;
                                    }}
                                    className="hover:underline">
                                    {t.title}
                                </Link>
                            </div>
                            <div className="">
                                {t.summary}
                            </div>

                        </div>
                    </div>
                    </div>

                ))          
                }
            </div>
  

            </div>
            )
        }

        </>
    );
}

export default Services;