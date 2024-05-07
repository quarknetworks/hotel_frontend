import React, { useState } from 'react'
import "../styles/MainDashbord.css"
import Navbar from './Navbar';
import Slidemenu from './Slidemenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Chart from 'react-apexcharts';
import ima1 from "../Assets/hotalimg1.jpg"
import ima2 from "../Assets/hotalimg2.webp"
import ima3 from "../Assets/hotalimg3.jpg"
import ima4 from "../Assets/hotalimg4.jpg"
import ima5 from "../Assets/hotalimg5.webp"
import { useTheme } from './ThemeContext';

// import img6 from "../Assets/humburgericon.png"

const MainDashbord = () => {

  // Sample data for charts
  // const checkinData = [30, 40, 45, 50];
  // const checkoutData = [20, 25, 30, 35];
  const availableRoomsData = [80, 70, 60, 50];
  const bookedRoomsTodayData = [10, 15, 20, 25];
  const reservationData = {
    series: [70],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['Reservations'],
    },
  };

  const { theme } = useTheme();

  // const hamburger = () => {

  // }
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

  const darkmode = () => {

  }


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
          <h1 >Welcome to my Dashborad</h1>
          <h2>Book Here...</h2>
        </div>

        <div id='main-containers'>

          {/* First Section */}
          <div className="first-section">
            <div className="box" id='firstbox'>
              <p>Today check-in on</p>
              <h2>Total Check-In</h2>
              {/* Add appropriate value for check-in */}
              <p>50</p>
            </div>
            <div className="box" id='secondbox'>
              <p>Today check-out on</p>
              <h2>Total Check-Out</h2>
              {/* Add appropriate value for check-out */}
              <p>30</p>
            </div>
            <div className="box" id='thirdbox'>
              <p>All Rooms Details</p>
              <h2>Total Rooms</h2>
              {/* Add appropriate value for total rooms */}
              <p>100</p>
            </div>
            <div className="box" id='fourthbox'>
              <p>Today Available rooms</p>
              <h2>Available Rooms</h2>
              {/* Add appropriate value for available rooms */}
              <p>70</p>
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
           
              <div className="left-box">
                <h2>Available Rooms</h2>
                <Chart
                  options={{
                    labels: ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'],
                    colors: ['red', 'yellow', 'blue', 'green',],
                    // fill: { colors: ['red', 'green', 'yellow'] },
                    chart: {
                      // background: '#000435',
                      // height: "100%"
                    }

                  }}
                  series={availableRoomsData}
                  type="donut"

                // background: '#fff'
                />
              </div>
              <div className="left-box">
                <h2>Booked Rooms Today</h2>
                <div></div>
                <Chart
                  options={{
                    labels: ['Morning', 'Afternoon', 'Evening', 'Night'],

                    chart: {
                      // background: '#000435',
                      // height: "100%"
                    }
                  }}
                  series={bookedRoomsTodayData}
                  type="bar"
                />
                
              </div>
              <div className="left-box">
                <h2>Reservation Statistics</h2>
                <Chart
                  options={{
                    ...reservationData.options,
                    colors: ['blue'],
                    chart: {
                      // background: '#000435',
                      // height: "100%"
                    }
                  }}
                  series={reservationData.series}
                  type="donut"
                />
              </div>
            </div>
       
        </div>
        {/* </div> */}

        <footer className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: info@yourhotel.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>

            <div className="footer-section">
              <h3>Address</h3>
              <p>Your Hotel, Street Address, City, Country</p>
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