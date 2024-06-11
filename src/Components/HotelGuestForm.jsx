import React, { useState, useEffect } from 'react';
import "../styles/HotelGuestForm.css";
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';
import axios from 'axios';
import API_ENDPOINTS from '../confi.js';
import { useLocation } from 'react-router-dom';

const HotelGuestForm = () => {
  // const [firstName, setFirstName] = useState('');
  // console.log(firstName)
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numOfGuests, setNumOfGuests] = useState(1);
  const [RoomNumber, setRoomNumber] = useState();
  const [Aadress, setAadress] = useState('');
  const [PriceGiven, setPriceGiven] = useState('');
  const [roomPrice, setRoomPrice] = useState('');
  const [guestDetails, setGuestDetails] = useState([
    { aadharnumber: "", aadharphoto: null, name: '', gender: '',documentUrl: '' }
  ]);
  console.log(guestDetails)

  console.log("guest", guestDetails)
  const [suggestions, setSuggestions] = useState([]);
  const [userNotFound, setUserNotFound] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: '', phone: '', email: '', aadharNumber: '', gender: '', DOB: '',  });
  console.log(newGuest)
  const [errors, setErrors] = useState({});
  const [userid, setuserid] = useState('')
  console.log(userid)
  const location = useLocation();

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
        setRoomPrice(response.data.price);
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
      // setuserid(response)
    } catch (error) {
      if (error.response.data.message === 'Guest not found') {
        setUserNotFound("user not available");
      }
      setSuggestions([]);
    }
  };

  const handleAadharPhotoChange = async (e , index) => {
    // e.preventDefault();
     
    const  file = e.target.files[0]
    const fileType = getFileType(file);
    if (file && (fileType === 'jpg' || fileType === 'png' || fileType === 'pdf' || fileType === 'jpeg')){
    try {
      const token = sessionStorage.getItem('token');
      // const aadharPhoto = guestDetails[0].aadharphoto;
      // const isPdf = aadharPhoto && aadharPhoto.type === 'application/pdf';

      const response = await axios.post(`${API_ENDPOINTS.API}/upload/url?guestId=${userid}`, {
        // fileType: isPdf ? 'pdf' : 'image'
        fileType , fileName : 'aadhar'

      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': '*',
        },
      });

      console.log(response.data)

      const { upload_url, document_url } = response.data[0];

      console.log(upload_url)
      console.log(document_url)

      const formData = new FormData();
      formData.append('file', file);

      if (!upload_url) {
        throw new Error("Upload URL is undefined.");
      }

      const headers = {
        'Content-Type': file.type
      };
      // const formData = new FormData();
      // formData.append('file', aadharPhoto);

      if (fileType === 'pdf') {
        // Upload PDF file
        await axios.put(upload_url, file, { headers });
      } else {
        // Upload binary data for images
        const reader = new FileReader();
        reader.onloadend = async () => {
          const arrayBuffer = reader.result;
          await axios.put(upload_url, arrayBuffer, { headers });
        };
        reader.readAsArrayBuffer(file);
      }

      setGuestDetails(prevDetails => {
        const updatedDetails = [...prevDetails];
        updatedDetails[index].documentUrl = document_url;
        return updatedDetails;
      });

      console.log("File uploaded successfully")
    

   
    } catch (error) {
      console.log("error", error);
    }
  } else {
    console.log('db')
  }
  };

  const getFileType = (file) => {
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();
    return fileExtension;
};

  const handleSubmit =  async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('token');

    const bookingData = {
      email,
      phone,
      checkInDate,
      checkOutDate,
      numOfGuests,
      RoomNumber,
      Aadress,
      PriceGiven,
      guestDetails: guestDetails.map(guest => ({
        aadharnumber: guest.aadharnumber,
        name: guest.name,
        gender: guest.gender,
        documentUrl: guest.documentUrl
      }))
    };

    try {
      await axios.post(`${API_ENDPOINTS.API}/guests/booking`, bookingData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setEmail('');
      setPhone('');
      setCheckInDate('');
      setCheckOutDate('');
      setNumOfGuests(1);
      setAadress('');
      setPriceGiven('');
      setGuestDetails([{ aadharnumber: "", aadharphoto: null, name: '', gender: '', documentUrl: '' }]);

      console.log("Booking data submitted successfully");
    } catch (error) {
      console.log("Error submitting booking data:", error);
    }
  }

  const handleRoomChange = (index, field, value) => {
    setGuestDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index] = {
        ...updatedDetails[index],
        [field]: value,
      };
      return updatedDetails;
    });
  };

  const handleSuggestionClick = (guest) => {
    setSuggestions([]);
    setPhone(guest.phone);
    setEmail(guest.email);
    setuserid(guest._id)
    console.log(guest)

    // Update guestDetails for index 0 with fetched guest data
    setGuestDetails(prevDetails => {
      const updatedDetails = [...prevDetails];
      updatedDetails[0] = {
        aadharnumber: guest.aadharNumber || '',
        name: guest.name || '',
        gender: guest.gender || ''
      };
      return updatedDetails;
    });
  };

  // const handleAadharPhotoChange = (index, file) => {
  // setGuestDetails((prevGuests) => {
  //   const updatedGuests = [...prevGuests];
  //   updatedGuests[index] = {
  //     ...updatedGuests[index],
  //     aadharphoto: file,
  //   };
  //   return updatedGuests;
  // });
  // };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validateNewGuest = () => {
    const newErrors = {};

    if (!newGuest.name || !/^[a-zA-Z\s]+$/.test(newGuest.name)) {
      newErrors.name = "Name is required and should only contain letters.";
    }
    if (!newGuest.phone || !/^\d{10}$/.test(newGuest.phone)) {
      newErrors.phone = "Phone number is required and should be a valid 10-digit number.";
    }
    if (newGuest.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newGuest.email)) {
      newErrors.email = "Email should be valid.";
    }
    if (newGuest.aadharNumber && !/^\d{12}$/.test(newGuest.aadharNumber)) {
      newErrors.aadharNumber = "Aadhar number should be a valid 12-digit number.";
    }
    if (!newGuest.gender || !["MALE", "FEMALE", "OTHER"].includes(newGuest.gender.toUpperCase())) {
      newErrors.gender = "Gender is required and should be either 'MALE', 'FEMALE', or 'OTHER'.";
    }
    if (!newGuest.DOB) {
      newErrors.DOB = "Date of birth is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNewGuestSubmit = async () => {
    if (!validateNewGuest()) {
      return;
    }

    const token = sessionStorage.getItem('token');

    try {
      const response = await axios.post(`${API_ENDPOINTS.API}/guests/register`, { ...newGuest }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success === true) {
        setGuestDetails(prevDetails => {
          const updatedDetails = [...prevDetails];
          updatedDetails[0] = {
            aadharnumber: newGuest.aadharNumber,
            name: newGuest.name,
            gender: newGuest.gender,
            aadharphoto: null // Ensure aadharphoto is reset or left as it was
          };
          return updatedDetails;
        });
        setNewGuest({ name: '', phone: '', email: '', aadharNumber: '', gender: '', DOB: '' });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNumOfGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumOfGuests(value);
    setGuestDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      while (updatedDetails.length < value) {
        updatedDetails.push({ aadharnumber: "", aadharphoto: null, name: '', gender: '' });
      }
      while (updatedDetails.length > value) {
        updatedDetails.pop();
      }
      return updatedDetails;
    });
    // handleFileUpload(file, index);
  };

  const { theme } = useTheme();

  return (
    <div >
      <Navbar />
      <div id='form-container' className={`themed-component ${theme}`}>
        <div className='form-seconfcontainer'>
          <h1>Hotel Guest Form</h1>
          <div className='form-group'>
            <form onSubmit={handleSubmit}>
              <div className='input-div'>
                <div>
                  <div className="input-field">
                    <input type="text" value={phone} onChange={searchGuest} placeholder='Phone Number' />
                    {suggestions.length > 0 && (
                      <ul className="suggestion-ul">
                        {suggestions.map((guest) => (
                          <li key={guest.id} onClick={() => handleSuggestionClick(guest)}>
                            {guest.name} - {guest.phone}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className='suggestion-buttons'>
                      {userNotFound && (<button className='suggestion-button' type='button' onClick={openModal}>Register Guest</button>)}
                    </div>
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} placeholder='Check-in Date' />
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} placeholder='Check-out Date' />
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="number" value={numOfGuests} onChange={handleNumOfGuestsChange} placeholder='Number of Guests' />
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="text" value={Aadress} onChange={(e) => setAadress(e.target.value)} placeholder='Address' />
                  </div>
                  <br />
                  <div className="input-field">
                    {/* <input type="text" value={RoomNumber} placeholder='Room Number' /> */}
                    <div className='room-price'>Room Number: {RoomNumber}</div>
                  </div>
                  <br />
                  <div className="input-field">
                    <div className='room-price'>Room Price: {roomPrice}</div>
                  </div>
                  <br />
                  <div className="input-field">
                    <input type="Text" value={PriceGiven} onChange={(e) => setPriceGiven(e.target.value)} placeholder='Price Given ' />
                  </div>
                  <div className="input-field">
                    <button type="submit">Submit</button>
                  </div>
                </div>
              </div>
            </form>
            <div>
              {guestDetails.map((guest, index) => (
                <div key={index} >
                  <div className='input-field'>
                    <input
                      type='text'
                      value={guest.name}
                      onChange={(e) => handleRoomChange(index, 'name', e.target.value)}
                      placeholder='Guest Name'
                    />
                  </div>
                  <br />
                  <div className='input-field'>
                    <input
                      type='text'
                      value={guest.aadharnumber}
                      onChange={(e) => handleRoomChange(index, 'aadharnumber', e.target.value)}
                      placeholder='Aadhar Number'
                    />
                  </div>
                  <br />
                  <div className='input-field'>
                    <input
                      type='text'
                      value={guest.gender}
                      onChange={(e) => handleRoomChange(index, 'gender', e.target.value)}
                      placeholder='Gender'
                    />
                  </div>
                  <br />
                  <div className='input-field'>
                    <input
                      type='file'
                      onChange={(e) => handleAadharPhotoChange(e, index)}
                      placeholder='Aadhar Photo'
                    />
                  </div>
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>Register New Guest</h2>
            <div className='input-field'>
              <input
                type='text'
                value={newGuest.name}
                onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                placeholder='Name'
              />
              {errors.name && <p className='error'>{errors.name}</p>}
            </div>
            <br />
            <div className='input-field'>
              <input
                type='text'
                value={newGuest.phone}
                onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                placeholder='Phone'
              />
              {errors.phone && <p className='error'>{errors.phone}</p>}
            </div>
            <br />
            <div className='input-field'>
              <input
                type='email'
                value={newGuest.email}
                onChange={(e) => setNewGuest({ ...newGuest, email: e.target.value })}
                placeholder='Email'
              />
              {errors.email && <p className='error'>{errors.email}</p>}
            </div>
            <br />
            <div className='input-field'>
              <input
                type='text'
                value={newGuest.aadharNumber}
                onChange={(e) => setNewGuest({ ...newGuest, aadharNumber: e.target.value })}
                placeholder='Aadhar Number'
              />
              {errors.aadharNumber && <p className='error'>{errors.aadharNumber}</p>}
            </div>
            <br />
            <div className='input-field'>
              <input
                type='text'
                value={newGuest.gender}
                onChange={(e) => setNewGuest({ ...newGuest, gender: e.target.value.toUpperCase() })}
                placeholder='Gender'
              />
              {errors.gender && <p className='error'>{errors.gender}</p>}
            </div>
            <br />
            <div className='input-field'>
              <input
                type='date'
                value={newGuest.DOB}
                onChange={(e) => setNewGuest({ ...newGuest, DOB: e.target.value })}

              />
              {errors.DOB && <p className='error'>{errors.DOB}</p>}
            </div>
            <br />
            <button onClick={handleNewGuestSubmit}>Register</button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelGuestForm;
