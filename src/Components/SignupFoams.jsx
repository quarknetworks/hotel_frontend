import React, { useState } from 'react'
import '../styles/SignupFoams.css'
import FirstPages from './FirstPages';
import HotelDetails from './HotelDetails';
import RoomCollection from './RoomCollection';
import HotelDetailsSecond from './HotelDetailsSecond';
import OtpPass from './OtpPass';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Signupfoams = () => {
    
const [page, setpage] = useState(0);
const [verification, setverification] = useState({
    name: "",
    email: "",
    hotelName: "",
    Mobilenumber: ""
});

const [totalRoom, settotalRoom ] = useState({
    TotalRooms: ''
})

console.log(totalRoom)


    // const [formData, setFormData] = useState({
    //     pannumber: '',
    //     aadharNo: '',
    //     hotelEmail: '',
    //     hotelWebsite: '',  
    //     longatitute: '',
    //     letitute: '',  
    //     gpsLocation: '',
    //     hotelAadress: '',
    //     panPhoto: '',
    //     aadharPhoto: '',
    //     gstCertificate: '',
    //     pincode: '',
    //     state: '',
    //     city: '',
    //     landmark:'',
    //     businessPan: '',
    //     totalroom: '',
    //      rooms:[ 
    //           {roomNumber : "",
    //           roomType : "",
    //           amenities : [],
    //         }]
    // });
    
//    console.log(formData)

    const FormTitles = [ "Please Enter Hotel Information","Verification User", "Hotel Details","uplaod Hotal Documents", "Please Fill your room details"]

    // const apiCall = () => {
    // axios.post('http://192.168.1.5:800/signup/find', { }, {
    //     headers: {
    //         'ngrok-skip-browser-warning': '69420',
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Headers': '*',
    //     },
    //   })
    //     .then(result => {
    //     console.log(result)
    //     }) .catch(err => console.log(err))
    // }

    const Page = () =>{
       if (page === 0 ){
        return <FirstPages  page={page} setpage={setpage}/>
       }
       else if(page === 1) {
        return <OtpPass page={page} setpage={setpage} />
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