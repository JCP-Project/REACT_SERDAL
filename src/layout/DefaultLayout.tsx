import React, { useState, ReactNode, useEffect } from 'react';
import Header from '../components/SERDAL/Header/index';
import Header2 from '../components/SERDAL/Header/Header2';
import Sidebar2 from '../components/SERDAL/Sidebar';
import Footer from '../components/SERDAL/Footer/index';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);


  useEffect(() => {
    const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    const adminStatus = sessionStorage.getItem('isAdmin') === 'true';

    setIsLoggedIn(loggedInStatus);
    setIsAdmin(adminStatus);
  }, []); 

  
  let header,sidebar,tempfooter;
  if (isAdmin) {
    header =  <div ><Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> </div> ;
    sidebar =  <div ><Sidebar2 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> </div> ;
     tempfooter =  <div ></div> ;
  } else {
    header =  <div className="z-50"><Header2/></div> ;
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
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden bg-white min-h-screen bg-white">
            {/* <!-- ===== Header Start ===== --> */}
            {header}         
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main  className="bg-white">
              <div className="mx-auto  max-w-[100%]">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}

          <div className="bg-[#032c54] z-10">
            <div className="px-2 md:px-[15%] text-white">
              {tempfooter}
            </div>
            
          </div>

          </div>


          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div> 
    </>

  );
};

export default DefaultLayout;
