import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
// import API_ENDPOINTS from '../confi';

const WiFiLogin = () => {
    const [searchParms, setsearchParms] = useSearchParams();
    const [name, setName] = useState({
        lastName: '',
        roomNumber: ''
    });

    const wlan_id = searchParms.get('wlan_id');
    const client_mac = searchParms.get('client_mac');
    const ap_mac = searchParms.get('ap_mac');
    const url = searchParms.get('authorize_url');
    const ap_name = searchParms.get('ap_name');
    const site_name = searchParms.get('site_name');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://hotelbe.quarknetworks.net:8080/mist/data', 
            { ...name, wlan_id, ap_mac, client_mac, url, ap_name, site_name }, 
            {
                Headers: {
                    // 'Content-Type': 'application/json',
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Headers': '*',
                }
            }).then(result => {
                console.log(result);
            }).catch(err => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={styles.container}>
            <form style={styles.form} onSubmit={handleSubmit}>
                <h2 style={styles.title}>WiFi Login</h2>
                <div style={styles.group}>
                    <label htmlFor="lastName" style={styles.label}>Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        style={styles.input}
                        value={name.lastName}
                        onChange={(e) => setName({ ...name, lastName: e.target.value })}
                        required
                    />
                </div>
                <div style={styles.group}>
                    <label htmlFor="roomNumber" style={styles.label}>Room Number</label>
                    <input
                        type="text"
                        id="roomNumber"
                        style={styles.input}
                        value={name.roomNumber}
                        onChange={(e) => setName({ ...name, roomNumber: e.target.value })}
                        required
                    />
                </div>
                <p style={styles.instructions}>Please use your last name with your room number as a username for Login</p>
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    )
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#e0f7fa'
    },
    form: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
    },
    title: {
        marginBottom: '20px',
        color: '#00796b'
    },
    group: {
        marginBottom: '15px',
        textAlign: 'left'
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        color: '#00796b'
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #b2dfdb',
        borderRadius: '4px',
        fontSize: '16px',
        boxSizing: 'border-box'
    },
    instructions: {
        margin: '1.8rem 0rem',
        color: '#00796b'
    },
    button: {
        width: '100%',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#00796b',
        color: '#ffffff',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'backgroundColor 0.3s ease'
    }
}

export default WiFiLogin;
