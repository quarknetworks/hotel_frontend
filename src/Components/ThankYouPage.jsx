import React from 'react'
import { useNavigate } from 'react-router-dom';
import "../styles/ThankYouPage.css";
import axios from 'axios';
import API_ENDPOINTS from '../confi';

const ThankYouPage = () => {
    const navigate = useNavigate();

    const Checkonbording = async () => {
      
        const response = axios.get(`${API_ENDPOINTS.API}/onstatus`, {
          headers:{
            'Authorization': `Bearer ${token}`,
          }

        })
          
        
    }

  return (
    <div className="thank-you-page">
    <h1>Thank You!</h1>
    <p>Your details are going under verification.</p>
    <p>In case of any need, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
    <button onClick={Checkonbording}>Go to Dashboard</button>
  </div>
  )
}

export default ThankYouPage