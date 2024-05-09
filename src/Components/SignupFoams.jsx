import React, { useState } from 'react'
import '../styles/SignupFoams.css'
import FirstPages from './FirstPages';
import HotelDetails from './HotelDetails';
import RoomCollection from './RoomCollection';
import HotelDetailsSecond from './HotelDetailsSecond';
import OtpPass from './OtpPass';

import { Link } from 'react-router-dom';

const Signupfoams = () => {
    
const [page, setpage] = useState(0);
// const [verification, setverification] = useState({
//     name: "",
//     email: "",
//     hotelName: "",
//     Mobilenumber: ""
// });

const [totalRoom, settotalRoom ] = useState({
    TotalRooms: ''
})
const [token, setToken] = useState('');

const handleApiResponseFromChild = (token) => {
    // Do something with the API response received from the child component
    console.log('API response received in parent:', token);
    setToken(token);
  };



    const FormTitles = [ "Please Enter Hotel Information","Verification User", "Hotel Details","uplaod Hotal Documents", "Please Fill your room details"]


    const Page = () =>{
       if (page === 0 ){
        return <FirstPages  page={page} setpage={setpage} handleApiResponse={handleApiResponseFromChild}/>
       }
       else if(page === 1) {
        return <OtpPass page={page} setpage={setpage} token={token}/>
       }
       else if(page === 2) {
        return <HotelDetails page={page} setpage={setpage} />
       }
       else if(page === 3) {
        return <HotelDetailsSecond totalRoom={totalRoom} settotalRoom={settotalRoom} page={page} setpage={setpage}/>
       }
       else if(page=== 4) {
        return <RoomCollection totalRoom={totalRoom} settotalRoom={settotalRoom} page={page} setpage={setpage}/>
       }
    }




    return (
        <div id='main-container'>
            <div className="signup-form-containers">
                <div className='foam-heading'>
                <h1>Sign Up</h1>
               
                <div className="header"><h3>{FormTitles[page]}</h3></div> 
                {/* */}
                </div>
                {/* <div><button onClick={apiCall}>api call</button></div> */}
                <div>{Page()}</div>
                    
                <div id='footer-section'>
                    <div >
                        <link rel="stylesheet" href="Login" />If you already have an account, <Link>login</Link>
                    </div>
                    <div id='terms-conditions'>
                        By proceeding i agree to T&C & privacy policy
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signupfoams