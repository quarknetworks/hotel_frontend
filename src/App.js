import './App.css';
import React,{useState} from 'react';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Foam from './Components/Foam';
import MainDashbord from './Components/MainDashbord';
import { ThemeProvider } from './Components/ThemeContext';
import Roomsdash from './Components/Roomsdash';
import HotelGuestForm from './Components/HotelGuestForm';
import GuestTable from './Components/GuestTable';
import SignupFoams from './Components/SignupFoams';
import Login from './Components/Login';



function App() {

  const [page, setpage] = useState(0);
  const [token,settoken]= useState('')


  const handlePageChange = (pageNumber, tokens) => {
    setpage(pageNumber);
   
  };

  const handletoken= (tokens) =>{
    settoken(tokens)
  }
 console.log(token)
  return (

    <div className="App">
     
    <Router>
    <ThemeProvider>
      <Routes>
      <Route path="/" element={<SignupFoams  page={page} setpage={setpage} toke={token} />}/>
      <Route path="/dashboard" element={<MainDashbord />}/>
      <Route path="/login" element={<Login  handlePageChange={handlePageChange}  handletoken={handletoken}  />}/>
      <Route path="/roomsdashboard" element={<Roomsdash />}/>
      <Route path="/guestfoam" element={<HotelGuestForm/>}/>
      <Route path="/guestTable" element={<GuestTable/>}/>
        
   </Routes>
   </ThemeProvider>
   </Router>
     </div>
  ); 
}

export default App;
