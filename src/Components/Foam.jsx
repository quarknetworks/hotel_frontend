// import React, { useState } from 'react'
// import FirstPage from './FirstPage'
// import Secondpage from './Secondpage'
// import ThirdPage from './ThirdPage'
// import "../styles/Foam.css"
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import PasswordAuthpage from './PasswordAuthpage'


// const formDefaultValues = {
//   name: "",
//   email: "",
//   Hotalname: "",
//   password: "",
//   totalroom: 0,

  // rooms:[ 
  //   {roomNumber : "",
  //   roomType : "",
  //   amenities : [],
  // }
  // ]
  // ,
// };

// console.log(typeof(formDefaultValues.rooms[0].roomType));


// const Foam = () => {
//   const [page, setpage] = useState(0)
//   const [onboarding, setOnboarding] = useState(null);
//   const [formdata, setformdata] = useState({
//     ...formDefaultValues
//   });

  // console.log(formdata)

  // const resetForm = () => {
  //   setformdata(formDefaultValues)
  // }

  // const navigate = useNavigate()

  // const apiCall = () => {

  //   axios.post(`${process.env.REACT_APP_SECRET_KEY}/user`, { ...formdata }, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       'Access-Control-Allow-Headers': '*',
  //     },
  //   })
  //     .then(result => {
        // setOnboarding(result.data.onboarding);
        // if (result.data.onboarding === false) {  
        //   setpage(2);
        // } else {
        //   setpage(page + 1);
  //       // }
  //     })

  //     .catch(err => console.log(err))
  // }


  // const submitForm = () => {
    // if(page===3) {
    //   navigate('/')
    // }

    // if (page === 3) {

    //   apiCall()

      //  resetForm()

      // setpage(0)
    // }
    // if (page === 3) {
    //   navigate('/')
      
      // const emptyFieldsCount = Object.values(formdata).filter(value => value === "").length;
    
         
     
  // } else {
  //     setpage((currPage) => currPage + 1);
  // }

    // else {
    //   setpage((currPage) => currPage + 1)
    // }
  // }




  // const FormTitles = ["Sign Up", "Hotal Details", "Room Details", "Please Fill your room details"]



  // const PageDisplay = () => {

  //   if (page === 0) {
  //     return <FirstPage formdata={formdata} setformdata={setformdata} />
  //   } else if (page === 1) {
  //     return <PasswordAuthpage formdata={formdata} setformdata={setformdata} />
  //   } else if (page === 2) {
  //     return <Secondpage formdata={formdata} setformdata={setformdata} />
  //   } else {
  //     return <ThirdPage formdata={formdata} setformdata={setformdata} />
  //   }
  // }

  // const isNextDisabled = () => {
  //   if (page === 0) {
  //     return !formdata.name || !formdata.email;
  //   } else if (page === 1) {
  //     return !formdata.roomtype || !formdata.roomnumber || !formdata.totalroom
  //   }
  //   return false;
  // }; 

  // console.log(formdata)
  // return (

  //   <div class='Container'>


  //     <div className='maincontainer'>
  //       <div className="foam-container">
       
  //         <div className="header"><h3>{FormTitles[page]}</h3></div>
  //         <div className='Hading1'><h2>{page === 2 ? "Enter Room's Details" : ""}</h2></div>
        

  //         <div className="body">{PageDisplay()}</div>


  //         <div className="footer" style={{ width: "70%" }}></div>
  //         <div>
  //         </div>
  //         <div className="footer">
            {/* <div>
              <button
                disabled={page == 0}
                onClick={() => { setpage((currPage) => currPage - 1) }}>Prev</button>
            </div> */}
            {/* <div>
              <button
                disabled={page === 4}
                onClick={submitForm} */}
              //   onClick={()=> {  if (page === 2) {
              //     submitForm(); 
              //   } else {
              //     setpage((currPage) => currPage + 1);
              //   }
              // }}
          //     >{page === 2 ? "Submit" : "Next"}</button>
          //   </div>
          // </div>

//           <div>
//             <link rel="stylesheet" href="Login" />If you already have an account,
//           </div>
//           <div id='Footer-last'>
//             By proceeding i agree to T&C & privacy policy
//           </div>
//         </div>


//       </div>

//     </div>
//   )
// }

// export default Foam