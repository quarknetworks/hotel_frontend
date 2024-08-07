import React,{useState} from 'react'
import '../styles/WifiassignPage.css'
import API_ENDPOINTS from '../confi';
import axios from 'axios';


const WifiassignPage = () => {


    const [formData, setFormData] = useState({
        orgId: '',
        siteId: '',
        site_name: '',
        wlan_id: '',
        hotelId: ''
      });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(`${API_ENDPOINTS.API}/mist/addhotel`, formData);
          console.log('Data submitted successfully:', response.data);
        } catch (error) {
          console.error('Error submitting data:', error);
        }
      };

  return (
    <form className='wifiassign-container' onSubmit={handleSubmit}>
      <div >
        <label>Org ID:</label>
        <input type="text" name="orgId" value={formData.orgId} onChange={handleChange} required />
      </div>
      <div>
        <label>Site ID:</label>
        <input type="text" name="siteId" value={formData.siteId} onChange={handleChange} required />
      </div>
      <div>
        <label>Site Name:</label>
        <input type="text" name="site_name" value={formData.site_name} onChange={handleChange} required />
      </div>
      <div>
        <label>WLAN ID:</label>
        <input type="text" name="wlan_id" value={formData.wlan_id} onChange={handleChange} required />
      </div>
      <div>
        <label>Hotel ID:</label>
        <input type="text" name="hotelId" value={formData.hotelId} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

export default WifiassignPage