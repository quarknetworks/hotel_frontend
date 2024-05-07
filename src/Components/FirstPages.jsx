
import axios from 'axios';
import React, {useState} from 'react'


const FirstPages = ({ page, setpage}) => {


const[error, seterror] = useState()
    const [verification, setverification] = useState({
        name: "",
        email: "",
        hotelName: "",
        mobileNumber: ""
    });

    console.log(verification)
    const apiCall = () => {

        axios.post(`${process.env.REACT_APP_SECRET_KEY}/signup`, { ...verification }, {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin': '*',
        //     'Access-Control-Allow-Headers': '*',
        //   },
        })
          .then(result => {
            if (result.status === 201) {  
                setpage(page => page+1);
            } else {
              console.log('api failed')
            }
          })
    
          .catch(err => console.log(err))
      }
    


    // const handleSubmit = (e) => {
    //     e.preventDefault();
        
    //     console.log();
    // };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };


  return (
    <div>
       
                    <div className="form-groups">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder='Enter Your Name' value={verification.name} 
                        onChange={(event) =>
                            setverification({ ...verification, name: event.target.value })}
                        required />
                    </div>
                    <div className="form-groups">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder='Enter Your Email' value={verification.email} 
                        onChange={(event) =>
                            setverification({ ...verification, email: event.target.value })}
                        required/>
                    </div>
                    <div className="form-groups">
                        <label htmlFor="hotelName">Hotel Name</label>
                        <input type="text" id="hotelName" name="hotelName" placeholder='Enter Your hotel Name' value={verification.hotelName} 
                        onChange={(event) =>
                            setverification({ ...verification, hotelName: event.target.value })}
                        required />
                    </div>
                    <div className="form-groups">
                        <label htmlFor="password">Phone Number</label>
                        <input type="Number" id="number" name="" placeholder='Enter Your Phone Number' value={verification.Mobilenumber} 
                        onChange={(event) =>
                            setverification({ ...verification, mobileNumber: event.target.value })}
                            required/>

                    </div>
                    <div className="form-groups">
                        <button type="submit" onClick={apiCall}>Sign Up</button>
                    </div>
                    
                    {/* <div className="form-groups">
                        <button type="submit">Sign Up</button>
                    </div> */}
           
    </div>
  )
}

export default FirstPages