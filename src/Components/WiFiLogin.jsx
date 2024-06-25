import React, { useState } from 'react'
import '../styles/WiFiLogin.css'
// import { useSearchParams } from 'react-router-dom';

const WiFiLogin = () => {

    // const [searchParms, setsearchParms] = useSearchParams();
    const [name, setName] = useState({
        lastName: '',
        roomNumber: ''
    });

    // const wlanId = searchParms.get('wlan_id')
    // const client_mac = searchParms.get('client_mac')
    // const ap_mac  = searchParms.get('ap_mac')
    // const authorize_url = searchParms.get('authorize_url')
    // const ap_name = searchParms.get('ap_name')
    // const site_name = searchParms.get('site_name')

    //  console.log(wlanId)
    // console.log(client_mac)
    // console.log(ap_mac)
    // console.log(authorize_url)
    // console.log(ap_name)
    // console.log(site_name)

    // console.log(name)

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

                    <label htmlFor="name" className="form-label">Last Name</label>

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

                    <label htmlFor="name" className="form-label">Room Number</label>

                    <input
                        type="text"
                        id=""
                        className="form-input"
                        value={name.roomNumber}
                        onChange={(e) => setName({...name , roomNumber:e.target.value})}
                        required
                    />
                </div>
{/*                 <h1>wlanId {wlanId} </h1>
                <h1>client_mac {client_mac} </h1>
                <h1>ap_mac {ap_mac} </h1>
                <h1>authorize_url {authorize_url} </h1>
                <h1>ap_name {ap_name} </h1> */}
                <p className='instructions'>Please use your last name with your room number as a username for Login</p>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    )
}

export default WiFiLogin
