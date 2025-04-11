import { useEffect, useState } from "react";
import homeData from "../Resources/Home/homeData";


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
            <div className="text-3xl font-bold text-primary text-center py-10">{data?.title} </div>
            <div className="flex items-center justify-center">
                <div className="flex-1 p-5">
                    {data?.Maincontent}
                </div>
                <div className="flex-1 p-5">
                <video width="100%" controls>
                    <source src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                </div>
            </div>
        </div>
        </>
    );
}



export default Home;