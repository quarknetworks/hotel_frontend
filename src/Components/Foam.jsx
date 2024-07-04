import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../styles/Foam.css"

const Foam = () => {

  const [count , setcount] = useState();

 const style = {
  // display: "flex",
  gap: '5rem', 
  justifyContent: 'center',
  
  
 }

 const  api = () => {

 }


 
  

  return (
    <>
    <div className='div'>
      <div className='aliancenter'>
   <i class="fas fa-band-aid"></i>
   <p>Html Icons</p>
   </div>
   <div className='aliancenter'>
    <i class="fas fa-cat"></i>
    <p>Html Icons</p>
    </div>
    <div className='aliancenter'>
  <i class="fas fa-dragon"></i>
  <p>Html Icons</p>
  </div>
  <button onClick={api}></button>
</div>

      
      </>
  )
}

export default Foam