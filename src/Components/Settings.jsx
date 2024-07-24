import React, { useState } from 'react'
import "../styles/Settings.css"
import { useNavigate } from 'react-router-dom';

const Settings = () => {

    const [isOpens, setIsOpens] = useState(false);

    const toggleMenu = () => {
        setIsOpens(!isOpens);
    };

    const navigate = useNavigate()

    return (
        <div className="navbars">
            <div className="navbar-contents">
                <div className="search-containers">
                    <input type="text" placeholder="Search..." className="search-input" />
                </div>
                <div className={`hamburgers ${isOpens ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
            <div className={`side-menus ${isOpens ? 'open' : ''}`} id='sidemenus'>
                <p onClick={()=>navigate('/hotel-Details')}>Hotel Details </p>
                <p onClick={()=>navigate('/roomdata')} >Rooms</p>
                <p>Wifi</p>
                <p onClick={()=>navigate('/addEmployee')} >User</p>
            </div>
        </div>
    )
}

export default Settings