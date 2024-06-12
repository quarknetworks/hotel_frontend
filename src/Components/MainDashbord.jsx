import React, { useEffect, useState, useRef } from 'react'
import "../styles/MainDashbord.css"
import Navbar from './Navbar';
import Slidemenu from './Slidemenu';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Chart from 'react-apexcharts';
import ima1 from "../Assets/hotalimg1.jpg"
import ima2 from "../Assets/hotalimg2.webp"
import ima3 from "../Assets/hotalimg3.jpg"
import ima4 from "../Assets/hotalimg4.jpg"
import ima5 from "../Assets/hotalimg5.webp"
import { useTheme } from './ThemeContext';
import API_ENDPOINTS from '../confi.js';
import { useNavigate } from 'react-router-dom';

// import img6 from "../Assets/humburgericon.png"

const MainDashbord = ({}) => {

  // Sample data for charts
  // const checkinData = [30, 40, 45, 50];
  // const checkoutData = [20, 25, 30, 35];
  const [data, setData] = useState(null);
  const lastSuccessfulData = useRef(null);
  console.log(data)
  // const availableRoomsData = [data.length >= 0 && data?.availableRooms, data?.availableRooms, data?.availableRooms, data?.availableRooms]
  // const bookedRoomsTodayData = [20];
  // const reservationData = [ data.length >= 0 && data?.availableRooms]
  

  const { theme } = useTheme();

  const hamburger = () => {

  }
  const [darkmodes, setdarkmodes] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (!darkmodes) {

  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigate = useNavigate()


  // console.log(token)


  useEffect(() => {

    const token = sessionStorage.getItem('token');
    console.log(token)
    // if (!token) {
    //   console.error('No token found in localStorage');
    //   return;
    // }
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINTS.API}/hotel/admin/dash`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });


            if (response.data) {
              setData(response.data);
              lastSuccessfulData.current = response.data;
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

  
        fetchData();
    
}, []);

useEffect(() => {
  if (!data && lastSuccessfulData.current) {
    setData(lastSuccessfulData.current);
  }
}, [data]);


  



  return (
    <>
      <div className={`themed-component ${theme}`} id='maindashboard'>
        <nav>
          <div className="">
            <Navbar toggleMenu={toggleMenu} />
            <Slidemenu isOpen={isMenuOpen} closeMenu={closeMenu} />
          </div>
        </nav>

        <div className='heading-hotal-main'>
          <h1 >Welcome to dashboard</h1>
          <h2>Book Here...</h2>
        </div>

        <div id='main-containers'>

          {/* First Section */}
          <div className="first-section">
            <div className="box" id='firstbox'>
              <p>Today check-in on</p>
              <h2>Total Check-In</h2>
              {/* Add appropriate value for check-in */}
              <p>{data ? data.checkinToday : 'Loading...'}</p>
            </div>
            <div className="box" id='secondbox'>
              <p>Today check-out on</p>
              <h2>Total Check-Out</h2>
              {/* Add appropriate value for check-out */}
              <p>{data ? data.checkoutToday : 'Loading...'}</p>
            </div>
            <div className="box" id='thirdbox'>
              <p>All Rooms Details</p>
              <h2>Total Rooms</h2>
              {/* Add appropriate value for total rooms */}
              <p>{data ? data.totalRooms : 'Loading...'}</p>
            </div>
            <div className="box" id='fourthbox' onClick={() => { navigate("/roomsdashboard") }}>
              <p>Today Available rooms</p>
              <h2>Available Rooms</h2>
              {/* Add appropriate value for available rooms */}
              <p>{data ? data.roomsAvailableToday : 'Loading...'}</p>
            </div>
          </div>


          <div className='Imgsection'>
            <h2>Popular Rooms</h2>
            <div className='img-Container'>
              <div className='images'>
                <img src={ima1} alt="img1" />
              </div>
              <div className='images'>
                <img src={ima2} alt="img2" />
              </div>
              <div className='images'>
                <img src={ima3} alt="img3" />
              </div>
              <div className='images'>
                <img src={ima4} alt="img4" />
              </div>
              <div className='images'>
                <img src={ima5} alt="img5" />
              </div>
            </div>

          </div>

          {/* Second Section */}
          <div className="second-section">
           
{data && (
  <>
    <div className="left-box">
      <h2>Available Rooms</h2>
      <Chart
        options={{
          labels: ['Total Rooms', "avaible Rooms" , "All check-in"],
          // colors: ['yellow', 'green', 'red' ],
        }}
        series={[data.totalRooms, data.availableRooms, data.allcheckin]}
        type="donut"
      />
    </div>
    <div className="left-box">
      <h2>Booked Rooms Today</h2>
      <Chart
        options={{
          labels: ['Morning', 'Afternoon', 'Evening', 'Night'],
          // colors: ['#00FF00', '#FFFF00', '#FF0000'],
        }}
        series={[20, 25]} // Example data, replace with actual data
        type="bar"
      />
    </div>
    <div className="left-box">
      <h2>Available Statistics</h2>
      <Chart
        options={{
          labels: ["Availability"],
          // colors: ['blue'],
        }}
        series={[data?.availableRooms]} // Example data, replace with actual data
        type="donut"
      />
    </div>
  </>
)}

           
                
           
            </div>
       
        </div>
        {/* </div> */}

        <footer className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: {data ? data.hotelEmail : 'Loading...'}</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>

            <div className="footer-section">
              <h3>Address</h3>
              <p>{data ? data.hotelAddress : 'Loading...'}</p>
            </div>

            <div className="footer-section">
              <div id='hederdiv'>
                <h3>Follow Us</h3>
                <p>Connect with us on social media:</p>
              </div>
              <div className="social-icons">
               
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
               
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Your Hotel. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </>
  )
}

export default MainDashbord