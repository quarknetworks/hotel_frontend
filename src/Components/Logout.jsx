import React, { useEffect, useState } from 'react';
import "../styles/Logout.css"
import API_ENDPOINTS from '../confi';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { faUser, faRightFromBracket, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const Logout = ({ isOpen, closeSidebar }) => {

  const [user , setuser] = useState([])
  console.log(user)


  const navigate = useNavigate();

  const { theme } = useTheme();

 useEffect (()=> {
 const fetchuser = async () => {
  const token = sessionStorage.getItem('token');

  try{
    const response = await axios.get(`${API_ENDPOINTS.API}/current/user`,{
      headers:{
        'Authorization' : `Bearer ${token}`
      }
      
    })

    console.log(response)
    setuser(response.data)
  } catch (e) {
    console.log(e)
  }

 }
fetchuser()
 }, [])

  const handleLogout = () => {


    sessionStorage.clear();
    navigate("/login");
  };

  return (

    <div className={`sidebar ${isOpen ? 'opens' : ''} themed-component ${theme}`}>
      <div className="sidebar-cont">
        <ul>
          <div className='siderbarconten' >
            <FontAwesomeIcon icon={faUser} />
            <li>{user.name}</li>
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