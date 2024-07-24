import React,{useState} from 'react'
import Settings from './Settings';

const rooms = [
    { number: 101, details: 'Details for Room 101' },
    { number: 102, details: 'Details for Room 102' },
    // Add more rooms as needed
  ];

const RoomsData = () => {

    const [activeRoom, setActiveRoom] = useState(null);
  
    const toggleRoomDetails = (roomNumber) => {
      setActiveRoom(activeRoom === roomNumber ? null : roomNumber);
    };
  
    const roomListStyle = {
      width: '60%',
      margin: '5rem auto',
    //   float: 'right',
     
    };
  
    const roomStyle = {
      marginBottom: '10px',
    };
  
    const roomNumberStyle = {
      padding: '10px',
      backgroundColor: 'gray',
      color: 'white',
      cursor: 'pointer',
      textAlign: 'center',
    };
  
    const roomDetailsStyle = (isActive) => ({
      maxHeight: isActive ? '100px' : '0',
      overflow: 'hidden',
      transition: 'max-height 0.3s ease-out',
      padding: isActive ? '10px' : '0 10px',
      backgroundColor: '#f1f1f1',
      border: '1px solid #ddd',
      borderTop: 'none',
    });

  return (

    <>
    <Settings/>
     <div style={roomListStyle}>
       
      {rooms.map((room) => (
        <div key={room.number} style={roomStyle}>
          <div
            style={roomNumberStyle}
            onClick={() => toggleRoomDetails(room.number)}
          >
            Room {room.number}
          </div>
          <div
            style={roomDetailsStyle(activeRoom === room.number)}
          >
            {room.details}
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default RoomsData