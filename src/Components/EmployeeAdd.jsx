import React,{useState} from 'react'
import axios from 'axios';
import '../styles/EmployeeAdd.css';
import Settings from './Settings';

const EmployeeAdd = () => {

    const [name, setName] = useState('');
    const [email, setemail] = useState('');
    const [role, setRole] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const userData = {
        name,
        email,
        role,
      };

      const token = sessionStorage.getItem('token');
  
      try {
        const response = await axios.post('http://192.168.1.4:8080/invite-Employee', userData,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        console.log('User data submitted:', response.data);
      } catch (error) {
        console.error('Error submitting user data:', error);
      }
    };

    
  return (
    <>
    <Settings/>
    <form className="user-form" onSubmit={handleSubmit}>
      <div className="form-groupss">
        <label htmlFor="nameOrEmail">Name</label>
        <input
          type="text"
          id="nameOrEmail"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-groupss">
        <label htmlFor="nameOrEmail">Email</label>
        <input
          type="text"
          id="nameOrEmail"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
      </div>

      <div className="form-groupss">
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
          <option value="owner">Owner</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default EmployeeAdd