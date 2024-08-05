import axios from 'axios';
import React, { useState } from 'react';
import API_ENDPOINTS from '../confi';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [response, setresponse] = useState([]);
    console.log(response)


    // const navigate = useNavigate()

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_ENDPOINTS.API}/forgot-password`, { email }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                }

            })

            //   if (response.data.success) {
            //     alert("Otp has been sent on email")
            //     navigate('/resetpassword')
            //   }
            //   setresponse(response)
        }
        catch (err) {
            console.log(err);
        }
        console.log('Email submitted:', email);
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 style={styles.title}>Forget Password</h2>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Submit</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f0f0f0',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        width: '30vw',
        height: 'auto',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        // display: 'absolute'
        // justifyContent:'space-between'
    },
    title: {
        marginBottom: '20px',
        color: '#333',
    },
    input: {
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginTop: '1rem'
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: "2rem"
        // bottom: '0',
        // display: 'relative'
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default ForgetPassword;
