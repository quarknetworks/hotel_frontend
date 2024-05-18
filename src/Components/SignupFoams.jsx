import React, { useState } from 'react'
import '../styles/SignupFoams.css'
import FirstPages from './FirstPages';
import HotelDetails from './HotelDetails';
import RoomCollection from './RoomCollection';
import HotelDetailsSecond from './HotelDetailsSecond';
import OtpPass from './OtpPass';

import { Link } from 'react-router-dom';
import Login from './Login';

const Signupfoams = () => {
    
const [page, setpage] = useState(0);
// const [verification, setverification] = useState({
//     name: "",
//     email: "",
//     hotelName: "",
//     Mobilenumber: ""
// });

const [news , setnews ] = useState('')
console.log(news)

const [totalRoom, settotalRoom ] = useState({
    TotalRooms: ''
})
const [token, setToken] = useState('');

const handleApiResponseFromChild = (token , datas) => {
    setToken(token);
    setnews(datas)
  }; 

  const handleApiRespons = ( datas) => {
    setnews(datas)
  }; 






    const FormTitles = [ "Please Enter Hotel Information","Verification User", "Hotel Details","uplaod Hotal Documents", "Please Fill your room details"]


    const Page = () =>{
       if (page === 0 ){
        return <FirstPages  page={page} setpage={setpage} handleApiResponse={handleApiResponseFromChild}/>
       }
       else if(page === 1) {
        return <OtpPass page={page} setpage={setpage} token={token} handleApiRespon={handleApiRespons}/>
       }
       else if(page === 2) {
        return <HotelDetails page={page} setpage={setpage} token={news} />
       }
       else if(page === 3) {
        return <HotelDetailsSecond totalRoom={totalRoom} settotalRoom={settotalRoom} page={page} setpage={setpage} token={news}/>
       }
       else if(page=== 4) {
        return <RoomCollection totalRoom={totalRoom} settotalRoom={settotalRoom} page={page} setpage={setpage} token={news}/>
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
                      alredy have a account <Link to='/login'>Login</Link>
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