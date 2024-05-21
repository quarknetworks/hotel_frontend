import React, { useState } from 'react'
import axios from 'axios'
import API_ENDPOINTS from '../confi'

const OtpPass = ({ page, setpage, token , handleApiRespon}) => {

    const [Otp, setOtp] = useState({
        emailOtp: '',
        mobileOtp: '',
        createPass: '',
        confirmPass: '',
    })

    console.log(token)
    const [passwordError, setPasswordError] = useState('');
    const [emailOtpError, setEmailOtpError] = useState('');
    const [mobileOtpError, setMobileOtpError] = useState('');
    const [backendError, setBackendError] = useState('');

    const apiCall = () => {

        clearErrors();

        if (!Otp.emailOtp || !Otp.mobileOtp || !Otp.createPass || !Otp.confirmPass) {
            // If any field is empty, display an error message
            setBackendError('Please fill in all fields');
            return;
        }

        // Frontend validation
        if (Otp.createPass !== Otp.confirmPass) {
            setPasswordError('Passwords do not match');
            return;
        }

        axios.post(`${API_ENDPOINTS.API}/verify`, { ...Otp }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Headers': '*',
            },
        })
            .then(result => {
                handleApiRespon(result.data.tokenVerified);
                if (result.data.success === true) {
                    setpage(2);
                } else {
                    console.log('api failed')
                    if (result.data.error) {
                        if (result.data.error === 'Email OTP does not match') {
                            setEmailOtpError('Email OTP does not match');
                        } else if (result.data.error === 'Mobile OTP does not match') {
                            setMobileOtpError('Mobile OTP does not match');
                        } else {
                            setBackendError(result.data.error);
                        }
                    }
                }
            })

            .catch(err => console.log(err))
    }

    const handleChange = (event, field) => {
        const { value } = event.target;
        setOtp({ ...Otp, [field]: value });
    };

    const clearErrors = () => {
        setPasswordError('');
        setEmailOtpError('');
        setMobileOtpError('');
        setBackendError('');
    };


    return (
        <div>

            <div className='Foam-groups form-groups'>
                <div className='row-gap'>
                    <div className='row'>
                        <label>Enter Email Verification Code</label>
                        <input type="text" id="emailOtp" name="emailOtp"
                            // onChange={(event) =>
                            //     setOtp({ ...Otp, emailOtp: event.target.value })}
                            value={Otp.emailOtp}
                            onChange={(event) => handleChange(event, 'emailOtp')}
                        />
                        <p className="error">{emailOtpError}</p>
                    </div>
                    <div className='row' >
                        <label>Enter Mobile Verification Code</label>
                        <input type="text" id="mobileOtp" name="mobileOtp"
                            //    onChange={(event) =>
                            //     setOtp({ ...Otp, mobileOtp: event.target.value })}
                            value={Otp.mobileOtp}
                            onChange={(event) => handleChange(event, 'mobileOtp')}
                        />
                        <p className="error">{mobileOtpError}</p>
                    </div>
                    <div className='row'>
                        <label>Create Password</label>
                        <input type="password" id="createPass" name="createPass"
                            //    onChange={(event) =>
                            //     setOtp({ ...Otp, createPass: event.target.value })}
                            value={Otp.createPass}
                            onChange={(event) => handleChange(event, 'createPass')}
                        />
                    </div>
                    <div className='row'>
                        <label>Confirm Password</label>
                        <input type="password" id="confirmPass" name="confirmPass"
                            //  onChange={(event) =>
                            //     setOtp({ ...Otp, confirmPass: event.target.value })}
                            value={Otp.confirmPass}
                            onChange={(event) => handleChange(event, 'confirmPass')}
                        />
                        <p className="error">{passwordError}</p>
                    </div>
                    <div className="form-groups">
                        <button type="submit" onClick={apiCall}>Next</button>
                    </div>




                </div>
            </div>
        </div>
    )
}

export default OtpPass