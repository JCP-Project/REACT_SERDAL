import { ReactNode, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import trainingData from "../Resources/Training/trainingData";
import { Link } from "react-router-dom";
import titleHeader from "../components/titleHeader";

interface TrainingData {
    id: number;
    title: string;
    info: string;
    summary: ReactNode;
    img: string;
    images: string[];
  }


function Training ()
{
 const [data, setData] = useState<TrainingData[]>([]);

 useEffect(() => {
    setData(trainingData);
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
            {titleHeader("Trainings")}

            <div>
            {data.map((t, index) => (
  <div
    key={t.id}
    className={`flex flex-col md:flex-row items-center justify-center min-h-screen py-10 px-6 md:px-[200px] ${
      index % 2 === 0 ? 'bg-primary text-white' : ''
    }`}
  >
    {/* IMAGE SECTION */}
    <motion.div
      initial={{ x: index % 2 === 0 ? -200 : 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      className={`w-full md:flex-1 flex items-center justify-center mb-6 md:mb-0 ${
        index % 2 === 0 ? '' : 'md:order-2'
      }`}
    >
      <img
        src={t.img}
        alt={t.title}
        className="h-[250px] md:h-[400px] lg:h-[600px] object-contain"
      />
    </motion.div>

    {/* TEXT SECTION */}
    <motion.div
      initial={{ x: index % 2 === 0 ? 100 : -200, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.4 }}
      className={`w-full md:flex-1 px-3 md:px-5 ${
        index % 2 === 0 ? '' : 'md:order-1'
      }`}
    >
      <div>
        <div
          className={`font-bold text-xl md:text-2xl pb-4 hover:underline ${
            index % 2 === 0 ? 'text-black' : 'text-primary'
          }`}
        >
          <Link
            to={`/trainings/Info/${t.id}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/trainings/Info/${t.id}-${encodeURIComponent(t.title)}`;
            }}
            className="hover:underline"
          >
            {t.title}
          </Link>
        </div>

        <div className="text-base md:text-xl">{truncate(t.info)}</div>

        <div className="text-lg">
          <Link
            to={`/trainings/Info/${t.id}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = `/trainings/Info/${t.id}-${encodeURIComponent(t.title)}`;
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="px-6 mt-5 py-2 rounded-md bg-black text-white font-semibold shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              View More
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  </div>
))}

            </div>
        </div>
        </>
    );
}

export default Training;