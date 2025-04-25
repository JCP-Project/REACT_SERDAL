import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useLocation } from "react-router-dom";
import servicesData, {data} from "../Resources/Services/servicesData";
import Loader2 from "../../../common/Loader/Loader2";
import titleHeader from "../components/titleHeader";


function Services () {
    const [data, setData] = useState<data[]>([])

    const location = useLocation();
  
    useEffect(() =>{
        setData(servicesData);
    },[])

useEffect(() => {
  if (location.hash) {
    const id = location.hash.replace("#", "");

    let attempts = 0;
    const maxAttempts = 10;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };

    tryScroll();
  }
}, [location]);

    return(
        <>
        {
            !data || data.length === 0 ? (
                <div>
                    <Loader2/>
                </div>
            ):
            (
                
            <div className="w-full">
                    {titleHeader("Services")}                   

            <div>
            {data.map((t, index) => (
              <div
                id={t.title.replace(/[\s\-]/g, '')}
                key={`${t.id}-${t.title}`}
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
                    className="h-[250px] md:h-[500px] lg:h-[700px] object-contain"
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
                      className={`font-bold text-black text-2xl md:text-[40px] pb-4 hover:underline uppercase ${
                        index % 2 === 0 ? 'text-black' : 'text-primary'
                      }`}
                    >
                      {/* <Link
                        to={`/trainings/Info/${t.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/trainings/Info/${t.id}-${encodeURIComponent(
                            t.title
                          )}`;
                        }}
                        className="hover:underline font-optima"
                      > */}
                        {t.title}
                      {/* </Link> */}
                    </div>
                    <div className="text-2xl">{t.summary}</div>
                  </div>
                </motion.div>
              </div>
            ))}
            </div>
  

            </div>
            )
        }

        </>
    );
}

export default Services;