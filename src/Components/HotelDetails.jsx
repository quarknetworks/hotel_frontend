import React, {useState} from 'react'
import "../styles/Hoteldetails.css"
import Foam from './Foam'
import axios from 'axios'

const HotelDetails = ({page, setpage}) => {

    const [HotelData, setHotelData] = useState({
        panNumber : '',
        aadharNo: '',
        hotelEmail: '',
        hotelWebsite: '',
        longitude:"",
        latitude : '',
        hotelGpsLocation: '',
        hotelAddress: "",
        state: "",
        city: '',
        hotelPincode:""

    });

    console.log(HotelData);


    const apiCall = () => {

        axios.post(`${process.env.REACT_APP_SECRET_KEY}/signup/owner`, { ...HotelData },{
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*', 
          },
        })
          .then(result => {
            console.log(result)
            if (result.status === 201) {  
                setpage(3);
            } else {
              console.log('api failed')
            }
          })
    
          .catch(err => console.log(err))
      }
    


    return (

        <div>
            <div className='Foam-groups form-groups'>
                <div className='rows'>
                    <div className='row'>
                        <label>Owner Pan Number</label>
                        <input type="text" id="pan" name="pan" 
                        onChange={(event) =>
                            setHotelData({ ...HotelData, panNumber: event.target.value })}
                        />
                    </div>
                    <div className='row'>
                        <label>Owner Aadhaar Number</label>
                        <input type="text" id="aadhar" name="aadhar"
                        onChange={(event) =>
                            setHotelData({ ...HotelData, aadharNo: event.target.value })} />
                    </div>
                    <div className='row'>
                        <label>Hotel Email Address</label>
                        <input type="email" id="pan-photo" name="pan-photo"
                        onChange={(event) =>
                            setHotelData({ ...HotelData, hotelEmail: event.target.value })}
                         />
                    </div>
                </div>
            </div>
            <div className='Foam-groups form-groups' >
                <div className='rows'>
                    <div className='row'>
                        <label>Website Address</label>
                        <input type="text" id="pan" name="pan"
                        onChange={(event) =>
                            setHotelData({ ...HotelData,  hotelWebsite: event.target.value })}
                             />
                    </div>
                    <div className='row'>
                        <div style={{display:'flex', width: '11rem', gap:'10px'}}>
                        <div>
                        <label>longitude</label>
                        <input type="text" id="aadhar" name="aadhar"
                        onChange={(event) =>
                            setHotelData({ ...HotelData, longitude: event.target.value })}
                             />
                         </div>
                         <div>
                           <label htmlFor="">latitude</label>
                           <input type="text" name="" id="" 
                           onChange={(event) =>
                            setHotelData({ ...HotelData, latitude: event.target.value })}
                             />

                             
                         </div>
                         </div>
                    </div>
                    <div className='row'>
                        <label>Hotel Gps Loaction</label>
                        <input type="email" id="pan-photo" name="pan-photo" 
                        onChange={(event) =>
                            setHotelData({ ...HotelData, hotelGpsLocation: event.target.value })}
                            />
                    </div>
                </div>
            </div>

            <div className='form-groups'>
                <label>Hotel Address</label>
                <input type="text" id="gst-certificate" name="gst-certificate"
                onChange={(event) =>
                    setHotelData({ ...HotelData, hotelAddress: event.target.value })}
                     />
            </div>

            <div className='Foam-groups form-groups' >
                <div className='rows'>
                    <div className='row'>
                        <label>State</label>
                        <input type="text" id="pan-photo" name="pan-photo" accept=".jpg,.jpeg,.png,.pdf"
                    
                    onChange={(event) =>
                        setHotelData({ ...HotelData, state: event.target.value })}
                         />
                    </div>
                    <div className='row'>
                        <label>City</label>
                        <input type="text" id="aadhar-photo" name="aadhar-photo" accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(event) =>
                            setHotelData({ ...HotelData, city: event.target.value })}
                            />
                    </div>
                    <div className='row'>
                        <label>Hotel Pincode</label>
                        <input type="text" id="hotel-address" name="hotel-address" accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(event) =>
                            setHotelData({ ...HotelData, hotelPincode: event.target.value })}
                       
                            />
                    </div>
                </div>
            </div>
            <div className="form-groups">
                        <button type="submit" onClick={apiCall} >Sign Up</button>
                    </div>
        </div>

    )
}

export default HotelDetails