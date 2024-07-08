import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';
import axios from 'axios';
import API_ENDPOINTS from '../confi';
import { useLocation } from 'react-router-dom';
import "../styles/CheckoutForm.css"

const CheckoutForm = () => {
  const [guestName, setGuestName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  console.log(paidAmount)
  const [balanceAmount, setBalanceAmount] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  console.log(roomNumber)
  const [paymentDone, setPaymentDone] = useState('');


  const [isLoading, setIsLoading] = useState(true);
  const [paymentOption, setPaymentOption] = useState('');
  console.log(paymentDone)
  console.log(paymentOption)
  const [paidAmountInput, setPaidAmountInput] = useState('');
  console.log(paidAmountInput)

  const location = useLocation();
  const { theme } = useTheme();

  const hotelid = location.state.hotelId;
  const bookingid = location.state.bookingId;


  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const response = await axios.get(`${API_ENDPOINTS.API}/guests/${hotelid}/bookingbyid/${bookingid}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log(response)
        // const data = response.data;
        // console.log(data)
        // const guest = response.data.booking.guestDetails[0];
        if (response.data.success == true) {
          const guest = response.data?.booking.guestDetails[0];
          console.log(guest)
          const data = response.data.booking;
          console.log(data)
         
          setGuestName(guest.firstName);
          setPaidAmount(data.deposit);
          setBalanceAmount(data.balance);
          setRoomNumber(data.RoomNumber);
          setTotalAmount(data.totelAmount);
          setPaymentOption(data.payment);
          setPaymentDone(data.payment === 'paid' ? 'Done' : 'Pending');
        }
      } catch (error) {
        console.error('Error fetching checkout details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCheckoutDetails();
  }, []);



  const submitData = async () => {
    const token = sessionStorage.getItem('token');
    try {

      const paidAmount = parseFloat(paidAmountInput);

      const payload = {
        paidAmount: paidAmount
      };

      if (paymentDone) {
        payload.payment = "paid"; // Include Payment: "paid" only if paymentDone is true
      }

      const response = await axios.put(`${API_ENDPOINTS.API}/guests/${bookingid}/bookingUpdate`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.payment == "paid") {
        fetchCheckoutDetails()
        // alert("Checkout successful");
        // setRoomNumber('');
      }
    } catch (error) {
      console.error('Error processing checkout:', error);
    }
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handlePaymentAmountChange = (e) => {
    setPaidAmountInput(e.target.value);
  };

  const handlePaymentStatusChange = (e) => {
    const newStatus = e.target.value;
    if (newStatus === 'Done') {
      setPaymentDone(newStatus);
      submitData();
    } else {
      setPaymentDone(newStatus);
    }
  };

  const handlePaymentSubmission = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.post(`${API_ENDPOINTS.API}/guests/${roomNumber}/checkout`, {
        // paymentMethod: paymentOption,
        // amount: paidAmountInput,
        // roomNumber:roomNumber
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      console.log(response)
    
      if (response.data.success) {
        setGuestName('');
        setPaidAmount('');
        setBalanceAmount('');
        setRoomNumber('');
        setTotalAmount('');
        setPaidAmountInput('')
        // setPaymentOption();
        // setPaymentDone(data.payment === 'paid' ? 'Done' : 'Pending');

        alert('checkout sucessfull')
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                <label>Room Number:</label>
                <input type='text' value={roomNumber} readOnly />
              </div>
              <div className='input-fiel'>
                <label>Total Amount:</label>
                <input type='text' value={totalAmount} readOnly />
              </div>
              <div className='input-fiel'>
                <label>Already Paid:</label>
                <input type='text' value={paidAmount} readOnly />
              </div>
              <div className='input-fiel'>
                <label>Balance Amount:</label>
                <input type='text' value={balanceAmount} readOnly />
              </div>

             

            
                <div className='input-fiel'>
                  <label>Enter Amount Paid:</label>
                  <input type='text' value={paidAmountInput} onChange={handlePaymentAmountChange} />
                </div>
           

              <div className='payment-status'>
                <label>Payment Status:</label>
                <select value={paymentDone} onChange={handlePaymentStatusChange}>
                  <option value='Pending'>Pending</option>
                  <option value='Done'>Done</option>
                </select>
              </div>

              {paymentDone && (
                <div className='payment-method'>
                  <label>Select Payment Method:</label>
                  <select value={paymentOption} onChange={handlePaymentMethodChange}>
                    <option value=''>Select</option>
                    <option value='cash'>Cash Payment</option>
                    <option value='upi'>UPI</option>
                  </select>
                </div>
              )}

              {/* {paymentOption && paidAmountInput && (
                <div className='input-fiel'>
                  <button onClick={submitData}>Pay</button>
                </div>
              )} */}

              <div className='input-fie'>
                <button onClick={handlePaymentSubmission} disabled={!paymentOption || !paidAmountInput}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
