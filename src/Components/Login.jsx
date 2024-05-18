import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import axios from 'axios'
import API_ENDPOINTS from '../confi.js';


const Login = () => {

    const [token, settoken] = useState('')


    const [data, setdata] = useState({
        email: '',
        password: ''
    });

    console.log(data)


    const navigate = useNavigate()

    const loginfun = () => {



         axios.post(`${API_ENDPOINTS.API}/signup/login`, { ...data }, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },

        })
            .then(result => {
                settoken(result.data.token);
                if (result.data.success === true) {
                    navigate('/dashbord')
                } else {
                    console.log('api failed')

                    if (result.data.error) {
                        setBackendError(result.data.error);
                    }
                }
            })



            

            .catch(err => err)
    }



    return (

        <>
            <div id='LoginContainer'>
                <div className='loginmaindiv'>
                    <div className='login-headers'>
                        <h1>Login</h1>
                        <h2>Please fill your details as Per Ask</h2>
                    </div>
                    <div className="form-groups">
                        <label htmlFor="email">Enter your Email Address</label>
                        <input type="text" id="email" name="email" placeholder='Enter Your Email Address'
                            onChange={(event) =>
                                setdata({ ...data, email: event.target.value })}
                        />

                    </div>

                    <div className="form-groups">
                        <label htmlFor="password">Enter Your Password</label>
                        <input type="password" id="password" name="password" placeholder='Enter Your Password' required
                            onChange={(event) =>
                                setdata({ ...data, password: event.target.value })}
                        />

                    </div>

                    <div className="form-groups">
                        <button type="submit" onClick={loginfun}>Login</button>
                    </div>
                    <div className='login-bottom'>
                        <div>
                            if you are new please click on <Link to='/'>Signup</Link>
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