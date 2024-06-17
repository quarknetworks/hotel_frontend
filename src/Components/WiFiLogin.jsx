import React, { useState } from 'react'
import '../styles/WiFiLogin.css'

const WiFiLogin = () => {

    const [name, setName] = useState({
        lastName: '',
        roomNumber: ''
    });

    console.log(name)

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the login logic here
        console.log(`User name submitted: ${name}`);
    };

    return (
        <div className="wifi-login-container">
            <form className="wifi-login-form" onSubmit={handleSubmit}>
                <h2 className="wifi-login-title">WiFi Login</h2>
                <div className="forms-group">
                    <label htmlFor="Last Name" className="form-label">Last Name</label>
                    <input
                        type="text"
                        id=""
                        className="form-input"
                        value={name.lastName}
                        onChange={(e) => setName({...name, lastName:e.target.value} )}
                        required
                    />
                </div>
                <div className="forms-group">
                    <label htmlFor="Room Number" className="form-label">Room Numbers</label>
                    <input
                        type="text"
                        id=""
                        className="form-input"
                        value={name.roomNumber}
                        onChange={(e) => setName({...name , roomNumber:e.target.value})}
                        required
                    />
                </div>
                <p className='instructions'>Please use your last name with your room number as a username for Login</p>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    )
}

export default WiFiLogin
