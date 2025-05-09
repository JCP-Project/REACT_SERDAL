import { useEffect, useState } from "react";
import peopleData from "../Resources/People/peopleData";
import { motion } from 'framer-motion';
import { useLocation } from "react-router-dom";
import titleHeader from "../components/titleHeader";
interface data {
    id: number;
    title: string;
    name: string;
    position: string;
    img: string;  
}

function People () {
    const [data, setData] = useState<data[]>([])

    const location = useLocation();

    useEffect(() => {
    if (location.hash) {
        const id = location.hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
        el.scrollIntoView({ behavior: "smooth" }); // or just { behavior: "auto" }
        }
    }
    }, [location]);

    useEffect(() =>{
        setData(peopleData);
    },[])

    return(
        <>
            <div className="w-full">
            {titleHeader("Our Team")}
                <div id="phase1" className="min-h-screen flex justify-center">
                    <div>
                        <div className="font-bold text-white bg-primary text-center text-3xl py-5"><h1>Phase 1</h1></div>              
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
                        {
                            data.filter(x => x.title === "Phase 1").map(person => (
                            <div id={`ID-${person.id}`} key={person.id} className="group min-h-20 w-full text-black bg-gray-100 my-3 rounded-sm hover:bg-Tertiary">
                                <div className="relative overflow-hidden max-h-[480px]">
                                    <div className="group-hover:scale-110 transition-transform duration-500 ease-in-out">
                                        <img src={person.img} alt={person.name} 
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center py-3 pl-3">
                                    <h3>{person.name}</h3>
                                    <h4>{person.position}</h4>
                                </div>
                            </div>
                            )

                            )
                        }
                        </div>
                    </div>
                 </div>
                
                 <div id="phase2" className="min-h-screen flex justify-center mt-10 md:mt-0">
                    <div>
                    <div className="font-bold text-white bg-primary text-center text-3xl py-5"><h1>Phase 2</h1></div>                            
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
                        {
                            data.filter(x => x.title === "Phase 2").map(person => (
                            <div id={`ID-${person.id}`} key={person.id} className="group min-h-20 text-black bg-gray-100 my-3 hover:bg-Tertiary">
                                <div className="relative overflow-hidden max-h-[480px]">
                                    <div className="group-hover:scale-110 transition-transform duration-500 ease-in-out">
                                        <img src={person.img} alt={person.name} />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center py-3 pl-3">
                                    <h3>{person.name}</h3>
                                    <h4>{person.position}</h4>
                                </div>
                            </div>
                            )

                            )
                        }
                        </div>
                    </div>
                 </div>

            </div>
        </>
    );
}

export default People;