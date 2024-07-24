import React, { useState } from 'react';
import axios from 'axios';
import '../styles/UserVerificationForm.css';
import API_ENDPOINTS from '../confi';

const UserVerificationForm = () => {
  const [mobileNumber, setmobileNumber] = useState('');
  const [aadharNo, setaadharNo] = useState('');
  const [Password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // const validate = () => {
  //   const errors = {};
  //   if (mobile.length !== 10) {
  //     errors.mobile = 'Mobile number must be 10 digits long.';
  //   }
  //   if (aadhar.length !== 12) {
  //     errors.aadhar = 'Aadhaar number must be 12 digits long.';
  //   }
  //   return errors;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const validationErrors = validate();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // const userData = {
    //   mobile,
    //   aadhar,
    //   password,
    
    // };

    try {
      const response = await axios.post(`${API_ENDPOINTS.API}/onboarding-Employee?token=${token}`, {mobileNumber,aadharNo,Password}, {
       headers: {
           'Content-Type': 'application/json',
        }
      });
      console.log('User data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting user data:', error);
    }
  };

  return (
    <form className="user-verification-form" onSubmit={handleSubmit}>
      <div className="form-groups">
        <label htmlFor="mobile">Mobile Number</label>
        <input
          type="text"
          id="mobile"
          value={mobileNumber}
          onChange={(e) => setmobileNumber(e.target.value)}
          required
        />
        {errors.mobile && <p className="error">{errors.mobile}</p>}
      </div>
      <div className="form-groups">
        <label htmlFor="aadhar">Aadhaar Number</label>
        <input
          type="text"
          id="aadhar"
          value={aadharNo}
          onChange={(e) => setaadharNo(e.target.value)}
          required
        />
        {errors.aadhar && <p className="error">{errors.aadhar}</p>}
      </div>
      <div className="form-groups">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserVerificationForm;
