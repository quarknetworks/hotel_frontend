import React, { useEffect, useState } from 'react';
import "../styles/Rooms.css";
import Navbar from './Navbar';
import Slidemenu from './Slidemenu';
import { useTheme } from './ThemeContext';
import axios from 'axios';

const Roomsdash = () => {
    // const [rooms, setRooms] = useState([]);
    const [currentDate, setCurrentDate] = useState(getDate());
    const { theme } = useTheme();
    const [rooms, setRooms] = useState([
        { id: 1, RoomNo: '101', Available: true },
        { id: 2, RoomNo: '102', Available: false },
        { id: 3, RoomNo: '103', Available: true },
        { id: 4, RoomNo: '104', Available: true },
        { id: 5, RoomNo: '105', Available: true },
        { id: 6, RoomNo: '106', Available: true },
        { id: 7, RoomNo: '107', Available: true },
    ]);

    
    useEffect(() => {
        fetchRooms();
    }, []);

   
    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://192.168.1.3:800/roomstatus',{
                headers: {
                    'ngrok-skip-browser-warning': '69420',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                },
            });
            setRooms(response.data);
        } catch (error) {
            console.log('Error fetching room data:', error);
        }
    };

    // Function to get the current date
    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${month}/${date}/${year}`;
    }

    console.log(rooms)

    // Function to toggle room availability and update backend via PUT API
  async function handleToggleStatus(roomNumber, currentAvailability) {
    const Available = !currentAvailability; 
    try {

      const response = await axios.put(`http://192.168.1.3:800/roomstatus/update/${roomNumber}`, {
         Available
      });
      if (response.status === 200) {
       
        fetchRooms();
      } else {
        console.error('Error updating room availability');
      }
    } catch (error) {
      console.error('Error updating room availability:', error);
    }
  }

// const handleToggleStatus = (roomId, currentAvailability) => {
//     const roomIndex = rooms.findIndex(room => room.id === roomId);

//     if (roomIndex !== -1) {
//         const updatedRooms = [...rooms];
//         updatedRooms[roomIndex].Available = !currentAvailability ? true : false;
//         setRooms(updatedRooms);
//     } else {
//         console.error('Room not found');
//     }
// };

 

    return (
        <div className={`themed-component ${theme}`} id='RoomsdahContainer'>
            <Navbar />
            <Slidemenu />
            <div className='Roommaincontainer'>
                <div className='Roomupparfiled'>
                    <div className='Roomleftside'>
                        {/* <button onClick={fetchRooms}>Refresh Rooms</button> */}
                        <h1 style={{marginLeft : '2.2rem'}} >Rooms Details</h1>
                        <p style={{marginLeft : '2.2rem'}} >{currentDate}</p>
                    </div>
                    <div className='Roomrightside'>
                        <div>
                            <input type="search" placeholder='Search by Room number' />
                        </div>
                        <div>
                            <select name="" id="">
                                <option value="Floor-1">Floor-1</option>
                                <option value="Floor-2">Floor-2</option>
                                <option value="Floor-3">Floor-3</option>
                                <option value="Floor-4">Floor-4</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='maindiv'>
                    <div id='maindiv-child'>
                        <div className="container">
                            {rooms.map(room => (
                                <div className="card" key={room.id}>
                                    <p className="card__name">{room.Available ? 'Available' : 'Occupied'}</p>
                                    <div className="grid-container">
                                        <div className="grid-child-posts">
                                            <div className={`room ${room.Available ? 'available' : 'occupied'}`}></div>
                                        </div>
                                        <div className="grid-child-posts">
                                            Room no: {room.RoomNo}
                                        </div>
                                    </div>
                                    <button className="btn draw-border" onClick={() => handleToggleStatus(room.RoomNo, room.Available)}>
                                        {room.Available ? 'Check-in' : 'Check-out'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Roomsdash;


