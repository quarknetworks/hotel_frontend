import React from 'react'


const FirstPage = ({ formdata, setformdata, onNext }) => {
    return (
        <>
            <div className='Container'>
                <form>
                    
                    <div className="signup">
                        <div >
                            <input type="text" placeholder='Please enter your full Name'
                                value={formdata.name} 
                                onChange={(event) =>
                                 setformdata({ ...formdata, name: event.target.value })} />

                        </div>
                        <div className="">
                            <input type="email" placeholder='Please enter your Email address '
                                value={formdata.email} onChange={(event) =>
                                    setformdata({ ...formdata, email: event.target.value })} />
                        </div>
                        <div className="">
                            <input type="email" placeholder='Please enter your Email address '
                                value={formdata.email} onChange={(event) =>
                                    setformdata({ ...formdata, email: event.target.value })} />
                        </div>
                        <div className="">
                            <input type="email" placeholder='Please enter your Email address '
                                value={formdata.email} onChange={(event) =>
                                    setformdata({ ...formdata, email: event.target.value })} />
                        </div>
                       
                    </div>
                </form>
            </div>


        </>
    )
}

export default FirstPage