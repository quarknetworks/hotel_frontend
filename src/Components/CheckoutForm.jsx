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
  const [balanceAmount, setBalanceAmount] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [paymentDone, setPaymentDone] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [paymentOption, setPaymentOption] = useState('');
  const [paidAmountInput, setPaidAmountInput] = useState('');

  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchCheckoutDetails = async () => {
      const token = sessionStorage.getItem('token');
      try {
        const response = await axios.get(`${API_ENDPOINTS.API}/guests/${location.state.roomNumber}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        const data = response.data.booking;
        const guest = response.data.booking.guestDetails[0];
        setGuestName(guest.name);
        setPaidAmount(data.paidAmount);
        setBalanceAmount(data.balance);
        setRoomNumber(data.RoomNumber);
        setTotalAmount(data.totalAmount);
        setPaymentDone(data.payment);
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
      const response = await axios.post(`${API_ENDPOINTS.API}/guests/${roomNumber}/checkout`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.data.success) {
        alert("Checkout successful");
        setRoomNumber('');
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
    setPaymentDone(e.target.value === 'Done');
  };

  const handlePaymentSubmission = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.post(`${API_ENDPOINTS.API}/checkout/pay`, {
        paymentMethod: paymentOption,
        amount: paidAmountInput,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      if (response.data.success) {
        setPaidAmount(paidAmountInput);
        setBalanceAmount(totalAmount - paidAmountInput);
        setPaymentDone(true);
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
              <div className='payment-status'>
                <label>Payment Status:</label>
                <select value={paymentDone ? 'Done' : 'Pending'} onChange={handlePaymentStatusChange}>
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

              {paymentOption && (
                <div className='input-fiel'>
                  <label>Enter Amount Paid:</label>
                  <input type='text' value={paidAmountInput} onChange={handlePaymentAmountChange} />
                </div>
              )}

              {paymentOption && paidAmountInput && (
                <div className='input-fiel'>
                  <button onClick={handlePaymentSubmission}>Pay</button>
                </div>
              )}

              <div className='input-field'>
                <button onClick={submitData}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
