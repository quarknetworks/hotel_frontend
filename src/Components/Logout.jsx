import React from 'react';
import "../styles/Logout.css"
import { useTheme } from './ThemeContext';

const Logout = ({isOpen, closeSidebar}) => {


    const { theme } = useTheme();

    const handleLogout = () => {
      
      sessionStorage.clear();
      navigate("/login");
      closeSidebar();
    };

  return (

    <div className={`sidebar ${isOpen ? 'opens' : ''} themed-component ${theme}`}>
    <div className="sidebar-cont">
    <button onClick={handleLogout}>Logout</button>
      <button onClick={closeSidebar}>Close</button>
    </div>
  </div>
  )
}

export default Logout