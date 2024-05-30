import './App.css';
import React,{useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import Foam from './Components/Foam';
import MainDashbord from './Components/MainDashbord';
import { ThemeProvider } from './Components/ThemeContext';
import Roomsdash from './Components/Roomsdash';
import HotelGuestForm from './Components/HotelGuestForm';
import GuestTable from './Components/GuestTable';
import SignupFoams from './Components/SignupFoams';
import Login from './Components/Login';
import ThankYouPage from './Components/ThankYouPage';



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
      <Route path="/login" element={<Login  handlePageChange={handlePageChange}  handletoken={handletoken}  />}/>
      <Route path="/roomsdashboard" element={<Roomsdash token={token}  />}/>
      <Route path="/guestfoam" element={<HotelGuestForm token={token}/>}/>
      <Route path="/guestTable" element={<GuestTable token={token}/>}/>
      <Route path="/thankyoupage" element={<ThankYouPage/>}/>
        
   </Routes>
   </ThemeProvider>
   </Router>
     </div>
  ); 
}

export default App;
