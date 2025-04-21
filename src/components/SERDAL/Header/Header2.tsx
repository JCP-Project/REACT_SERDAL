import { Link, useLocation } from 'react-router-dom';
import DropdownUser from './DropdownUser';

import { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import servicesData from '../Resources/Services/servicesData';

import UP from '../Resources/UPLB_VIGHRColor_1.png'
import CEM from '../Resources/CEM.png'
import UPLB from '../Resources/logo.png'

interface data {
  id: number;
  title: string;
  summary: string;
  img: string;  
}

function Header2() {
  const location = useLocation();
  const [data, setData] = useState<data[]>([])

  const isIndexPage = location.pathname === '/';

  
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);


  const toggleDropdown = (menu: string) => {
    setOpenDropdown(prev => (prev === menu ? "" : menu));
  };

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
      setData(servicesData);
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
        <motion.button
          onClick={() => setMenuOpen(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="min-w-[100px] bg-black-2 border-2 border-primary text-primary py-3 md:py-0 px-10 md:px-5 rounded-lg hover:text-white hover:bg-gray-700 hover:border-secondary text-xl md:text-sm"
        >
        Sign in
      </motion.button>
        </Link>
      </div>
    );
  
  if (isLoggedIn) {
    user = <div><DropdownUser /></div>;
  }

 
  return (
    <>

    <div className="w-full flex items-center justify-between md:justify-center bg-black-2 px-3 md:px-0 py-5 md:py-0">
          {
            !isAdmin && (
              <div>
                    {
                      !isIndexPage && 
                    <div className="w-full">
                      <Link className="block flex-shrink-0" to="https://uplb.edu.ph/" target='_'>
                        <img src={UP} alt="UPLB Logo" className='md:ml-3 max-h-10 md:max-w-[200px] md:max-h-15 w-auto h-auto'/>
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



          <div className={`sm:block ${menuOpen ? 'block' : 'hidden'} text-white font-medium z-50 w-full`}>
            <nav className={`${ menuOpen ? "block" : "hidden" } absolute md:static top-0 left-0 w-full md:flex md:items-center md:w-auto z-50`}>
                {/* Full-Screen Mobile Menu */}
                <div className={`bg-black-2 ${ menuOpen ? "block min-h-screen w-full fixed top-0 left-0 z-50" : "hidden" } md:hidden`} >
                  <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} onClick={toggleMenu} className="absolute top-4 right-4 cursor-pointer text-3xl" />

                  <ul className="h-screen flex flex-col bg-black w-full py-20 my-15 gap-2 text-white text-[20px] items-center z-50">
                    <li>
                      <Link to="/" className="block px-4 py-2 hover:text-primary" onClick={toggleMenu}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link to="/about" className="block px-4 py-2 hover:text-primary" onClick={toggleMenu}>
                        About Us
                      </Link>
                    </li>

                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:text-primary"
                        onClick={() => toggleDropdown("people")}
                      >
                        People
                      </button>
                      {openDropdown === "people" && (
                        <ul className="ml-4 border-l border-gray-700 pl-4">
                          <li>
                            <Link to="/people#phase1" className="block py-1 hover:text-primary" onClick={toggleMenu}>
                              Phase 1
                            </Link>
                          </li>
                          <li>
                            <Link to="/people#phase2" className="block py-1 hover:text-primary" onClick={toggleMenu}>
                              Phase 2
                            </Link>
                          </li>
                          <li>
                            <a
                              href="https://cem.uplb.edu.ph/faculty-reps/"
                              target="_blank"
                              rel="noreferrer"
                              className="block py-1 hover:text-primary"
                              onClick={toggleMenu}
                            >
                              Expert Pool
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>

                    <li>
                      <Link to="/publication" className="block px-4 py-2 hover:text-primary" onClick={toggleMenu}>
                        Publications
                      </Link>
                    </li>
                    <li>
                      <Link to="/datasets" className="block px-4 py-2 hover:text-primary" onClick={toggleMenu}>
                        Datasets
                      </Link>
                    </li>

                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:text-primary"
                        onClick={() => toggleDropdown("services")}
                      >
                        Services
                      </button>
                      {openDropdown === "services" && (
                        <ul className="ml-4 border-l border-gray-700 pl-4">
                          {data.map((service) => (
                            <li id={`Mservies${service.id}`} key={`M${service.title}`}>
                              <Link
                                to={`/services#${service.title.replace(/[\s\-]/g, "")}`}
                                className="block py-1 hover:text-primary"
                                onClick={toggleMenu}
                              >
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>

                    <li>
                      <Link to="/toolbox" className="block px-4 py-2 hover:text-primary" onClick={toggleMenu}>
                        SERDAL Toolbox
                      </Link>
                    </li>
                    <li>
                      <Link to="/trainings" className="block px-4 py-2 hover:text-primary" onClick={toggleMenu}>
                        Trainings
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="block px-4 py-2 hover:text-primary" onClick={toggleMenu}>
                        Contact Us
                      </Link>
                    </li>

                    <li className="px-4 py-2">{user}</li>
                  </ul>
       
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex w-full justify-center py-8 text-[17px] font-bold">
                  <ul className="flex md:flex-row md:items-center gap-8">
                    <li className="">
                      <Link to="/" className="text-white text-md hover:text-primary"> Home </Link>
                    </li>
                    <li className="">
                      <Link to="/about" className="text-white text-md hover:text-primary"> About Us </Link>
                    </li>
                    
                    <li className="relative group">
                      <Link to="/people" className="text-white text-md hover:text-primary"
                      >People</Link>

                      {/* Dropdown menu */}
                      <ul className="absolute top-full hidden group-hover:flex flex-col bg-black border border-1 border-gray-800 text-white p-2 rounded-md shadow-sm z-50 min-w-[160px]">
                        <li>
                          <Link to="/people#phase1" className="block px-4 py-2 hover:bg-gray-700 rounded">Phase 1</Link>
                        </li>
                        <li>
                          <Link to="/people#phase2" className="block px-4 py-2 hover:bg-gray-700 rounded">Phase 2</Link>
                        </li>
                        <li>
                          <Link to="https://cem.uplb.edu.ph/faculty-reps/" target='_' className="block px-4 py-2 hover:bg-gray-700 rounded">Expert pool</Link>
                        </li>
                      </ul>
                    </li>

                    <li className="flex">
                      <Link to="/publication" className="text-white text-md hover:text-primary"> Publications </Link>
                    </li>
                    <li className="flex">
                      <Link to="/datasets" className="text-white text-md hover:text-primary"> Datasets </Link>
                    </li>

                    <li className="relative group">
                      <Link to="/services" className="text-white text-md hover:text-primary"> Services</Link>
                      {/* Dropdown menu */}
                      <ul className="absolute top-full hidden group-hover:flex flex-col bg-black border border-1 border-gray-800 text-white p-2 rounded-md shadow-sm z-50 min-w-[260px]">
                        {
                          data.map(services => (
                          <li id={`D${services.id}`} key={`D${services.title}`}>
                            <Link to={`/services#${services.title.replace(/[\s\-]/g, '')}`} className="block px-4 py-2 hover:bg-gray-700 rounded">{services.title}</Link>
                          </li>
                          ))
                        }
                      </ul>
                    </li>

                    <li className="">
                      <Link to="/toolbox" className="text-white text-center text-md hover:text-primary"> SERDAL Toolbox </Link>
                    </li>

                    <li className="">
                      <Link to="/trainings" className="text-white text-md hover:text-primary"> Events & Highlights</Link>
                    </li>

                    <li className="">
                      <Link to="/contact" className="text-white text-md hover:text-primary"> Contact Us </Link>
                    </li>
                    
                    <li>{user}</li>
                  </ul>
                </div>
              </nav>
        </div>


        {
            !isAdmin && (
              <div>
                    {
                      !isIndexPage && 
                    <div className="flex md:mr-3">
                      <div>
                        <Link className="block flex-shrink-0" to="https://cem.uplb.edu.ph/" target='_'>
                            <img src={CEM} alt="CEM Logo" className="ml-3 md:ml-3 max-h-10 md:max-w-[200px] md:max-h-15 w-auto h-auto"/>
                        </Link>
                      </div>

                      <div>
                        <Link className="block flex-shrink-0" to="/" >
                            <img src={UPLB} alt="SERDAL Logo" className="ml-3 md:ml-3 max-h-10 md:max-w-[200px] md:max-h-15 w-auto h-auto"/>
                        </Link>
                      </div>
                    </div>
                    }
              </div>
            )
          }
    </div>

    </>
  );
  
};

export default Header2;

