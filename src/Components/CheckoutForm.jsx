
import React, { useState, useEffect } from 'react';
import "../styles/CheckoutForm.css";
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';
import axios from 'axios';
// import API_ENDPOINTS from '../config.js';
import API_ENDPOINTS from '../confi';

import { useLocation } from 'react-router-dom';


const CheckoutForm = () => {

  const [guestName, setGuestName] = useState('');
  // const [roomID, setRoomID] = useState('');
  // const [referenceNumber, setReferenceNumber] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  console.log(roomNumber)
  const [price, setPrice] = useState('');
  // const [paymentDone, setPaymentDone] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();


  // useEffect(() => {
  //   const fetchCheckoutDetails = async () => {
  //     const token = sessionStorage.getItem('token');
  //     try {
  //       const response = await axios.get(`${API_ENDPOINTS.API}/hotel/rooms/${location.state.roomNumber}`, {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         }
  //       });
  //       console.log(response)
  //       const data = response.data;
  // setGuestName(data.guestName);
  // setRoomID(data.roomID);
  // setReferenceNumber(data.referenceNumber);
  // setRoomNumber(data.roomNumber);
  // setPrice(data.price);
  // setPaymentDone(data.paymentDone);
  //     } catch (error) {
  //       console.error('Error fetching checkout details:', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchCheckoutDetails();
  // }, []);


  const submitData = async () => {

    const token = sessionStorage.getItem('token');
    try {
      console.log(token)
      const response = await axios.post(`${API_ENDPOINTS.API}/guests/${roomNumber}/checkout`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response)
      // if (response.data.success) {
      //   setPaymentDone(true);

      // }
      if (response.data.success == true) {
        alert("checkout succesfull")
        setRoomNumber('')
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  // const handlePayment = async () => {
  //   const token = sessionStorage.getItem('token');
  //   try {
  //     const response = await axios.post(`${API_ENDPOINTS.API}/checkout/pay`, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       }
  //     });
  //     if (response.data.success) {
  //       setPaymentDone(true);
  //     }
  //   } catch (error) {
  //     console.error('Error processing payment:', error);
  //   }
  // };

  // const handleCheckout = async () => {
  //   const token = sessionStorage.getItem('token');
  //   try {
  //     const response = await axios.post(`${API_ENDPOINTS.API}/checkout/complete`, {
  //       referenceNumber,
  //     }, {
  //       headers: {
  //         'Authorization': `Bearer ${token}`,
  //       }
  //     });
  //     if (response.data.success) {
  //       alert("Checkout completed successfully");
  //     }
  //   } catch (error) {
  //     console.error('Error completing checkout:', error);
  //   }
  // };

  const { theme } = useTheme();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }


  return (
    <div>
      <Navbar />
      <div id='maincomponent' className={`themed-component ${theme}`}> 
        <div id='checkout-containe' className={`themed-component ${theme}`}>
          <div className='checkout-form'>
            <h1>Checkout Details</h1>
            <div className='form-grou'>
              <div className='input-fiel'>
                <label>Guest Name:</label>
                <input type='text' value={guestName} readOnly />
              </div>
              <div className='input-fiel'>
                <label>Room ID:</label>
                <input type='text' readOnly />
              </div>
              <div className='input-fiel'>
                <label>Reference Number:</label>
                <input type='text' readOnly />
              </div>
              <div className='input-fiel'>
                <label>Room Number:</label>
                <input type='text' value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
              </div>
              <div className='input-fiel'>
                <label>Price:</label>
                <input type='text' value={price} />
              </div>
              <div className='input-fiel'>
                <label>Payment Status:</label>
                <input type='text' readOnly />
              </div>
              {/* {!paymentDone ? (
              <div className='input-fiel'>
                <button onClick={handlePayment}>Make Payment</button>
              </div>
            ) : (
              <div className='input-fiel'>
                <button onClick={handleCheckout}>Complete Checkout</button>
              </div>
            )} */}
              <div className='input-fiel' >
                <button onClick={submitData}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >

  )
}

export default CheckoutForm