import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';
import axios from 'axios';
import API_ENDPOINTS from '../confi';
import { useLocation } from 'react-router-dom';
import "../styles/CheckoutForm.css"


// const Bill = React.forwardRef(({ billDetails }, ref) => (
//   <div ref={ref} id="bill-container" className="bill">
//     <h2>Bill</h2>
//     <p>GST Number: {billDetails.gst}</p>
//     <p>Room Number: {billDetails.roomNumber}</p>
//     <p>Total Amount: {billDetails.totelAmount}</p>
//     <p>Services: {billDetails.services.join(', ')}</p>
//     <p>Amount Paid: {billDetails.totelAmount}</p>
//     <p>Payment Status: {billDetails.payment}</p>
//     <p>price: {billDetails.priceday}</p>
//     <p>Billing Name: {billDetails.guestDetails.firstName}</p>
//     <p>Phone Number: {billDetails.phone}</p>
//   </div>
// ));


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
  const [billDetails, setBillDetails] = useState();
  console.log(billDetails)
  console.log(paidAmountInput)

  const location = useLocation();
  const { theme } = useTheme();
  // const billRef = useRef();

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
      console.log(response)
      setBillDetails({
        gst: response.data.Gst,
        roomNumber: response.data.RoomNumber,
        totelAmount: response.data.totelAmount,
        // services: response.data.services || [], 
        payment: response.data.payment,
        priceday: response.data.priceday,
        guestDetails: response.data.guestDetails[0],  // Assuming it's an array
        phone: response.data.phone,
      });

      if (response.data.payment == "paid") {
        // setBillDetails(response.data);

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


  const handlePrintBill = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
      <head>
        <title>Bill</title>
        <style>
              body {
        font-family: Arial, sans-serif;
        background-color: #f9f9f9;
        margin: 0;
        padding: 20px;
      }
      .bill {
        background-color: #fff;
        color: #333;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        max-width: 400px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .bill h2 {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
        color: #4CAF50;
      }
      .bill p {
        font-size: 16px;
        line-height: 1.5;
        margin: 8px 0;
      }
      .bill p strong {
        font-weight: bold;
      }
      .bill p:last-child {
        margin-top: 20px;
        font-size: 18px;
        text-align: right;
      }
        </style>
      </head>
      <body>
        <div class="bill">
          <h2>Bill</h2>
          <p>GST Percentage: </strong> ${billDetails.gst}</p>
           <p>Billing Name: </strong> ${billDetails.guestDetails.firstName}</p>
          <p>Room Number: </strong> ${billDetails.roomNumber}</p>
          <p>Amount Paid: </strong> ${billDetails.totelAmount}</p>
          <p>Payment Status:</strong>  ${billDetails.payment}</p>  
          <p>Phone Number:</strong> ${billDetails.phone}</p>
          <p>Price: </strong> ${billDetails.priceday}</p>
           <p>Total Amount:</strong>  ${billDetails.totelAmount}</p>
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
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
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div className='input-fie'>
                  <button onClick={handlePaymentSubmission} disabled={!paymentOption || !paidAmountInput}>Submit</button>
                </div>
                {billDetails && (
                  <div className='input-fie'>
                    {/* <Bill billDetails={billDetails} /> */}
                    <button onClick={handlePrintBill}>Print Bill</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CheckoutForm;
