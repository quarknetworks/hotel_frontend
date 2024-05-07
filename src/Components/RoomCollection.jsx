import React, { useState } from 'react'
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RoomCollection = ({totalRoom, settotalRoom}) => {


  const style = {
    marginTop: '40px',
    overflowy: 'scroll',
    width: '100vw',
    height: '40vh',
    // backgroundColor: '#757de8'
};

  // const [totalroom, settotalroom] = useState('')

  // console.log(totalRoom.TotalRooms)

  

  const [roomsData, setRoomsData] = useState([]);
  const [amenity, setamenity] = useState({

    room:[{
      roomNumber: '',
      roomType: '',
      amenities:[]
      }
      ]
  })

  console.log(amenity)

  console.log(roomsData)

  const Room = parseInt(totalRoom.TotalRooms, 10);
  const myarray = Array.from({ length: Room }, (_, index) => index + 1);


  const options = [
    { value: 'Standard', label: 'Standard' },
    { value: 'Economy', label: 'Economy' },
    { value: 'Delux', label: 'Delux' }
  ];
  const Amenity = [
    { value: 'A/C', label: 'A/C' },
    { value: 'Non A/C', label: 'Non A/C' },
    { value: 'Wifi', label: 'Wifi' },
    { value: 'parking', label: 'parking' },
  ];
  const Multidropdown = makeAnimated();


  const apiCall = () => {

    axios.post(`${process.env.REACT_APP_SECRET_KEY}/signup/room`, {  room: amenity.room  },{
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*', 
      },
    })
      .then(result => {
        console.log(result)
        if (result.status === 201) {  
            ;
        } else {
          console.log('api failed')
        }
      })

      .catch(err => console.log(err))
  }




  const handleRoomChange = (index, field, value) => {
    const updatedRoomsData = {...amenity};
    updatedRoomsData[index] = {
      ...updatedRoomsData[index],
      [field]: value,
    };
    setamenity(updatedRoomsData);
  };

  // const handleRoomChange = (index, field, value) => {
  //   const updatedRoomsData = [...roomsData];
  //   updatedRoomsData[index] = {
  //     ...updatedRoomsData[index],
  //     [field]: value,
  //   };
  //   setRoomsData(updatedRoomsData);
  // };

  return (
    <div>
      <div>
      <div style={style}>
         {myarray.map((RoomNumber, index) => (

          <div key={RoomNumber} style={{display:'flex', gap:'30px',}} >
            <div>{index+1}</div>
            <input type="text" placeholder='Room Number' style={{width: '7rem', padding:'5px', marginBottom: '10px'}} 
            // onChange={(event)=> 
            // setamenity({...amenity, roomNumber:event.target.value})}
           
            onChange={(event) => handleRoomChange(index, 'roomNumber', event.target.value)}
            
             />
            <div style={{ marginBottom: '10px'}} >
            <Select            
                options={options}
                // value={options.find(option => option.value === totalRoom.rooms[index]?.roomType)}
                // onChange={(selectedOption) => handleRoomChange(index, 'roomType', selectedOption.value.toString())}
              
                onChange={(selectedOption) => handleRoomChange(index, 'roomType', selectedOption.value)}
              
              />
              </div>
               <Select style={{ marginBottom: '50px'}} 
                closeMenuOnSelect={false}
                components={Multidropdown}  
                isMulti
                options={Amenity}
               
                // value={Amenity.filter(option => totalRoom.rooms[index]?.amenities?.includes(option.value))}
                
                  onChange={(selectedOptions) => handleRoomChange(index, 'amenities', selectedOptions.map(option => option.value))}
               
              
              />
            
            
          </div>
          
        )

        )}
      </div>
      </div>

      <div className="form-groups">
                        <button type="submit" onClick={apiCall} >Sign Up</button>
                    </div>
    </div>
  )
}

export default RoomCollection;