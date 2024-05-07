import React, {  } from 'react'

const PasswordAuthpage = ({formdata, setformdata}) => {

    // const [hotalname, sethotalname] = useState()

    
  return (
    <>
    <div className="signup">
      <div className='Container'>
      <div>
        <input type="Email" placeholder='Enter Hotal Name'
        value={formdata.Hotalname}  onChange={(event) =>
         setformdata({ ...formdata, Hotalname: event.target.value })} />
      </div>
      <div>
        <input type="text" placeholder='Enter Password'
          value={formdata.password} onChange={(event) =>
            setformdata({ ...formdata, password: event.target.value })} />
      </div>
      </div>
      </div>
    </>
  )
}

export default PasswordAuthpage