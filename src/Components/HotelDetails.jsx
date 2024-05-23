import React, { useState } from 'react';
import "../styles/Hoteldetails.css";
import API_ENDPOINTS from '../confi.js';
import axios from 'axios';

const HotelDetails = ({ page, setpage, token }) => {
    const [errors, setErrors] = useState({
        panNumber: '',
        aadharNo: '',
        hotelEmail: '',
        hotelPincode: '',
        hotelWebsite: '',
        longitude: '',
        latitude: '',
        hotelGpsLocation: '',
        hotelAddress: '',
        state: '',
        city: ''
    });

    const [HotelData, setHotelData] = useState({
        panNumber: '',
        aadharNo: '',
        hotelEmail: '',
        hotelWebsite: '',
        longitude: "",
        latitude: '',
        hotelGpsLocation: '',
        hotelAddress: "",
        state: "",
        city: '',
        hotelPincode: ""
    });

    const apiCall = () => {
        let newErrors = { ...errors };
        let frontendErrors = false;

        // Frontend validation
        if (!validatePanNumber(HotelData.panNumber)) {
            newErrors.panNumber = 'Please Check Pan Number';
            frontendErrors = true;
        }
        if (!validateEmail(HotelData.hotelEmail)) {
            newErrors.hotelEmail = 'Please check Email';
            frontendErrors = true;
        }
        if (!validateAadharNumber(HotelData.aadharNo)) {
            newErrors.aadharNo = 'Please check Aadhar Number';
            frontendErrors = true;
        }
        if (!validatePincode(HotelData.hotelPincode)) {
            newErrors.hotelPincode = 'Invalid Pincode';
            frontendErrors = true;
        }
        if (!HotelData.hotelWebsite.trim()) {
            newErrors.hotelWebsite = 'Please fill in this field';
            frontendErrors = true;
        }
        if (!HotelData.longitude.trim()) {
            newErrors.longitude = 'Please fill in this field';
            frontendErrors = true;
        }
        if (!HotelData.latitude.trim()) {
            newErrors.latitude = 'Please fill in this field';
            frontendErrors = true;
        }
        if (!HotelData.hotelGpsLocation.trim()) {
            newErrors.hotelGpsLocation = 'Please fill in this field';
            frontendErrors = true;
        }
        if (!HotelData.hotelAddress.trim()) {
            newErrors.hotelAddress = 'Please fill in this field';
            frontendErrors = true;
        }
        if (!HotelData.state.trim()) {
            newErrors.state = 'Please fill in this field';
            frontendErrors = true;
        }
        if (!HotelData.city.trim()) {
            newErrors.city = 'Please fill in this field';
            frontendErrors = true;
        }

        setErrors(newErrors);

        if (frontendErrors) return;

        axios.post(`${API_ENDPOINTS.API}/owner`, { ...HotelData }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        })
        .then(result => {
            if (result.data.success === true) {
                setpage(page => page + 1);
            } else {
                if (result.data && result.data.error) {
                    const errorMessage = result.data.error;
                    const field = errorMessage.split(':')[0]; // Assuming error message format: field:message
                    setErrors({ ...errors, [field]: errorMessage });
                }
            }
        })
        .catch(err => console.log(err));
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setHotelData({ ...HotelData, [name]: value });

        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateEmail = email => /\S+@\S+\.\S+/.test(email);
    const validatePanNumber = pan => /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(pan);
    const validateAadharNumber = aadhar => /^\d{12}$/.test(aadhar);
    const validatePincode = pincode => /^\d{6}$/.test(pincode);

    return (
        <div>
            <div className='Foam-groups form-groups'>
                <div className='rows'>
                    <div className='row'>
                        <label>Owner Pan Number</label>
                        <input
                            type="text"
                            name="panNumber"
                            value={HotelData.panNumber}
                            onChange={handleInputChange}
                        />
                        {errors.panNumber && <p className="error">{errors.panNumber}</p>}
                    </div>
                    <div className='row'>
                        <label>Owner Aadhaar Number</label>
                        <input
                            type="text"
                            name="aadharNo"
                            value={HotelData.aadharNo}
                            onChange={handleInputChange}
                        />
                        {errors.aadharNo && <p className="error">{errors.aadharNo}</p>}
                    </div>
                    <div className='row'>
                        <label>Hotel Email Address</label>
                        <input
                            type="email"
                            name="hotelEmail"
                            value={HotelData.hotelEmail}
                            onChange={handleInputChange}
                        />
                        {errors.hotelEmail && <p className="error">{errors.hotelEmail}</p>}
                    </div>
                </div>
            </div>
            <div className='Foam-groups form-groups'>
                <div className='rows'>
                    <div className='row'>
                        <label>Website Address</label>
                        <input
                            type="text"
                            name="hotelWebsite"
                            value={HotelData.hotelWebsite}
                            onChange={handleInputChange}
                        />
                        {errors.hotelWebsite && <p className="error">{errors.hotelWebsite}</p>}
                    </div>
                    <div className='row'>
                        <div style={{ display: 'flex', width: '11rem', gap: '10px' }}>
                            <div>
                                <label>Longitude</label>
                                <input
                                    type="text"
                                    name="longitude"
                                    value={HotelData.longitude}
                                    onChange={handleInputChange}
                                />
                                {errors.longitude && <p className="error">{errors.longitude}</p>}
                            </div>
                            <div>
                                <label>Latitude</label>
                                <input
                                    type="text"
                                    name="latitude"
                                    value={HotelData.latitude}
                                    onChange={handleInputChange}
                                />
                                {errors.latitude && <p className="error">{errors.latitude}</p>}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <label>Hotel GPS Location</label>
                        <input
                            type="text"
                            name="hotelGpsLocation"
                            value={HotelData.hotelGpsLocation}
                            onChange={handleInputChange}
                        />
                        {errors.hotelGpsLocation && <p className="error">{errors.hotelGpsLocation}</p>}
                    </div>
                </div>
            </div>
            <div className='form-groups'>
                <label>Hotel Address</label>
                <input
                    type="text"
                    name="hotelAddress"
                    value={HotelData.hotelAddress}
                    onChange={handleInputChange}
                />
                {errors.hotelAddress && <p className="error">{errors.hotelAddress}</p>}
            </div>
            <div className='Foam-groups form-groups'>
                <div className='rows'>
                    <div className='row'>
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={HotelData.state}
                            onChange={handleInputChange}
                        />
                        {errors.state && <p className="error">{errors.state}</p>}
                    </div>
                    <div className='row'>
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={HotelData.city}
                            onChange={handleInputChange}
                        />
                        {errors.city && <p className="error">{errors.city}</p>}
                    </div>
                    <div className='row'>
                        <label>Hotel Pincode</label>
                        <input
                            type="text"
                            name="hotelPincode"
                            value={HotelData.hotelPincode}
                            onChange={handleInputChange}
                        />
                        {errors.hotelPincode && <p className="error">{errors.hotelPincode}</p>}
                    </div>
                </div>
            </div>
            <div className="form-groups">
                <button type="button" onClick={apiCall}>Next</button>
            </div>
        </div>
    );
};

export default HotelDetails;
