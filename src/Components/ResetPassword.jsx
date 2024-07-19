import React, {useState} from 'react'
import API_ENDPOINTS from '../confi';

const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;      
        }

        try{
            const response = await axios.post(`${API_ENDPOINTS.API}/reset-password`, {email}, {
                headers:{
                   'Content-Type': 'application/json',
                   'Access-Control-Allow-Origin': '*',
                   'Access-Control-Allow-Headers': '*',
                }
            })
            console.log(response)
        }
        catch(err) {
            console.log(err);
        }
        // Handle form submission
        console.log('New Password:', newPassword);
    };

  return (
   
    <div style={styles.container}>
    <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Reset Password</h2>
        <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
            style={styles.input}
        />
        <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            style={styles.input}
        />
        <button type="submit" style={styles.button}>Submit</button>
    </form>
</div>


  )
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f0f0f0',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        width: '30vw',
        height: 'auto',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        marginBottom: '20px',
        color: '#333',
    },
    input: {
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default ResetPassword