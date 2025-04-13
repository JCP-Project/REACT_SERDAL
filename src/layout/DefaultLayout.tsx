import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/SERDAL/Header/index';
import Header2 from '../components/SERDAL/Header/Header2';
import Sidebar2 from '../components/SERDAL/Sidebar';
import Footer from '../components/SERDAL/Footer/index';
import { Link, useLocation } from 'react-router-dom';

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
    header =  <div><Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> </div> ;
    sidebar =  <div ><Sidebar2 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> </div> ;
     tempfooter =  <div ></div> ;
  } else {
    header =  <div className={`sticky top-0 z-50 ${isSticky ? 'bg-red-500' : 'bg-orange'}`}><Header2/></div> ;
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
          <div className="relative flex flex-1 flex-col overflow-y-auto bg-white min-h-screen bg-white">
              
              {
                !isAdmin && (
                  <div>
                        {isIndexPage && 
                        <div className="w-full bg-black-2">
                          <div  className='flex items-center justify-between py-3'>
                            <div className="px-3">
                              <Link to="https://uplb.edu.ph/" target='_'>
                                <img src="/UPLB_VIGHRColor_1.png" alt='UPLB Logo' className="h-15" />
                              </Link>
                            </div>
                            <div className="flex space-x-5 px-3">
                              <div>
                                <Link to="https://cem.uplb.edu.ph/" target='_'>
                                <img src="/CEM.png" alt='CEM Logo' className="h-15" />
                                </Link>
                              </div>
                              <div>
                                <Link to="https://uplb.edu.ph/" target='_'>
                                  <img src="/logo.png" alt='SERDAL Logo' className="h-15" />
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="text-3xl font-bold text-center py-10 text-white bg-primary">Socio-Economics Research and Data Analytics Laboratory,</div>
                        </div>}
                  </div>
                )
              }

              <div id="sticky-trigger" className="h-0"></div>

              {header}


              <div className={`sticky h-10 top-0 z-999 w-full transition-all duration-300 ${isSticky ? 'bg-red-500' : 'bg-black'}`}>
                </div>
              

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
