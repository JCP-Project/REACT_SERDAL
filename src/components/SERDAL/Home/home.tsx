import { useEffect, useState } from "react";
import homeData from "../Resources/Home/homeData";
import { motion } from 'framer-motion';
import titleHeader from "../components/titleHeader";
import DOST from "../Resources/Home/DOST-PCAARRD.png"

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
            {titleHeader(data?.title ?? "")}

            <div className="flex flex-col md:flex-row items-center justify-center px-10 md:px-15 md:px-20">
                <div className="flex-1 order-2 md:order-1 md:text-3xl">
                    {data?.Maincontent}
                </div>
                <div className="flex-1 p-1 mb-10 md:mb-0 md:p-5 order-1 md:order-2">
                <iframe
                    src="https://drive.google.com/file/d/1yP27vjTSB8ygsCZva_NFmcic8KMdJ0cu/preview"
                    className="md:w-full md:h-[355px] rounded shadow-2xl"
                    allow="autoplay"
                    title="SERDAL Video"
                ></iframe>      

                {/* <video width="100%" controls autoPlay muted>
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
                    browser does not support the video.
                </video> */}
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center px-15 md:px-20 md:py-20">
                <div className="font-optima font-bold flex-1 order-2 md:order-1 md:text-4xl text-right">
                    Supported By:
                </div>
                <div className="flex-1 p-5 order-1 md:order-2">
                    <img src= {DOST} className="h-[120px]" />
                </div>
            </div>
        </div>

        </>
    );
}



export default Home;