import { useEffect, useState } from "react";
import homeData, {Data} from "../Resources/Home/homeData";
import { motion } from 'framer-motion';
import titleHeader from "../components/titleHeader";
import DOST from "../Resources/Home/DOST-PCAARRD.png"

import vid from "../Resources/Home/HomeVideo.mp4"

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

                <video
                    className="w-full rounded shadow-2xl"
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    >
                    <source src={vid} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* <iframe
                    src="https://drive.google.com/file/d/1yP27vjTSB8ygsCZva_NFmcic8KMdJ0cu/preview"
                    className="md:w-full md:h-[355px] rounded shadow-2xl"
                    allow="autoplay"
                    title="SERDAL Video"
                ></iframe>       */}

                {/* <video width="100%" controls autoPlay muted>
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
                    browser does not support the video.
                </video> */}
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center px-20 mt-10 md:mt-5 md:px-20 md:py-20">
                <div className="font-optima font-bold flex-1 text-3xl  md:text-6xl text-right">
                    Supported By:
                </div>
                <div className="flex-1 p-5">
                    <img src= {DOST} className="md:max-h-[153px] w-auto" />
                </div>
            </div>
        </div>

        </>
    );
}



export default Home;