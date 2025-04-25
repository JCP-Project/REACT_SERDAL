import { useEffect, useState } from "react";
import peopleData, { Data } from "../Resources/People/peopleData";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import titleHeader from "../components/titleHeader";

function People() {
    const [data, setData] = useState<Data[]>([]);

    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    useEffect(() => {
        setData(peopleData);
    }, []);

    return (
        <div className="w-full">
            {titleHeader("Who are we")}
            
            {/* Phase 1 */}
            <div id="phase1" className="min-h-screen flex justify-center">
                <div>
                    <div className="font-bold text-white bg-primary text-center text-3xl py-5">
                        <h1>Phase 1</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
                        {data
                            .filter((x) => x.title === "Phase 1")
                            .map((person) => (
                                <motion.div
                                    id={`ID-${person.id}`}
                                    key={person.id}
                                    className="group min-h-20 w-full text-black bg-gray-100 my-3 rounded-sm hover:bg-Tertiary"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                >
                                    <div className="relative overflow-hidden max-h-[480px]">
                                        <div className="group-hover:scale-110 transition-transform duration-500 ease-in-out">
                                            <img
                                                src={person.img}
                                                alt={person.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-center justify-center py-3 pl-3">
                                        <h3 className="uppercase">{person.name}</h3>
                                        <h4>{person.position}</h4>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </div>

            {/* Phase 2 */}
            <div id="phase2" className="min-h-screen flex justify-center mt-10 md:mt-0">
                <div>
                    <div className="font-bold text-white bg-primary text-center text-3xl py-5">
                        <h1>Phase 2</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
                        {data
                            .filter((x) => x.title === "Phase 2")
                            .map((person) => (
                                <motion.div
                                    id={`ID-${person.id}`}
                                    key={person.id}
                                    className="group min-h-20 text-black bg-gray-100 my-3 hover:bg-Tertiary"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    viewport={{ once: true }}
                                >
                                    <div className="relative overflow-hidden max-h-[480px]">
                                        <div className="group-hover:scale-110 transition-transform duration-500 ease-in-out">
                                            <img
                                                src={person.img}
                                                alt={person.name}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-center justify-center py-3 pl-3">
                                        <h3 className="uppercase">{person.name}</h3>
                                        <h4>{person.position}</h4>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default People;
