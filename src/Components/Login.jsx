import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import axios from 'axios'
import API_ENDPOINTS from '../confi.js';


const Login = ({ handlePageChange, handletoken }) => {



    const [tokens, settokens] = useState('')
    console.log(tokens)


    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [data, setdata] = useState({
        email: '',
        password: ''
    });

    // console.log(data)


    const navigate = useNavigate()

    const loginfun = async () => {
        try {
            const response = await axios.post(`${API_ENDPOINTS.API}/login`, { ...data }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            });

            console.log(response)
            const tokenss = response.data.token; // Correct variable name
            const pages = response.data.checklistPage

            // console.log(pages)
            // console.log(tokenss)
            if (response.data.success === true) {
               
                if (pages === 5) { // Corrected conditional check
                    sessionStorage.setItem('token', tokenss);
                    handletoken(tokenss)
                    navigate('/dashboard');
                } else {
                    handlePageChange(pages);
                    handletoken(tokenss)
                    navigate('/');
                }
            } else {
                if (response.data.message === 'Invalid email') {
                    setEmailError('Please Enter Valid email');
                } else if (response.data.message === 'Invalid password') {
                    setPasswordError('Please Enter Valid password');
                }
                


            }

        } catch (error) {
            console.error('Error during login:', error);
            // Handle error state if needed
        }
    };


    console.log(localStorage);
    return (

        <>
            <div id='LoginContainer'>
                <div className='loginmaindiv'>
                    <div className='login-headers'>
                        <h1>Login</h1>
                        <h2>Please fill your Details</h2>
                    </div>
                    <div className="form-groups">
                        <label htmlFor="email">Enter your Email Address</label>
                        <input type="text" id="email" name="email" placeholder='Enter Your Email Address'
                            onChange={(event) =>
                                setdata({ ...data, email: event.target.value })}
                        />
                        {emailError && <p className="error">{emailError}</p>}
                    </div>

                    <div className="form-groups">
                        <label htmlFor="password">Enter Your Password</label>
                        <input type="password" id="password" name="password" placeholder='Enter Your Password' required
                            onChange={(event) =>
                                setdata({ ...data, password: event.target.value })}
                        />
                        {passwordError && <p className="error">{passwordError}</p>}
                    </div>

                    <div className="form-groups">
                        <button type="submit" onClick={loginfun}>Login</button>
                    </div>
                    <div className='login-bottom'>
                        <div>
                            if you are new please click on <Link to='/'>Signup</Link>
                            <p>forget Password please Click <Link to='/forgetpassword'>forget-password</Link></p>
                        </div>
                        <div>
                            By proceeding i agree to T&C & privacy policy
                        </div>

                    </div>
                </div>

            </div>


        </>
    )
}

export default Login