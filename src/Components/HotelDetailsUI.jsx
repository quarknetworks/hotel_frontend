import React from 'react'
import '../styles/HotelDetailsUI.css'
import Settings from './Settings'

const HotelDetailsUI = () => {
    return (
        <div>
            <Settings />
            <div className='Main-hotelContainer'>
                <h1>Hotel Details</h1>
                <div className="hotel-Containers">
                    <div className="hoteinputs">
                        <div className='inputs'>
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                        </div>
                        <div className='inputs'>
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                            <input type="text" name="" id="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HotelDetailsUI