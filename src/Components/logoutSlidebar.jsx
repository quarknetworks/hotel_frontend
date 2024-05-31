import React from 'react'
import { Link } from "react-router-dom";
import "../styles/logoutSlidebar.css"

const logoutSlidebar = ({ isOpen, closeSidebar }) => {

    
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <button onClick={closeSidebar}>Close</button>
        <Link to="/login">Logout</Link>
        <Link to="/login">Logout</Link>
        <Link to="/login">Logout</Link>
        <Link to="/login">Logout</Link>
        <Link to="/login">Logout</Link>

        <Link to="/login">Logout</Link>
        <Link to="/login">Logout</Link>
        <Link to="/login">Logout</Link>  <Link to="/login">Logout</Link>
        <Link to="/login">Logout</Link>
      </div>
    </div>
  )
}

export default logoutSlidebar