import React, { useState } from 'react'
import "../styles/HotelGuestForm.css"
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';
import axios from 'axios';


const HotelGuestForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numOfGuests, setNumOfGuests] = useState();
  const [GuestDetails, setGuestDetails] = useState({
    GuestCount: '',
  });
  const [guestDetails, setguestDetails] = useState([
    { aadharnumber: "", aadharphoto: null } // Initialize with one guest
  ]);
  console.log(guestDetails)

  const [Aadress, setAadress] = useState('');
  const [Adult, setAdult] = useState('');
  const [Child, setChild] = useState('');

  const parseguest = parseInt(numOfGuests)
  const guestCount = Array.from({ length: parseguest }, (_, index) => index + 1)




  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('https://f8fc-182-69-182-25.ngrok-free.app/guest', {
        firstName,
        lastName,
        email,
        phone,
        checkInDate,
        checkOutDate,
        numOfGuests,

        Aadress,
        Adult,
        Child,

      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      });
      const userdata = response.data;
      console.log(userdata);
      console.log('form submited', Response.data);

      // reset foam here 

      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCheckInDate('');
      setCheckOutDate('');
      setNumOfGuests('');
      setAadress('');
      setAdult('');
      setChild('');

    } catch (error) {
      console.log("error", error)
    }

  };

  const handleAadharNumberChange = (event, index) => {
    const newGuestDetails = [...guestDetails];
    newGuestDetails[index].aadharnumber = event.target.value;
    setGuestDetails(newGuestDetails);
    // const { value } = event.target;
    // const stringValue = value;

    // setguestDetails(prevGuests => {
    //   const updatedGuests = [...prevGuests];
    //   updatedGuests[index] = {
    //     ...updatedGuests[index],
    //     aadharnumber: (value)
    //   };
    //   return updatedGuests;
    // });
  };

  const handleRoomChange = (index, field, value) => {
    setguestDetails((prevFormData) => {
      const updatedAadhar = [...prevFormData];
      updatedAadhar[index] = {
        ...updatedAadhar[index],
        aadharnumber: value,
      };

      return updatedAadhar


    });
  };


  const handleAadharPhotoChange = (index, file) => {
    setGuestDetails((prevGuests) => {
      const updatedGuests = [...prevGuests];
      updatedGuests[index] = {
        ...updatedGuests[index],
        aadharphoto: file,
      };

      return updatedGuests;
    });
  };

  const { theme } = useTheme();


  return (
    <div >
      <Navbar />
      <div id='form-container' className={`themed-component ${theme}`}>
        <div className='form-seconfcontainer'>
          <h2 >Hotel Guest Form</h2>
          <div className='form-group'>
            <form onSubmit={handleSubmit}>
              <div className='input-div'>
                <div>
                  <div className="input-field">
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder='First Name' />
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last Name' />
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                  </div>

                  <br />
                  <div className="input-field">
                    <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter Number' />
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="text" value={Aadress} onChange={(e) => setAadress(e.target.value)} placeholder='Enter Aadress' />
                  </div>
                  <br />
                  <div className="input-field">
                    {/* <input type="text" value={Child} onChange={(e) => setChild(parseInt(e.target.value))} placeholder='How many Child' /> */}
                    <div className='room-price'>Room Price: $100</div>
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="Text" value={Adult} onChange={(e) => setAdult(parseInt(e.target.value))} placeholder='Price Given ' />
                  </div>
                </div>
                <div>
                  {/* <br /> */}
                  <div className="input-field">
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Room Number' />
                  </div>
                  <br />
                  <div className="input-field">

                    <input type="number" value={numOfGuests} onChange={(e) => setNumOfGuests(parseInt(e.target.value))} placeholder='number of guest' />
                  </div>
                  <br />
                  {guestCount.map((guest, index) => (
                    <div key={guest}>

                      <div className="input-field">
                        <input type="text" placeholder='Aadhar Number'
                          value={guestDetails[index]?.aadharnumber || ""}
                          onChange={(event) => handleRoomChange(index, 'aadharnumber', event.target.value)}
                        />
                      </div>
                      <br />
                      <div className="input-field">
                        {/* <label htmlFor="">Upload Aadhar</label> */}
                        <input type="file" placeholder='upload Aadhar'
                          onChange={(event) => handleAadharPhotoChange(index, event.target.files)}
                        />
                      </div>

                    </div>
                  ))}
                  <br />
                </div>
              </div>
              <br />
              <div className="input-field">
                <button type="submit" onClick={handleSubmit}>Submit</button>
              </div>

            </form>
          </div>
        </div>
      </div >
    </div >
  );
};



export default HotelGuestForm