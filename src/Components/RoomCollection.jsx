import React, { useState } from 'react'
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_ENDPOINTS from '../confi.js';


const RoomCollection = ({ totalRoom, settotalRoom, token, setpage }) => {

  const style = {
    marginTop: '40px',
    overflow: 'scroll',
    width: '100vw',
    height: '40vh',
    // margin: '10px'
    // backgroundColor: '#757de8'
  };


  const navigate = useNavigate()

  const Room = parseInt(totalRoom.TotalRooms, 10);
  const myarray = Array.from({ length: Room }, (_, index) => index + 1);


  const options = [
    { value: 'Standard', label: 'Standard' },
    { value: 'Economy', label: 'Economy' },
    { value: 'Excutive', label: 'Excutive' },
    { value: 'Double', label: 'Double' },
    { value: 'Suite', label: 'Suite' },
    { value: 'Villa', label: 'Villa' },
  ];
  const Amenity = [
    { value: 'A/C', label: 'A/C' },
    { value: 'Non A/C', label: 'Non A/C' },
    { value: 'Wifi', label: 'Wifi' },
    { value: 'parking', label: 'parking' },
    { value: 'Pool', label: 'Pool' },
    { value: 'Jacuzi', label: 'Jacuzi' },
    { value: 'Balcony', label: 'Balcony' },
    { value: 'Moutain View', label: 'Mountain view' },
  ];
  const Multidropdown = makeAnimated();

  const [amenity, setAmenity] = useState({
    rooms: [
      {
        roomNumber: '',
        roomType: '',
        amenities: []
      }
    ]
  });


  const [roomtoken, setroomtoken] = useState('')

  console.log(roomtoken)



  const handleRoomChange = (index, field, value) => {
    setAmenity(prevState => {
      const updatedRooms = [...prevState.rooms]; // Create a copy of the room array
      updatedRooms[index] = {
        ...updatedRooms[index],
        [field]: value,
      };
      return { ...prevState, rooms: updatedRooms }; // Update the state with the new room array
    });
  };

  const checlistHotelApi = () => {
    axios.post('http://localhost:8080/hotelonboard'), { ...roomtoken }
  }

  const apiCall = async () => {

    await axios.post(`${API_ENDPOINTS.API}/room`, { ...amenity }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    })
      .then(result => {

        if (result.data.success == true) {
          setroomtoken(result.data.newToken)
          navigate('/thankyoupage');
          return
          // checlistHotelApi();

        } else {
          console.log('api failed')
          return Promise.reject('API call failed')
        }
      })
      .then(() => {

        alert("Signup Added Succesfully")

        setpage(0)
      })

      .catch(err => console.log(err))
  }

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
        <div style={style}>
          {myarray.map((RoomNumber, index) => (

            <div key={RoomNumber} style={{ display: 'flex', gap: '30px', }} >
              <div>{index + 1}</div>
              <input type="text" placeholder='Room Number' style={{ width: '7rem', padding: '5px', marginBottom: '10px' }}
                // onChange={(event)=> 
                // setamenity({...amenity, roomNumber:event.target.value})}

                onChange={(event) => handleRoomChange(index, 'roomNumber', event.target.value)}

              />
              <div style={{ marginBottom: '10px' }} >
                <Select
                  options={options}
                 
                  // value={options.find(option => option.value === totalRoom.rooms[index]?.roomType)}
                  // onChange={(selectedOption) => handleRoomChange(index, 'roomType', selectedOption.value.toString())}

                  onChange={(selectedOption) => handleRoomChange(index, 'roomType', selectedOption.value)}

                />
              </div >
              <div style={{}}  >
                <Select style={{ marginBottom: '50px', }}
                  closeMenuOnSelect={false}
                  components={Multidropdown}
                  styles={customStyles}
                  isMulti
                  options={Amenity}

                  // value={Amenity.filter(option => totalRoom.rooms[index]?.amenities?.includes(option.value))}

                  onChange={(selectedOptions) => handleRoomChange(index, 'amenities', selectedOptions.map(option => option.value))}


                />
              </div>

            </div>

          )

          )}
        </div>
      </div>

      <div className="form-groups">
        <button type="submit" onClick={apiCall} >Submit</button>
      </div>
    </div>
  )
}

export default RoomCollection;