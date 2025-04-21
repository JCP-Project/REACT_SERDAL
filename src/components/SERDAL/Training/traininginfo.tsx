import { ReactNode, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import trainingData from "../Resources/Training/trainingData";
import { Link, useParams } from "react-router-dom";

interface TrainingData {
    id: number;
    title: string;
    info: string;
    summary: ReactNode;
    img: string;
    images: string[];
  }


function TrainingInfo ()
{
 const [data, setData] = useState<TrainingData[]>([]);
 const { infopage } = useParams(); 

 const [dataID, setDataID] = useState<number>(0);

 useEffect(() => {
    setData(trainingData);

    const [postId] = infopage.split('-');
    console.log(postId);
    setDataID(Number(postId));
  },[]);


  const truncate = (title: string): string => {
    if (title.length > 300) {
      return `${title.slice(0, 300 - 10)}...`;
    }
    return title;
  };

    return(
        <>
        <div className="w-full">
            {/* <div className="text-3xl font-bold text-primary text-center py-10">
                <motion.h2
                        initial={{ y: -20, scale:1.5 }}
                        animate={{ y: 0, scale: 1 }}   
                        transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 15,
                        duration: 2,
                        }}
                    >
                        Trainings
                    </motion.h2>

                    <motion.div
                        className="border-b-2 border-primary mx-20 mt-5"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        style={{ originX: 0.5 }}  // This sets the animation to grow from the center
                    ></motion.div>
                </div> */}

            <div>
                {   
                data.filter(x => x.id == dataID ).map((t,index) => (
                    <div
                    key={t.id}
                    className={`flex flex-col items-center justify-center max-h-full py-10 px-6 md:px-[200px]`}
                    >
                        
                        <div>
                            <img src={t.img} alt={t.title} className="h-[500px]"/>
                        </div>

                        <div className="text-center text-2xl font-bold py-5 mt-10">{t.title}</div>

                        <div className="text-lg pb-5 text-justify">{t.summary}</div>
                    </div>

                ))          
                }
            </div>
        </div>
        </>
    );
}

export default TrainingInfo;