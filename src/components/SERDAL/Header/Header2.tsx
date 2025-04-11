import { Link, useLocation } from 'react-router-dom';
import DropdownUser from './DropdownUser';

import { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';


function Header2() {
  const location = useLocation();

  const isIndexPage = location.pathname === '/';

  
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState); // Toggle the menu state
  };


  const handleResize = () => {
    if (window.innerWidth >= 768) { // Example: 768px is the breakpoint for "desktop"
      setMenuOpen(false); // Close the menu when the screen is large enough
    }
  };

    // Listen for window resize events
    useEffect(() => {
      window.addEventListener('resize', handleResize);
  
      // Cleanup the event listener on unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsLoggedIn(loggedInStatus);
    setIsAdmin(adminStatus);
  }, []); 

  let user = (
    <div>
      <Link to="/auth/signin">
        <button onClick={() => setMenuOpen(false)}  className="bg-black border-2 border-primary text-primary py-3 md:py-1 px-10 md:px-5 rounded-sm hover:bg-black hover:border-primary text-xl md:text-sm">
          Sign in
        </button>
      </Link>
    </div>
  );
  
  if (isLoggedIn) {
    user = <div><DropdownUser /></div>;
  }
  
  return (
    <>
    {
      !isAdmin && (
        <div>
              {isIndexPage && 
              <div className="w-full bg-black">
                <div  className='flex items-center justify-between py-3'>
                  <div className="px-3">
                    <img src="/UPLB_VIGHRColor_1.png" alt='UPLB Logo' className="h-15" />
                  </div>
                  <div className="flex space-x-5 px-3">
                    <div>
                      <img src="/CEM.png" alt='CEM Logo' className="h-15" />
                    </div>
                    <div>
                      <img src="/logo.png" alt='SERDAL Logo' className="h-15" />
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-center py-10 text-white bg-primary">Socio-Economics Research and Data Analytics Laboratory,</div>
              </div>}
        </div>
      )
    }

    <header className="sticky top-0 z-999 flex w-full bg-black drop-shadow-1">
      <div className={`flex flex-grow items-center ${!isAdmin && isIndexPage ? "justify-center" : "justify-between"} py-5 shadow-2 md:px-6`}>
        <div className="flex items-center gap-2 sm:gap-4">
          {
            !isAdmin && (
              <div>
                    {
                      !isIndexPage && 
                    <div className="w-full bg-black">
                      <Link className="block flex-shrink-0" to="http://localhost/SERDAL/">
                        <img src="/UPLB_VIGHRColor_1.png" alt="UPLB Logo" className='h-15'/>
                      </Link>
                    </div>
                    }
              </div>
            )
          }


          <div className="flex items-center gap-6">
              <FontAwesomeIcon
                  icon={menuOpen ? faTimes : faBars}
                  onClick={toggleMenu}
                  className="text-3xl cursor-pointer md:hidden"
                />
            </div>
        </div>

        <div className={`sm:block ${menuOpen ? 'block' : 'hidden'} text-white font-medium z-50`}>
            {/* Mobile and Desktop Combined Navigation */}
            <nav className={`${ menuOpen ? "block" : "hidden" } absolute md:static top-0 left-0 w-full bg-black md:flex md:items-center md:w-auto z-50`}>
                {/* Full-Screen Mobile Menu */}
                <div className={`${ menuOpen ? "block h-screen w-full fixed top-0 left-0 bg-black z-50" : "hidden" } md:hidden`} >
                  <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} onClick={toggleMenu} className="absolute top-4 right-4 cursor-pointer text-3xl" />

                  <ul className="flex flex-col items-center justify-center h-full gap-8">
                    <li><a className="hover:text-gray-500 text-3xl" href="http://localhost/SERDAL/">Home</a></li>
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/" className="text-white text-3xl" onClick={() => setMenuOpen(false)}> Publications </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/datasets" className="text-white text-3xl" onClick={() => setMenuOpen(false)}> Dataset </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/survey" className="text-white text-3xl" onClick={() => setMenuOpen(false)}> Survey </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-white hover:text-gray-500 text-3xl" href="http://localhost/SERDAL/contact/">Contact</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-white hover:text-gray-500 text-3xl" href="http://localhost/SERDAL/services/">Services</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-white hover:text-gray-500 text-3xl" href="http://localhost/SERDAL/training/">Trainings</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-white hover:text-gray-500 text-3xl" href="http://localhost/SERDAL/training/">Events & Highlights</a>
                    </li>
                    <li>{user}</li>
                  </ul>        
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex w-full justify-center">
                  <ul className="flex md:flex-row gap-8">
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/" className="text-white text-md"> Home </Link>
                    </li>
                    
                    <li className="relative group flex flex-col items-center justify-center">
                      <Link to="/people" className="text-white text-md">People</Link>

                      {/* Dropdown menu */}
                      <ul className="absolute top-full ml-15 hidden group-hover:flex flex-col bg-black border border-1 border-gray-800 text-white p-2 rounded-md shadow-sm z-50 min-w-[160px]">
                        <li>
                          <Link to="/people/team" className="block px-4 py-2 hover:bg-gray-700 rounded">Phase 1</Link>
                        </li>
                        <li>
                          <Link to="/people/mission" className="block px-4 py-2 hover:bg-gray-700 rounded">Phase 2</Link>
                        </li>
                        <li>
                          <Link to="/people/history" className="block px-4 py-2 hover:bg-gray-700 rounded">Expert pool</Link>
                        </li>
                      </ul>
                    </li>

                    <li className="flex flex-col items-center justify-center">
                      <Link to="/publication" className="text-white text-md"> Publications </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/datasets" className="text-white text-md"> Dataset </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/survey" className="text-white text-md"> Survey </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-white hover:text-gray-500 text-md" href="http://localhost/SERDAL/contact/">Contact</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-white hover:text-gray-500 text-md" href="http://localhost/SERDAL/services/">Services</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-white hover:text-gray-500 text-md" href="http://localhost/SERDAL/training/">Trainings</a>
                    </li>
                    <li>{user}</li>
                  </ul>
                </div>
              </nav>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            {/* <DarkModeSwitcher /> */}
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>

        </div>


        {
            !isAdmin && (
              <div>
                    {
                      !isIndexPage && 
                    <div className="w-full bg-black flex">
                      <div className="mx-2">
                        <Link className="block flex-shrink-0" to="http://localhost/SERDAL/">
                            <img src="/CEM.png" alt="CEM Logo" className='h-15'/>
                        </Link>
                      </div>

                      <div className="mx-2">
                        <Link className="block flex-shrink-0" to="http://localhost/SERDAL/">
                            <img src="/logo.png" alt="SERDAL Logo" className='h-15'/>
                        </Link>
                      </div>
                    </div>
                    }
              </div>
            )
          }

        
      </div>
    </header>
    </>
  );
  
};

export default Header2;

