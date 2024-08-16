import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const HotelOnbording = ({hotel}) => {
    const [details, setDetails] = useState(null);
    const [status, setStatus] = useState();
    console.log(status)
    console.log(details)

    const location = useLocation();
    console.log(location)
    // const hotelId = location.state.hotelId

    console.log(hotel)

    useEffect(() => {
      const fetchHotelDetails = async () => {
        try {
          const response = await axios.get(`${API_ENDPOINTS.API}/signup/combined?hotelId=${location.state.hotel}`);
          setDetails(response.data);
          if (response.data.hotel.is_Onboard == true) {
            setStatus(true); 
            // else {
            //   setStatus(false)
            // }
        }
        } catch (error) {
          console.error('Error fetching hotel details:', error);
        }
      };
  
      fetchHotelDetails();
    }, [hotel]);

    const updateStatus = async () => {
      const newStatus = status ? 'pending' : 'completed';
      
      try {
          const response = await axios.patch(`${API_ENDPOINTS.API}/signup/onboard?hotelId=${location.state.hotel}`, 
              {
                  status: newStatus
              }
          );

          if (response.data.success) {
              setStatus(newStatus === 'completed'); // Update status based on the new value
          }
      } catch (error) {
          console.error('Error updating status:', error);
      }
  };
  
    if (!details) {
      return <div>Loading...</div>;
    }

  return (
     <div className="hotel-details">
      
      <h2>Hotel Details</h2>
      <p>ID: {details.hotel._id}</p>
      <p>Hotel Name: {details.hotel.hotelName}</p>
      <p>Email: {details.hotel.hotelEmail}</p>
      <p>Mobile Number: {details.user.mobileNumber}</p>
      <p>Aadhar No: {details.user.aadharNo}</p>
      <p>Pan No: {details.user.panNumber}</p>
      <p>Aadhar Url: <a href={details.user.aadharUrl} target="_blank" rel="noopener noreferrer">View</a></p>
      <p>Pan Url: <a href={details.user.panUrl} target="_blank" rel="noopener noreferrer">View</a></p>
      <p>Business Pan Url: <a href={details.hotel.businessPanUrl} target="_blank" rel="noopener noreferrer">View</a></p>
      <p>Business Gst Url: <a href={details.hotel.gstinUrl} target="_blank" rel="noopener noreferrer">View</a>     </p>
      <p>Hotel Website: {details.hotel.hotelWebsite}</p>
      <p>Hotel Adress: {details.hotel.hotelName} {details.hotel.city} {details.hotel.state} {details.hotel.hotelPincode} </p>
     <div style={{display:'flex'}}>
      <p>Onbording : </p>   
        <button onClick={updateStatus}> {status ? 'Done' : 'Pending'}     </button> 
        </div> 
       </div>
  )
}

export default HotelOnbording
