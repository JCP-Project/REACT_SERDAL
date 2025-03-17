import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import UserOne from '../../../images/user/user-01.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faGear, faLeftLong, faUpload, faUser } from '@fortawesome/free-solid-svg-icons';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  const logout = () => {
    sessionStorage.setItem('id', "");
    sessionStorage.setItem('firstname', "");
    sessionStorage.setItem('lastname',"");
    sessionStorage.setItem('email', "");
    sessionStorage.setItem('img', "");
    sessionStorage.setItem('role', "");
    sessionStorage.setItem('isLoggedIn', 'false');
    sessionStorage.setItem('isAdmin', 'false');
    navigate('/');
    window.location.reload();

  }
  
  const firstname = sessionStorage.getItem('firstname');
  const lastName = sessionStorage.getItem('lastname');
  const img = sessionStorage.getItem('img');

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <Link
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-[14px] text-black">
           {firstname} {lastName}
          </span>
          {/* <span className="block text-xs">UX Designer</span> */}
        </span>

        <span className="h-9 w-9 rounded-full overflow-hidden">
          {
            img && img !== "" ? (
              <img className="h-full w-full object-cover" src={img} alt="User" />
            ):(
              <div className="bg-secondary h-full w-full flex items-center justify-center text-white text-lg lg:text-xs">
                  {firstname?.charAt(0).toUpperCase()}{lastName?.charAt(0).toUpperCase()}
              </div>
            )
          }
          
        </span>

        <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
      </Link>

      {/* <!-- Dropdown Start --> */}
      {dropdownOpen && (
        <div
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark left-1/2 transform -translate-x-1/2`}
        >
          <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
            {/* <li>
              <Link
                to="/"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base  cursor-not-allowed"               
              >
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                My Profile
              </Link>
            </li> */}
            <li>
              <Link
                to="/UploadPublication"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3.5 text-lg lg:text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                Upload Publication
              </Link>
            </li>
            {/* <li>
              <Link
                to="/"
                onClick={() => setDropdownOpen(false)}
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base cursor-not-allowed"
              >
                <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
                Account Settings
              </Link>
            </li> */}
          </ul>
          <button onClick={logout} className="flex items-center gap-3.5 px-6 py-4 text-lg lg:text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
            <FontAwesomeIcon icon={faLeftLong}></FontAwesomeIcon>
            Log Out
          </button>
        </div>
      )}
      {/* <!-- Dropdown End --> */}
    </ClickOutside>
  );
};

export default DropdownUser;
