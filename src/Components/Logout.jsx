import React from 'react';
import "../styles/Logout.css"
import API_ENDPOINTS from '../confi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { faUser, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Logout = ({ isOpen, closeSidebar }) => {


  const navigate = useNavigate();

  const { theme } = useTheme();

  const handleLogout = () => {

    // sessionStorage.clear();
    navigate("/login");
  };

  return (

    <div className={`sidebar ${isOpen ? 'opens' : ''} themed-component ${theme}`}>
      <div className="sidebar-cont">
        <ul>

          <div className='siderbarconten' >
            <FontAwesomeIcon icon={faUser} />
            <li>Profile</li>
          </div>
          <div className='siderbarconten' onClick={handleLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <li >  Logout</li>
          </div>
          {/* <div className='siderbarconten' onClick={closeSidebar} >
            <FontAwesomeIcon icon={faXmark} />
            <li >Close</li>
          </div> */}
        </ul>
      </div>
    </div>
  )
}

export default Logout