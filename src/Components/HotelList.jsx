import React, { useState, useEffect } from 'react'
import '../styles/HotelList.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import HotelOnbording from './HotelOnbording';
import API_ENDPOINTS from '../confi';


const HotelList = () => {

    const [hotels, setHotels] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedHotel, setSelectedHotel] = useState(null);
    console.log(hotels)

    const navigate = useNavigate()

    useEffect(() => {

        const fetchHotelList = async () => {
            // Fetch the hotel data from the server
            try {
                const response = await axios.get(`${API_ENDPOINTS.API}/signup/all/checklist`,)

                setHotels(response.data)
                console.log(response)
                // const hotelid = response.data
                // console.log(hotelid)


            }

            catch (error) { console.log(error) }
            // fetch('/api/hotels')
            //     .then(response => response.json())
            //     .then(data => setHotels(data));
        }
        fetchHotelList();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleViewClick = (hotel) => {
        setSelectedHotel(hotel);
        navigate('/onbording', { state: { hotel: hotel.hotelId } })

    }

    const hot = []

    // const filteredHotels = hotels.filter(hotel =>
    //     hotel.name.toLowerCase().includes(search.toLowerCase())
    // );
    return (
        <div className='hotelist-container'>
            <div className='hotellistbox'>
                
                <input
                    type="text"
                    placeholder="Search hotels"
                    value={search}
                    onChange={handleSearch}
                />
                <table style={{ maxHeight: '400px', overflowY: 'scroll', display: 'block' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Registration Number</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map(hotel => (
                            <tr key={hotel.id}>
                                <td>{hotel.id + 1}</td>
                                <td>{hotel.hotelName}</td>
                                <td>{hotel._id}</td>
                                <td>{hotel.status}</td>
                                <td>
                                    <button onClick={() => handleViewClick(hotel)}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedHotel && (
                <HotelOnbording hotel={selectedHotel} />
            )}
        </div>
    )
}

export default HotelList