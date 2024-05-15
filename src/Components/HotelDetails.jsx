import React, {useState} from 'react'
import "../styles/Hoteldetails.css"
import API_ENDPOINTS from '../confi.js';
import axios from 'axios'

const HotelDetails = ({page, setpage, token}) => {

    const [panError, setPanError] = useState('');
    const [aadharNoError, setAadharNoError] = useState('');
    const [hotelEmailError, setHotelEmailError] = useState('');
    const [hotelPincodeError, setHotelPincodeError] = useState('');
    const [backendError, setBackendError] = useState('');

    const [HotelData, setHotelData] = useState({
        panNumber : '',
        aadharNo: '',
        hotelEmail: '',
        hotelWebsite: '',
        longitude:"",
        latitude : '',
        hotelGpsLocation: '',
        hotelAddress: "",
        state: "",
        city: '',
        hotelPincode:""

    });

    // const [error, setError] = useState({
    //     panNumber: '',
    //     aadharNo: '',
    //     hotelEmail: '',
    //     hotelPincode: ''
    // });

    console.log(HotelData);

    
    const apiCall = () => {

        clearErrors();

        // Frontend validation
        let frontendErrors = false;
        if (!validatePanNumber(HotelData.panNumber)) {
            setPanError('Please Check Pan Number');
            frontendErrors = true;
        }
        if (!validateEmail(HotelData.hotelEmail)) {
            setHotelEmailError('Please check Email');
            frontendErrors = true;
        }
        if (!validateAadharNumber(HotelData.aadharno)) {
            setAadharNoError('Please check Aadhar Number');
            frontendErrors = true;
        }
        if (!validatePincode(HotelData.hotelPincode)) {
            setHotelPincodeError('Invalid Pincode');
            frontendErrors = true;
        }

        // If there are frontend errors, stop processing
        if (frontendErrors) return;

      
        axios.post(`${API_ENDPOINTS.API}/signup/owner`, { ...HotelData },{
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*', 
          },
        })
          .then(result => {
            console.log(result)
            if (result.data.success === true) {  
                setpage(page => page+1);
            } else {
              console.log('api failed')
              if (result.data && result.data.error) {
                const errorMessage = result.data.error;
                const field = errorMessage.split(':')[0]; // Assuming error message format: field:message
                setError({ ...error, [field]: errorMessage });
            }
            }
          })
    
          .catch(err => console.log(err))
      }
    
      const handleInputChange = (field, value) => {
        setHotelData({ ...HotelData, [field]: value });
        setError({ ...error, [field]: '' }); // Clear error when user edits the field
    };

    const clearErrors = () => {
        setPanError('');
        setHotelEmailError('');
        setAadharNoError('');
        setHotelPincodeError('');
    };

    const validateEmail = email => /\S+@\S+\.\S+/.test(email);
    
    const validatePanNumber = pan =>  /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(pan);

    const validateAadharNumber = aadhar =>  /^\d{12}$/.test(aadhar);

    const validatePincode = pincode =>  /^\d{6}$/.test(pincode);



    return (

        <div>
            <div className='Foam-groups form-groups'>
                <div className='rows'>
                    <div className='row'>
                        <label>Owner Pan Number</label>
                        <input type="text" id="pan" name="pan" 
                        onChange={(event) =>
                            setHotelData({ ...HotelData, panNumber: event.target.value })}
                        />
                        {panError && <p className="error">{panError}</p>}
                    </div>
                    <div className='row'>
                        <label>Owner Aadhaar Number</label>
                        <input type="text" id="aadhar" name="aadhar"
                        onChange={(event) =>
                            setHotelData({ ...HotelData, aadharNo: event.target.value })} />
                            {aadharNoError && <p className="error">{aadharNoError}</p>}
                    </div>
                    <div className='row'>
                        <label>Hotel Email Address</label>
                        <input type="email" id="pan-photo" name="pan-photo"
                        onChange={(event) =>
                            setHotelData({ ...HotelData, hotelEmail: event.target.value })}
                         />
                         {hotelEmailError && <p className="error">{hotelEmailError}</p>}
                    </div>
                </div>
            </div>
            <div className='Foam-groups form-groups' >
                <div className='rows'>
                    <div className='row'>
                        <label>Website Address</label>
                        <input type="text" id="pan" name="pan"
                        onChange={(event) =>
                            setHotelData({ ...HotelData,  hotelWebsite: event.target.value })}
                             />
                    </div>
                    <div className='row'>
                        <div style={{display:'flex', width: '11rem', gap:'10px'}}>
                        <div>
                        <label>longitude</label>
                        <input type="text" id="aadhar" name="aadhar"
                        onChange={(event) =>
                            setHotelData({ ...HotelData, longitude: event.target.value })}
                             />
                         </div>
                         <div>
                           <label htmlFor="">latitude</label>
                           <input type="text" name="" id="" 
                           onChange={(event) =>
                            setHotelData({ ...HotelData, latitude: event.target.value })}
                             />

                             
                         </div>
                         </div>
                    </div>
                    <div className='row'>
                        <label>Hotel Gps Loaction</label>
                        <input type="email" id="pan-photo" name="pan-photo" 
                        onChange={(event) =>
                            setHotelData({ ...HotelData, hotelGpsLocation: event.target.value })}
                            />
                    </div>
                </div>
            </div>

            <div className='form-groups'>
                <label>Hotel Address</label>
                <input type="text" id="gst-certificate" name="gst-certificate"
                onChange={(event) =>
                    setHotelData({ ...HotelData, hotelAddress: event.target.value })}
                     />
            </div>

            <div className='Foam-groups form-groups' >
                <div className='rows'>
                    <div className='row'>
                        <label>State</label>
                        <input type="text" id="pan-photo" name="pan-photo" accept=".jpg,.jpeg,.png,.pdf"
                    
                    onChange={(event) =>
                        setHotelData({ ...HotelData, state: event.target.value })}
                         />
                    </div>
                    <div className='row'>
                        <label>City</label>
                        <input type="text" id="aadhar-photo" name="aadhar-photo" accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(event) =>
                            setHotelData({ ...HotelData, city: event.target.value })}
                            />
                    </div>
                    <div className='row'>
                        <label>Hotel Pincode</label>
                        <input type="text" id="hotel-address" name="hotel-address" accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) =>
                            setHotelData({ ...HotelData, hotelPincode: event.target.value })}
                            />
                            {hotelPincodeError && <p className="error">{hotelPincodeError}</p>}
                    </div>
                </div>
            </div>
            <div className="form-groups">
                        <button type="submit" onClick={apiCall} >Sign Up</button>
                    </div>
        </div>

    )
}

export default HotelDetails