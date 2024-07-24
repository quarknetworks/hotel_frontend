import './App.css';
import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import MainDashbord from './Components/MainDashbord';
import { ThemeProvider } from './Components/ThemeContext';
import Roomsdash from './Components/Roomsdash';
import HotelGuestForm from './Components/HotelGuestForm';
import GuestTable from './Components/GuestTable';
import SignupFoams from './Components/SignupFoams';
import Login from './Components/Login';
import ThankYouPage from './Components/ThankYouPage';
import CheckoutForm from './Components/CheckoutForm';
import ForgetPassword from './Components/ForgetPassword';
import ResetPassword from './Components/ResetPassword';
import Settings from './Components/Settings';
import HotelDetailsUI from './Components/HotelDetailsUI';
import RoomsData from './Components/RoomsData';
import EmployeeAdd from './Components/EmployeeAdd';
import UserVerificationForm from './Components/UserVerificationForm';


function App() {

  const [page, setpage] = useState(0);
  const [token,settoken]= useState('')


  const handlePageChange = (pageNumber) => {
    setpage(pageNumber);
   
  };

  
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
        settoken(savedToken);
    }
}, []);
  // console.log(page)

  const handletoken= (tokens) =>{
    settoken(tokens)
    localStorage.setItem('token', tokens);
  }

//  console.log(token)

  return (

    <div className="App">
     
    <Router>
    <ThemeProvider>
      <Routes>
      <Route path="/" element={<SignupFoams  page={page} setpage={setpage} toke={token} />}/>
      <Route path="/dashboard" element={<MainDashbord  token={token}/>}/>
      <Route path="/login" element={<Login  handlePageChange={handlePageChange}  handletoken={handletoken}  />}> 
      
      </Route>
      <Route path="/roomsdashboard" element={<Roomsdash token={token}  />}/>
      <Route path="/guestfoam" element={<HotelGuestForm token={token}/>}/>
      <Route path="/guestTable" element={<GuestTable token={token}/>}/>
      <Route path="/thankyoupage" element={<ThankYouPage/>}/>
      <Route path="/checkout" element={<CheckoutForm/>}/>
      <Route path="/forgetpassword" element={<ForgetPassword/>}/>
      <Route path='/login/resetpassword' element={<ResetPassword/>}/>
      <Route path="/Settings" element={<Settings/>}/> 
      <Route path="/hotel-Details" element={<HotelDetailsUI/>}/> 
      <Route path="/roomdata" element={<RoomsData/>}/>
      <Route path="/addEmployee" element={<EmployeeAdd/>}/>
      <Route path="/userverification" element={<UserVerificationForm/>}/>

    
   </Routes>
   </ThemeProvider>
   </Router>
     </div>
  );   
}

export default App;
