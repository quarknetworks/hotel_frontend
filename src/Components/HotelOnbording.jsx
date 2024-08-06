import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const HotelOnbording = ({hotel}) => {
    const [details, setDetails] = useState(null);
    console.log(details)

    const location = useLocation();
    console.log(location)
    // const hotelId = location.state.hotelId

    console.log(hotel)

    useEffect(() => {
      const fetchHotelDetails = async () => {
        try {
          const response = await axios.get(`http://192.168.1.4:8080/signup/combined?hotelId=${location.state.hotel}`);
          setDetails(response.data.hotel);
        } catch (error) {
          console.error('Error fetching hotel details:', error);
        }
      };
  
      fetchHotelDetails();
    }, [hotel]);
  
    if (!details) {
      return <div>Loading...</div>;
    }

  return (
     <div className="hotel-details">
      <h2>Hotel Details</h2>
      <p>ID: {details._id}</p>
      <p>Hotel Name: {details.hotelName}</p>
      <p>Email: {details.email}</p>
      <p>Mobile Number: {details.mobileNumber}</p>
      <p>Aadhar No: {details.aadharNo}</p>
      <p>Pan No: {details.panNumber}</p>
      <p>Aadhar Url: {details.aadharUrl}</p>
      <p>Pan Url: {details.panUrl}</p>
      <p>Business Pan Url: {details.hotelName}</p>
      <p>Business Gst Url: {details.hotelName}</p>
      <p>Hotel Website: {details.hotelName}</p>
      <p>City: {details.hotelName}</p>
      <p>State: {details.hotelName}</p>
      <p>Hotel Adress: {details.hotelName}</p>
      <p>Hotel Pincode: {details.hotelName}</p>
      {/* <p>Hotel Pincode: {details.hotelName}</p> */}
      <p>Hotel TotalRooms: {details.hotelName}</p>
      <p>Room Number: {details.hotelName}</p>
      {/* <p>Registration Number: {details}</p> */}
      <p>Status: {details.is_Onboard}</p>
    </div>
  )
}

export default HotelOnbording