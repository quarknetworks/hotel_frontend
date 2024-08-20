import React, { useState } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_ENDPOINTS from '../confi.js';

const RoomCollection = ({ token, setpage }) => {
  const style = {
    marginTop: '40px',
    overflow: 'scroll',
    width: '100vw',
    height: '40vh',
  };

  sessionStorage.setItem('token', token);

  const navigate = useNavigate();
  const [totalRoom, setTotalRoom] = useState(0); // Initialize as 0
  const [amenity, setAmenity] = useState({
    rooms: Array.from({ length: totalRoom }, () => ({
      roomNumber: '',
      roomType: '',
      amenities: [],
    })),
  });

  const options = [
    { value: 'Standard', label: 'Standard' },
    { value: 'Economy', label: 'Economy' },
    { value: 'Executive', label: 'Executive' },
    { value: 'Double', label: 'Double' },
    { value: 'Suite', label: 'Suite' },
    { value: 'Villa', label: 'Villa' },
  ];

  const Amenity = [
    { value: 'A/C', label: 'A/C' },
    { value: 'Non A/C', label: 'Non A/C' },
    { value: 'Wifi', label: 'Wifi' },
    { value: 'Parking', label: 'Parking' },
    { value: 'Pool', label: 'Pool' },
    { value: 'Jacuzzi', label: 'Jacuzzi' },
    { value: 'Balcony', label: 'Balcony' },
    { value: 'Mountain View', label: 'Mountain View' },
  ];

  const Multidropdown = makeAnimated();

  const handleRoomChange = (index, field, value) => {
    setAmenity(prevState => {
      const updatedRooms = [...prevState.rooms];
      updatedRooms[index] = {
        ...updatedRooms[index],
        [field]: value,
      };
      return { ...prevState, rooms: updatedRooms };
    });
  };

  const handleTotalRoomChange = (e) => {
    const roomCount = parseInt(e.target.value, 10);
    setTotalRoom(roomCount);
    setAmenity({
      rooms: Array.from({ length: roomCount }, () => ({
        roomNumber: '',
        roomType: '',
        amenities: [],
      })),
    });
  };

  const apiCall = async () => {
    try {
      const result = await axios.post(`${API_ENDPOINTS.API}/signup/room`, amenity, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (result.data.success) {
        setpage(0);
        navigate('/thankyoupage');
        alert("Rooms added successfully");
      } else {
        console.log('API call failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const customStyles = {
    menuList: (provided) => ({
      ...provided,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    }),
    multiValue: (provided) => ({
      ...provided,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      whiteSpace: 'nowrap',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      display: 'flex',
      alignItems: 'center',
    }),
  };

  return (
    <div>
      <div>
      <input
            type="text"
            placeholder="Enter total rooms"
            onChange={handleTotalRoomChange}
          />
        <div style={style}>
         
          {amenity.rooms.map((room, index) => (
            <div key={index} style={{ display: 'flex', gap: '30px', marginBottom: '10px' }}>
              <div>{index + 1}</div>
              <input
                type="text"
                placeholder="Room Number"
                style={{ width: '7rem', padding: '5px' }}
                value={room.roomNumber}
                onChange={(event) => handleRoomChange(index, 'roomNumber', event.target.value)}
              />
              <div>
                <Select
                  options={options}
                  onChange={(selectedOption) => handleRoomChange(index, 'roomType', selectedOption.value)}
                />
              </div>
              <div>
                <Select
                  closeMenuOnSelect={false}
                  components={Multidropdown}
                  styles={customStyles}
                  isMulti
                  options={Amenity}
                  onChange={(selectedOptions) => handleRoomChange(index, 'amenities', selectedOptions.map(option => option.value))}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="form-groups">
        <button type="submit" onClick={apiCall}>Submit</button>
      </div>
    </div>
  );
}

export default RoomCollection;
