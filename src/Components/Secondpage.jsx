import React from 'react'


const Secondpage = ({ formdata, setformdata }) => {
  return (
    <>

<div className="signup">
      <div className='Container'>
      <div>
        <input type="number" placeholder='Total Rooms'
          value={formdata.totalroom} onChange={(event) => {
            const value = event.target.value;
            setformdata({ ...formdata, totalroom: value === '' ? '' : parseInt(value) || 0, })}
          }
             />
      </div>
      
      </div>
      </div>
    </>
  )
}

export default Secondpage