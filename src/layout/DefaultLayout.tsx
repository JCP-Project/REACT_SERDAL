import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/SERDAL/Header/index';
import Header2 from '../components/SERDAL/Header/Header2';
import Sidebar2 from '../components/SERDAL/Sidebar';
import Footer from '../components/SERDAL/Footer/index';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import { FaChevronUp } from "react-icons/fa";

import UP from '../../src/components/SERDAL/Resources/UPLB_VIGHRColor_1.png'
import CEM from '../../src/components/SERDAL/Resources/CEM.png'
import UPLB from '../../src/components/SERDAL/Resources/logo.png'

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const trigger = document.getElementById('sticky-trigger');
      if (!trigger) return;
  
      const triggerTop = trigger.getBoundingClientRect().top;
      setIsSticky(triggerTop < 0);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-scroll');
  
    const handleScroll = () => {
      if (scrollContainer && scrollContainer.scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
  
    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    const scrollContainer = document.querySelector('.overflow-y-scroll');
    scrollContainer?.scrollTo({ top: 0, behavior: 'smooth' });
  };





  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);




    const location = useLocation(); 
    const isIndexPage = location.pathname === '/';

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const adminStatus = localStorage.getItem('isAdmin') === 'true';

    setIsLoggedIn(loggedInStatus);
    setIsAdmin(adminStatus);
  }, []); 

  
  let header,sidebar,tempfooter;
  if (isAdmin) {
    header =  <div className="font-optima "><Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> </div> ;
    sidebar =  <div className="font-optima" ><Sidebar2 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> </div> ;
     tempfooter =  <div ></div> ;
  } else {
    header =  <div className={`font-optima sticky top-0 z-50 ${isSticky ? 'bg-red-500' : 'bg-orange'}`}><Header2/></div> ;
    tempfooter = <Footer />
  }




  return (
    <>
       <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          {sidebar}
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}


          <div className="relative flex flex-col flex-1 min-h-screen bg-white overflow-x-hidden  overflow-y-scroll scroll-smooth">
              
          {showScrollTop && (
              <motion.button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 z-[9999] p-3 rounded-full bg-primary text-white shadow-xl hover:bg-secondary"
                title="Scroll to Top"
                initial={{ y: 0 }}
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <FaChevronUp />
              </motion.button>
            )}



              {
                !isAdmin && (
                  <div>
                        {isIndexPage && 
                        <div className="w-full bg-black-2">
                          <div  className='flex items-center justify-between py-3'>
                            <div className="px-3">
                              <Link to="https://uplb.edu.ph/" target='_'>
                                <img src={UP} alt='UPLB Logo' className="h-15" />
                              </Link>
                            </div>
                            <div className="flex space-x-5 px-3">
                              <div>
                                <Link to="https://cem.uplb.edu.ph/" target='_'>
                                <img src={CEM} alt='CEM Logo' className="h-15" />
                                </Link>
                              </div>
                              <div>
                                <Link to="https://uplb.edu.ph/" target='_'>
                                  <img src={UPLB} alt='SERDAL Logo' className="h-15" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="font-optima text-3xl font-bold text-center py-10 text-white bg-primary">Socio-Economics Research and Data Analytics Laboratory,</div>
                        </div>}
                  </div>
                )
              }

              <div id="sticky-trigger" className="h-0"></div>

              {header}
              

              <main  className="bg-white">
                  <div className="mx-auto  max-w-[100%]">
                    {children}
                  </div>
                </main>

              <div className="bg-[#032c54] z-10">
                  <div className="px-2 md:px-[15%] text-white">
                    {tempfooter}
                </div>             
              </div>

            {/* <div className="overflow-y-auto">

            <div className="w-full h-20 bg-blue-500 ">test</div>

            <div className="w-full h-20 bg-red-500 sticky top-0 z-50 ">test</div>

              <main  className="bg-white">
                  <div className="mx-auto  max-w-[100%]">
                    {children}
                  </div>
                </main>

              <div className="bg-[#032c54] z-10">
                  <div className="px-2 md:px-[15%] text-white">
                    {tempfooter}
                </div>             
              </div>
            </div> */}


          </div>


          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div> 
    </>

  );
};

export default DefaultLayout;
