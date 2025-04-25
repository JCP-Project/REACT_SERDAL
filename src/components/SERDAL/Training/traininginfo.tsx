import { useEffect, useState } from "react";
import trainingData, {TrainingData} from "../Resources/Training/trainingData";
import {useParams } from "react-router-dom";


function TrainingInfo ()
{
 const [data, setData] = useState<TrainingData[]>([]);
 const { infopage } = useParams(); 

 const [dataID, setDataID] = useState<number>(0);

 useEffect(() => {
    setData(trainingData);

    const [postId] = infopage.split('-');
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
                data.filter(x => x.id == dataID ).map((t) => (
                    <div
                    key={t.id}
                    className={`flex flex-col items-center justify-center max-h-full py-10 px-6 md:px-[100px]`}
                    >
                        
                        <div>
                            <img src={t.img} alt={t.title} className="md:w-[1000px] h-auto object-contain py-5"/>
                        </div>

                        <div className="text-center text-xl md:text-2xl font-bold py-5 md:mt-10 md:w-[1000px]">{t.title}</div>

                        <div className="text-md md:text-lg pb-5 text-justify md:w-[1000px]">{t.summary}</div>
                        {
                            t?.eventPhotos.map((photo) => (
                                <div>
                                    <img src={photo} alt={t.title} className="md:w-[1000px] h-auto object-contain py-5"/>
                                </div>
                            ))
                        }
                        

                    </div>

                ))          
                }
            </div>
        </div>
        </>
    );
}

export default TrainingInfo;