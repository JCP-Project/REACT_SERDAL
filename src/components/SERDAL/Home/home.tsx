import { useEffect, useState } from "react";
import homeData from "../Resources/Home/homeData";
import { motion } from 'framer-motion';

interface Data {
    id: number;
    title: string;
    Maincontent: string;
    img: string;
}

function Home()
{
      const apiUrl = import.meta.env.VITE_API_URL;
      const [data, setData] = useState<Data>();

      useEffect(() => {
        setData(homeData);
      },[]);

    return(
        <>
        <div className="w-full">
            <div className="text-3xl font-bold text-primary text-center py-10">
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
                    {data?.title}
                </motion.h2>

                <motion.div
                    className="border-b-2 border-primary mx-20 mt-5"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    style={{ originX: 0.5 }}  // This sets the animation to grow from the center
                ></motion.div>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex-1 p-5">
                    {data?.Maincontent}
                </div>
                <div className="flex-1 p-5">
                <video width="100%" controls autoPlay muted>
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
                    browser does not support the video.
                </video>
                </div>
            </div>
        </div>
        </>
    );
}



export default Home;