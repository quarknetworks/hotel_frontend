import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Slidemenu from './Slidemenu';
import "../styles/Navbar.css"
import { useTheme } from './ThemeContext';
import Logout from './Logout';


const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const navigate = useNavigate();

  return (
    <>
      <nav>
        <div className={`themed-component ${theme}`} id='navbar'>

          <div className='hamburger' >
            <div className='nav-leftside'>
              <div>
                <FontAwesomeIcon icon={faBars} size='2x'  onClick={toggleMenu}/>
              </div>
              <div className='navbar-brand' onClick={()=> { navigate('/dashboard')}}>Dashboard</div>
            </div>
          </div>
          <div className="navbar">
            <Slidemenu isOpen={isMenuOpen} closeMenu={closeMenu} />
            <div className="navbar-icons">
              <div className='Link-tag'>
                {/* <Link to='/'>Sign-Up</Link> */}
              </div>
              <div className='icons' onClick={toggleTheme} >
                {/* <input type="search"  /> */}
                <FontAwesomeIcon icon={faLightbulb} />
              </div>
              <div className='icons' >
                {/* <input type="search"  /> */}
                <FontAwesomeIcon icon={faSearch} />
              </div>
              <div className='icons'>
                <FontAwesomeIcon icon={faBell} />
              </div>
              <div className='icons' onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
          </div>   
        </div>
        <Logout isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      </nav>


    </>
  )
}

export default Navbar