import React, { useState } from 'react'
import "../styles/HotelGuestForm.css"
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';
import axios from 'axios';
import API_ENDPOINTS from '../confi.js';


const HotelGuestForm = () => {

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numOfGuests, setNumOfGuests] = useState();
  const [RoomNumber, setRoomNumber] = useState();
  const [GuestDetails, setGuestDetails] = useState({
    GuestCount: '',
  });
  const [guestDetails, setguestDetails] = useState([
    { aadharnumber: "", aadharphoto: null, name: '' }
  ]);
  console.log(guestDetails)
  const [Data, setData] = useState([
    { id: 123456789, name: 'John' },
    { id: 234568, name: 'Alice' },
    { id: 3456789, name: 'Bob' },
    { id: 4, name: 'Charlie' },
    { id: 5, name: 'Emma' },
    { id: 6, name: 'David' },
    { id: 7, name: 'Eva' },
    { id: 8, name: 'Frank' },
    { id: 9, name: 'Grace' },
    { id: 10, name: 'Henry' }
  ]);
  const [Aadress, setAadress] = useState('');
  const [Adult, setAdult] = useState('');
  const [Child, setChild] = useState('');

  const parseguest = parseInt(numOfGuests)
  const guestCount = Array.from({ length: parseguest }, (_, index) => index + 1)




  console.log(phone)

  const searchGuest = async (e) => {
    const inputValue = e.target.value;
    setPhone(inputValue);
    setShowSuggestions(true);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${API_ENDPOINTS.API}/guests/search?phone=${inputValue}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching guest suggestions:', error);
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('https://f8fc-182-69-182-25./guest', {
        firstName,
        email,

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

  const handleSuggestionClick = (guest) => {
    setSelectedGuest(guest);
    setSuggestions([]);
    setPhone(guest.phone); // Optionally set the phone input to the selected guest's phone
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
          <h1 >Hotel Guest Form</h1>
          <div className='form-group'>
            <form onSubmit={handleSubmit}>
              <div className='input-div'>
                <div>
                  <div className="input-field">
                    <input type="text" value={phone} onChange={searchGuest} placeholder='Phone Number' />
                    {suggestions.length > 0 && (
                      <ul>
                        {suggestions.map((guest) => (
                          <li key={guest.id} onClick={() => handleSuggestionClick(guest)}>
                            {guest.name} - {guest.phone}
                          </li>
                        ))}
                      </ul>
                    )}
                    {selectedGuest && (
                      <div>
                        <h3>Selected Guest</h3>
                        <p>Name: {selectedGuest.name}</p>
                        <p>Phone: {selectedGuest.phone}</p>
                        {/* Additional guest details */}
                      </div>
                    )}
                       <button onClick={() => setShowNewForm(true)}>Add New Guest</button>
                  </div>

                  <br />
                  <div className="input-field">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
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
                  <br />
                  <div className="input-field">
                    <input type="text" value={RoomNumber} onChange={(e) => setEmail(e.target.value)} placeholder='Room Number' />
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="number" value={numOfGuests} onChange={(e) => setNumOfGuests(parseInt(e.target.value))} placeholder='number of guest' />
                  </div>
                </div>
                <div>

                  {guestCount.map((guest, index) => (
                    <div key={guest}>

                      <div className="input-field">
                        <input type="text" placeholder='Aadhar Number'
                          value={guestDetails[index]?.aadharnumber || ""}
                          onChange={(event) => handleRoomChange(index, 'aadharnumber', event.target.value)}
                        />
                      </div>
                      <br />
                      <div className='input-field'>
                        <input type="text" placeholder='Enter Name'
                          value={guestDetails[index]?.name || ""}
                          onChange={(event) => handleRoomChange(index, 'name', event.target.value)}
                        />
                      </div>
                      <br />
                      <div className='input-field'>
                        <input type="text" placeholder='Enter gender' />
                        {/* <select name="gender" id="gender">
                        <option value="">male</option>
                        <option value="">female</option>
                        <option value="">Transgender</option>
                      </select> */}
                      </div>
                      <br />
                      <div className="input-field">
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