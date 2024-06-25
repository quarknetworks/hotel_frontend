import React, { useEffect, useState } from 'react';
import "../styles/Rooms.css";
import Navbar from './Navbar';
import Slidemenu from './Slidemenu';
import { useTheme } from './ThemeContext';
import axios from 'axios';
import API_ENDPOINTS from '../confi.js';
import {  useNavigate } from 'react-router-dom';

const Roomsdash = () => {
    // const [rooms, setRooms] = useState([]);
    const [currentDate, setCurrentDate] = useState(getDate());
    const { theme } = useTheme();
    const [rooms, setRooms] = useState([]);
    console.log(rooms)


    useEffect(() => {
        fetchRooms();
    }, []);

    const Navigate = useNavigate()


    const fetchRooms = async () => {
        const token = sessionStorage.getItem('token');
        console.log(token)
        try {
            const response = await axios.get(`${API_ENDPOINTS.API}/hotel/allrooms`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                 
                },
            });
            setRooms(response.data.rooms);
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
        const newAvailability = currentAvailability;
        const token = sessionStorage.getItem('token');
        console.log(token)
        try {

            const response = await axios.get(`${API_ENDPOINTS.API}/hotel/rooms/${roomNumber}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,  
                }
            }
            );
            console.log(response)
            const {hotelId,bookingId } = response.data
            console.log(hotelId,bookingId)
            if (response.data.available === true) {

                fetchRooms();
                Navigate("/guestfoam", { state: { roomNumber: roomNumber  } })

            } else if (response.data.available === false) {
               Navigate("/checkout" , { state: { hotelId: hotelId, bookingId:bookingId  } })
            } 

        } catch (error) {
            console.error('Error updating room availability:', error);
        }
    }

   

    return (
        <div className={`themed-component ${theme}`} id='RoomsdahContainer'>
            <Navbar />
            <Slidemenu />
            <div className='Roommaincontainer'>
                <div className='Roomupparfiled'>
                    <div className='Roomleftside'>
                        <h1  >Rooms Details</h1>
                        <p>{currentDate}</p>
                    </div>
                    <div className='Roomrightside'>
                        <div>
                            <input type="search" placeholder='Search by Room number' />
                        </div>
                        <div>
                            <select name="" id="" className='floor-select'>
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
                                <div className={`card ${room.available ? 'available' : 'occupied'}`} key={room.id}>
                                    <p className="card__name">{room.available ? 'Available' : 'Occupied'}</p>
                                    <div className="grid-container">
                                        <div className="grid-child-posts">
                                            <div className={`room ${room.available ? 'available' : 'occupied'}`}></div>
                                        </div>
                                        <div className="grid-child-posts">
                                            Room no: {room.roomNumber}
                                        </div>
                                    </div>
                                    <button className="btn draw-border" onClick={() => handleToggleStatus(room.roomNumber, room.available)}>
                                        {room.available ? 'Check-in' : 'Check-out'}
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


