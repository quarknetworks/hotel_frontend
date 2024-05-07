import React,{useState} from 'react'
import axios from 'axios'

const OtpPass = ({ page, setpage}) => {

    const [Otp, setOtp] = useState({
        emailOtp: '',
        mobileOtp: '',
        createPass: '',
        confirmPass: '',
    })

    const apiCall = () => {

        axios.post(`${process.env.REACT_APP_SECRET_KEY}/signup/verify`, { ...Otp }, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
          },
        })
          .then(result => {
            if (result.status === 201) {  
                setpage(2);
            } else {
              console.log('api failed')
            }
          })
    
          .catch(err => console.log(err))
      }
    

    return (
        <div>

            <div className='Foam-groups form-groups'>
                <div className='row-gap'>
                    <div className='row'>
                        <label>Enter Email Verification Code</label>
                        <input type="text" id="pan" name="pan"
                            onChange={(event) =>
                                setOtp({ ...Otp, emailOtp: event.target.value })}
                        />
                    </div>
                    <div className='row' >
                        <label>Enter Mobile Verification Code</label>
                        <input type="text" id="aadhar" name="aadhar"
                           onChange={(event) =>
                            setOtp({ ...Otp, mobileOtp: event.target.value })}
                        />
                    </div>
                    <div className='row'>
                        <label>Create Password</label>
                        <input type="password" id="pan-photo" name="pan-photo"
                           onChange={(event) =>
                            setOtp({ ...Otp, createPass: event.target.value })}
                        />
                    </div>
                    <div className='row'>
                        <label>Confirm Password</label>
                        <input type="password" id="pan-photo" name="pan-photo"
                         onChange={(event) =>
                            setOtp({ ...Otp, confirmPass: event.target.value })}
                        />
                    </div>
                    <div className="form-groups">
                        <button type="submit" onClick={apiCall}>Sign Up</button>
                    </div>




                </div>
            </div>
        </div>
    )
}

export default OtpPass