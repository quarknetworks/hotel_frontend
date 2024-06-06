import React from 'react'
import { Link } from "react-router-dom";
import "../styles/LogoutSlidebar.css"
import { useTheme } from './ThemeContext';

const LogoutSlidebar = ({ isOpen, closeSidebar }) => {

  const { theme } = useTheme();

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();

    // Navigate to the login page
    navigate("/login");
    // Close the sidebar
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

export default LogoutSlidebar