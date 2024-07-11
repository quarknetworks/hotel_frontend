import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/ThankYouPage.css";
import axios from 'axios';
import API_ENDPOINTS from '../confi';

const ThankYouPage = () => {
    const navigate = useNavigate();

    const Checkonbording = async () => {
      const token = sessionStorage.getItem('token');
    console.log(token)

  
        const response = await axios.get(`${API_ENDPOINTS.API}/signup/hotelchecklist/status`, {
          headers:{
            'Authorization': `Bearer ${token}`,
          }

        }).then(result => {
          
          console.log(result)
          if (result.data.success == true) {
            navigate('/dashboard')

          }else if (result.data.success == false) {
            alert('please be Patience your request is under process')
            // console.log("onboarding is pending")
          }
        })
          
        
    }

  return (
    <div className="thank-you-page">
    <h1>Thank You!</h1>
    <p>Your details are going under verification.</p>
    <p>In case of any need, please contact us at <a href="mailto:support@example.com">support@quarknetworks.net</a>.</p>
    <button onClick={Checkonbording}>Go to Dashboard</button>
  </div>
  )
}

export default ThankYouPage
