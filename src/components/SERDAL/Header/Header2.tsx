import { Link } from 'react-router-dom';
import DropdownUser from './DropdownUser';

import { useState, useEffect  } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

function Header2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
    const loggedInStatus = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []); 

  let user = (
    <div>
      <Link to="/auth/signin">
        <button onClick={() => setMenuOpen(false)}  className="bg-white border-2 border-primary text-primary py-3 md:py-1 px-10 md:px-5 rounded-sm hover:bg-white hover:border-primary text-xl md:text-sm">
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
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1">
      <div className="flex flex-grow items-center justify-center py-5 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4">
          <Link className="block flex-shrink-0" to="http://localhost/SERDAL/">
            <img src="/logo.png" alt="Logo" height={55} width={55}/>
          </Link>

          <div className="flex items-center gap-6">
              <FontAwesomeIcon
                  icon={menuOpen ? faTimes : faBars}
                  onClick={toggleMenu}
                  className="text-3xl cursor-pointer md:hidden"
                />
            </div>
        </div>

        <div className={`sm:block ${menuOpen ? 'block' : 'hidden'} text-black font-medium z-50`}>
            {/* Mobile and Desktop Combined Navigation */}
            <nav className={`${ menuOpen ? "block" : "hidden" } absolute md:static top-0 left-0 w-full bg-white md:flex md:items-center md:w-auto z-50`}>
                {/* Full-Screen Mobile Menu */}
                <div className={`${ menuOpen ? "block h-screen w-full fixed top-0 left-0 bg-white z-50" : "hidden" } md:hidden`} >
                  <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} onClick={toggleMenu} className="absolute top-4 right-4 cursor-pointer text-3xl" />

                  <ul className="flex flex-col items-center justify-center h-full gap-8">
                    <li><a className="hover:text-gray-500 text-3xl" href="http://localhost/SERDAL/">Home</a></li>
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/" className="text-black text-3xl" onClick={() => setMenuOpen(false)}> Publications </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/datasets" className="text-black text-3xl" onClick={() => setMenuOpen(false)}> Dataset </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/survey" className="text-black text-3xl" onClick={() => setMenuOpen(false)}> Survey </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-black hover:text-gray-500 text-3xl" href="http://localhost/SERDAL/contact/">Contact</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-black hover:text-gray-500 text-3xl" href="http://localhost/SERDAL/services/">Services</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-black hover:text-gray-500 text-3xl" href="http://localhost/SERDAL/training/">Trainings</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-black hover:text-gray-500 text-3xl" href="http://localhost/SERDAL/training/">Events & Highlights</a>
                    </li>
                    <li>{user}</li>
                  </ul>        
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex w-full justify-center">
                  <ul className="flex md:flex-row gap-8">
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-black hover:text-gray-500 text-md" href="http://localhost/SERDAL/">Home</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-black hover:text-gray-500 text-md" href="http://localhost/SERDAL/aboutus/">About</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/" className="text-black text-md"> Publications </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/datasets" className="text-black text-md"> Dataset </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <Link to="/survey" className="text-black text-md"> Survey </Link>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-black hover:text-gray-500 text-md" href="http://localhost/SERDAL/contact/">Contact</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-black hover:text-gray-500 text-md" href="http://localhost/SERDAL/services/">Services</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-black hover:text-gray-500 text-md" href="http://localhost/SERDAL/training/">Trainings</a>
                    </li>
                    <li className="flex flex-col items-center justify-center">
                      <a className="text-black hover:text-gray-500 text-md" href="http://localhost/SERDAL/training/">Events & Highlights</a>
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

            {/* <!-- User Area --> */}
            {/* <DropdownUser /> */}
            
            {/* <!-- User Area --> */}
        </div>



        
      </div>
    </header>
    </>
  );
  
};

export default Header2;

