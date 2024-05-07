import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Foam from './Components/Foam';
import MainDashbord from './Components/MainDashbord';
import { ThemeProvider } from './Components/ThemeContext';
import Roomsdash from './Components/Roomsdash';
import HotelGuestForm from './Components/HotelGuestForm';
import GuestTable from './Components/GuestTable';
import SignupFoams from './Components/SignupFoams';



function App() {

  
  return (

    <div className="App">
     
    <Router>
    <ThemeProvider>
      <Routes>
      <Route path="/" element={<SignupFoams/>}/>
      <Route path="/dashbord" element={<MainDashbord />}/>
      <Route path="/login" element={<Foam />}/>
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
