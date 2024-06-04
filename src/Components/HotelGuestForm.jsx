import React, { useState, useEffect } from 'react'
import "../styles/HotelGuestForm.css"
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';
import axios from 'axios';
import API_ENDPOINTS from '../confi.js';
import { useLocation } from 'react-router-dom';


const HotelGuestForm = () => {

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [userNotFound, setUserNotFound] = useState('')
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

  const [Aadress, setAadress] = useState('');
  const [Adult, setAdult] = useState('');
  const [Child, setChild] = useState('');
  const [roomPrice, setroomPrice] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: '', phone: '', email: '', aadharNumber: '', gender: '', age: '' });
  console.log(newGuest)

  const parseguest = parseInt(numOfGuests)
  const guestCount = Array.from({ length: parseguest }, (_, index) => index + 1)


  const location = useLocation()
  console.log(location.state)

  console.log(phone)

  useEffect(() => {
    if (location.state && location.state.roomNumber) {
      setRoomNumber(location.state.roomNumber);
    }
  }, [location.state]);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    const fetchPrice = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINTS.API}/hotel/rooms/${location.state.roomNumber}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });
        console.log(response.data);
        setroomPrice(response.data.price)
      } catch (error) {
        console.log(error);
      }
    };

    fetchPrice();
  }, [location.state]);

  const searchGuest = async (e) => {
    const inputValue = e.target.value;
    setPhone(inputValue);
    const token = sessionStorage.getItem('token');
    try {
      const response = await axios.get(`${API_ENDPOINTS.API}/guests/search?phone=${inputValue}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log(response)
      setSuggestions(response.data);
      setUserNotFound('');
    } catch (error) {
      console.error('Error fetching guest suggestions:', error);
      console.log(error.response.data.message)
      if (error.response.data.message == 'Guest not found') {
        setUserNotFound("user not availble")

      }
      setSuggestions([]);

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const response = await axios.post('', {
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
    // setSelectedGuest(guest);
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

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleNewGuestSubmit = async () => {
  
    const token = sessionStorage.getItem('token');
    // setIsModalOpen(false);
    // e.preventDefault();
    // setNewGuest({ name: '', phone: '', email: '', aadharnumber: '', gender: '' , age: ''});
    try {
      const response =  await axios.post(`${API_ENDPOINTS.API}/guests/register`, { ...newGuest }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'

        }
      })
      if(response.data.success === true){
      setGuestDetails([...guestDetails, newGuest]);
      setNewGuest({ name: '', phone: '', email: '', aadharNumber: '', gender: '' , age: ''});
      setIsModalOpen(false);
    }
    } catch (error) {
      console.log(error)
    }

  };

  const { theme } = useTheme();


  //adding room number here dynamiclly
  // useEffect(() => {
  //   if (location.state && location.state.roomNumber) {
  //     setRoomNumber(location.state.roomNumber);
  //   }
  // }, []);


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
                      <ul className="sugeestion-ul">
                        {suggestions.map((guest) => (
                          <li key={guest.id} onClick={() => handleSuggestionClick(guest)}>
                            {guest.name} - {guest.phone}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className='sugesstion buttons'>
                      {userNotFound && (<button className='suggestionbutton' onClick={openModal}>Register Guest</button>)}
                    </div>

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
                    <div className='room-price'>Room Price: {roomPrice}</div>
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="Text" value={Adult} onChange={(e) => setAdult(parseInt(e.target.value))} placeholder='Price Given ' />
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="text" value={RoomNumber} placeholder='Room Number' />
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
                <button id='btns' type="submit" onClick={handleSubmit}>Submit</button>
              </div>

            </form>
          </div>
        </div>
      </div >

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Register New Guest</h2>
            
              <div className="input-field">
                <input type="text" value={newGuest.name} onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })} placeholder='Name' />
              </div>
              <br />
              <div className="input-field">
                <input type="text" value={newGuest.phone} onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })} placeholder='Phone Number' />
              </div>
              <br />
              <div className="input-field">
                <input type="email" value={newGuest.email} onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })} placeholder='Email' />
              </div>
              <br />
              <div className="input-field">
                <input type="text" value={newGuest.aadharNumber} onChange={(e) => setNewGuest({ ...newGuest, aadharNumber: e.target.value })} placeholder='Aadhar Number' />
              </div>
              <br />
              <div className="input-field">
                <input type="text" value={newGuest.gender} onChange={(e) => setNewGuest({ ...newGuest, gender: e.target.value.toUpperCase() })} placeholder='Gender' />
              </div>
              <br />
              <div className="input-field">
                <input type="date" value={newGuest.age} onChange={(e) => setNewGuest({ ...newGuest, age: e.target.value })} placeholder='Date-of-birth' />
              </div>
              <div className="input-field">
                <button type="submit" onClick={handleNewGuestSubmit}>Save</button>
                <button type="button" onClick={closeModal}>Cancel</button>
              </div>
          </div>
        </div>
      )}


    </div >
  );
};



export default HotelGuestForm