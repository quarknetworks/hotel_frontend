import React, { useState , useEffect} from 'react'
import '../styles/SignupFoams.css'
import FirstPages from './FirstPages';
import HotelDetails from './HotelDetails';
import RoomCollection from './RoomCollection';
import HotelDetailsSecond from './HotelDetailsSecond';
import OtpPass from './OtpPass';

import { Link } from 'react-router-dom';


const Signupfoams = ({ page, setpage, toke }) => {

 
    const [news, setnews] = useState('')
 
    useEffect(() => {
        setnews(toke);
    }, [toke]);

    const [totalRoom, settotalRoom] = useState({
        TotalRooms: ''
    })

    const [token, setToken] = useState('');
    // setToken(tokens)

    const handleApiResponseFromChild = (token, datas) => {
        setToken(token);
        setnews(datas)
    };

    const handleApiRespons = (datas) => {
        setnews(datas)
    };

    console.log(news)



    const FormTitles = [
        "Please Enter User Information",
        "Verification User",
        "Hotel Details",
        "uplaod Hotal Documents",
        "Please Fill your room details"]


    const renderPage = () => {
        if (page === 0) {
            return <FirstPages page={page} setpage={setpage} handleApiResponse={handleApiResponseFromChild} />
        }
        else if (page === 1) {
            return <OtpPass page={page} setpage={setpage} token={token} handleApiRespon={handleApiRespons} />
        }
        else if (page === 2) {
            return <HotelDetails page={page} setpage={setpage} token={news}  />
        }
        else if (page === 3) {
            return <HotelDetailsSecond totalRoom={totalRoom} settotalRoom={settotalRoom} page={page} setpage={setpage} token={news} />
        }
        else if (page === 4) {
            return <RoomCollection totalRoom={totalRoom} settotalRoom={settotalRoom} page={page} setpage={setpage} token={news} />
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
                <div>{renderPage()}</div>

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