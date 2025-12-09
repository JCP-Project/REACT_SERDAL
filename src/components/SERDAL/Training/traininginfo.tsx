import { useEffect, useState } from "react";
import trainingData, {TrainingData} from "../Resources/Training/trainingData";
import {useParams } from "react-router-dom";
import ImagePreview from "../components/ImageView";

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

    return(
        <>
        <div className="w-full">
            <div>
                {   
                data.filter(x => x.id == dataID ).map((t) => (
                    <div  key={t.id} className={`flex flex-col items-center justify-center max-h-full py-10 px-6 md:px-[100px]`} >
                        
                        <div>
                            <img src={t.img} alt={t.title} className="md:w-[1000px] h-auto object-contain py-5"/>
                        </div>

                        <div className="text-center text-xl md:text-2xl font-bold py-5 md:mt-10 md:w-[1000px]">{t.title}</div>

                        <div className="text-md md:text-lg pb-5 text-justify md:w-[1000px]">{t.summary}</div>
                        <div className="flex">
                        {                           
                            t?.eventPhotos.map((photo, index) => (
                                <div key={`img-${index}`}>
                                    <ImagePreview src={photo} alt={t.title} className="md:w-[300px] h-auto object-contain py-5 px-2"/>
                                </div>
                            ))                          
                        }
                        </div>                 
                    </div>
                ))          
                }
            </div>
        </div>
        </>
    );
}

export default TrainingInfo;