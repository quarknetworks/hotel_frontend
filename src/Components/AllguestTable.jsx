import React, { useState, useEffect } from 'react'
import axios from 'axios';

import API_ENDPOINTS from '../confi';
import Navbar from './Navbar';

const AllguestTable = () => {

    const [guests, setGuests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const guestsPerPage = 10;

    console.log(guests)

    useEffect(() => {

        const fetchtable = async () => {

            const token = sessionStorage.getItem('token');

            try {
                const response = await axios.get(`${API_ENDPOINTS.API}/guests/allbookings`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                setGuests(response.data.bookings);
                console.log(response.data)

            } catch (e) {
                console.log(e)
            }

        }

        fetchtable()
    }, []);

    const totalPages = Math.ceil(guests.length / guestsPerPage);
    const startIndex = (currentPage - 1) * guestsPerPage;
    const endIndex = startIndex + guestsPerPage;
    const currentGuests = Array.isArray(guests) ? guests.slice(startIndex, endIndex) : [];


    // Handle pagination click
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <Navbar />

            <div className="guest-tables-container" style={{ marginLeft: "20rem", marginTop: '4rem', overflowY: 'scroll' }}>
                {/* <h1>Hotel Guest List</h1> */}
                <table className="guest-tables">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Aadhaar Number</th>
                            <th>Aadhaar URL</th>
                            <th>Rooom Number</th>
                            <th>Check-In Date</th>
                            <th>Check-Out Date</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentGuests.map((guest) => (
                            <tr key={guest.id}>
                                <td>{guest.guestDetails[0].firstName} {guest.guestDetails[0].lastName}</td>
                                <td>{guest.phone}</td>
                                <td>{guest.guestDetails[0].aadharnumber}</td>
                                <td><a href={guest.guestDetails[0].documentUrl} target="_blank" rel="noopener noreferrer">View</a></td>
                                <td>{guest.RoomNumber}</td>
                                <td>{guest.checkIn}</td>
                                <td>{guest.checkOut}</td>
                                <td>{guest.payment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination" style={{ marginTop: '1rem' }}>
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </>
    )
}

export default AllguestTable