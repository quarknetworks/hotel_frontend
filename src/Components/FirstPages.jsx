
import axios from 'axios';
import React, {useState} from 'react'
import API_ENDPOINTS from '../confi.js';


const FirstPages = ({ page, setpage, handleApiResponse}) => {

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [hotelError, setHotelError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [backendError, setBackendError] = useState('');
   


    const [verification, setverification] = useState({
        name: "",
        email: "",
        hotelName: "",
        mobileNumber: "",
    });

    

    console.log(verification)
    const apiCall = () => {

        clearErrors();

        // Frontend validation
        let frontendErrors = false;
        if (!validateName(verification.name)) {
            setNameError('Name must contain only letters');
            frontendErrors = true;
        }
        if (!validateEmail(verification.email)) {
            setEmailError('Invalid email format');
            frontendErrors = true;
        }
        if (!verification.hotelName.trim()) {
            setHotelError('Hotel name is required');
            frontendErrors = true;
        }
        if (!validateMobileNumber(verification.mobileNumber)) {
            setMobileError('Mobile number must be a 10-digit number');
            frontendErrors = true;
        }

        // If there are frontend errors, stop processing
        if (frontendErrors) return;


     const response =  axios.post(`${API_ENDPOINTS.API}/signup`, { ...verification }, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
          
        })
          .then(result => {
            handleApiResponse(result.data.token);
            if (result.status === 201) {  
                setpage(page => page+1);
            } else {
              console.log('api failed')
           
              if (result.data.error) {
                setBackendError(result.data.error);
            }
            }
          })
    
          .catch(err =>  err)
      }

      const handleChange = event => {
        const { name, value } = event.target;

        // Clear previous errors
        clearErrors();

        setverification({ ...verification, [name]: value });
    };

    const clearErrors = () => {
        setNameError('');
        setEmailError('');
        setHotelError('');
        setMobileError('');
        setBackendError('');
    };

    const validateName = name => /^[A-Za-z\s]+$/.test(name);

    const validateEmail = email => /\S+@\S+\.\S+/.test(email);

    const validateMobileNumber = MobileNumber => /^\d{10}$/.test(MobileNumber);
  

  return (
    <div>
       
                    <div className="form-groups">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder='Enter Your Name' value={verification.name} 
                        onChange={handleChange}
                        // onChange={(event) =>
                        //     setverification({ ...verification, name: event.target.value })}
                        required />
                         <p className="error">{nameError}</p>
                         {backendError && <p className="error">{backendError}</p>}
                    </div>
                    <div className="form-groups">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder='Enter Your Email' value={verification.email} 
                        onChange={handleChange}
                        // onChange={(event) =>
                        //     setverification({ ...verification, email: event.target.value })}
                        required/>
                         <p className="error">{emailError}</p>
                         {backendError && <p className="error">{backendError}</p>}
                    </div>
                    <div className="form-groups">
                        <label htmlFor="hotelName">Hotel Name</label>
                        <input type="text" id="hotelName" name="hotelName" placeholder='Enter Your hotel Name' value={verification.hotelName}
                        onChange={handleChange} 
                        // onChange={(event) =>
                        //     setverification({ ...verification, hotelName: event.target.value })}
                        required />
                         <p className="error">{hotelError}</p>
                         {backendError && <p className="error">{backendError}</p>}
                    </div>
                    <div className="form-groups">
                        <label htmlFor="password">Phone Number</label>
                        <input type="Number" id="number" name="mobileNumber" placeholder='Enter Your Phone Number' value={verification.mobileNumber}
                          onChange={handleChange}
                        // onChange={(event) =>
                        //     setverification({ ...verification, mobileNumber: event.target.value })}
                            />
                             <p className="error">{mobileError}</p>
                             {backendError && <p className="error">{backendError}</p>}

                    </div>
                    <div className="form-groups">
                        <button type="submit" onClick={apiCall}>Sign Up</button>
                    </div>
                    
                    {/* <div className="form-groups">
                        <button type="submit">Sign Up</button>
                    </div> */}
           
    </div>
  )
}

export default FirstPages