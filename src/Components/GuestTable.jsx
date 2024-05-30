import React, { useState, useEffect } from 'react';
import "../styles/GuestTable.css"
import Navbar from './Navbar';
import { useTheme } from './ThemeContext';
import axios from 'axios';
// import Box from '@mui/material/Box';
// import DataGrid  from "@material-ui/data-grid";
import { DataGrid } from '@mui/x-data-grid';
import API_ENDPOINTS from '../confi.js';


const style = {

    display: "flex",
    overflowY: "scroll",
    width: "70vw",
    height: "75vh",
    border: "2px solid #ddd",
    padding: "1rem",
    marginTop: "1.5rem",
    float: "right",
    marginRight: "3rem",

}


// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', email: 'snow@example.com', phone: '1234567890', Aadhar: 123456789, Aadress: 'Winterfell' },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: 'cersei@example.com', phone: '9876543210', Aadhar: 987654321, Aadress: 'King\'s Landing' },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: 'jaime@example.com', phone: '5555555555', Aadhar: 555555555, Aadress: 'King\'s Landing' },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', email: 'arya@example.com', phone: '7777777777', Aadhar: 777777777, Aadress: 'Winterfell' },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: 'daenerys@example.com', phone: '9999999999', Aadhar: 999999999, Aadress: 'Dragonstone' },
//     { id: 6, lastName: 'Melisandre', firstName: 'shubham', email: 'melisandre@example.com', phone: '1111111111', Aadhar: 111111111, Aadress: 'Asshai' },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: 'clifford@example.com', phone: '4444444444', Aadhar: 444444444, Aadress: 'Rome' },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', email: 'frances@example.com', phone: '2222222222', Aadhar: 222222222, Aadress: 'Paris' },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: 'roxie@example.com', phone: '6666666666', Aadhar: 666666666, Aadress: 'New York' },
//     { id: 10, lastName: 'Johnson', firstName: 'Michael', email: 'johnson@example.com', phone: '3333333333', Aadhar: 333333333, Aadress: 'Los Angeles' },
//     { id: 11, lastName: 'Doe', firstName: 'Jane', email: 'doe@example.com', phone: '5555555555', Aadhar: 555555555, Aadress: 'Chicago' },
//     { id: 12, lastName: 'Williams', firstName: 'David', email: 'williams@example.com', phone: '8888888888', Aadhar: 888888888, Aadress: 'Houston' },
//     { id: 13, lastName: 'Brown', firstName: 'Emily', email: 'brown@example.com', phone: '9999999999', Aadhar: 999999999, Aadress: 'Philadelphia' },
//     { id: 14, lastName: 'Miller', firstName: 'Emma', email: 'miller@example.com', phone: '7777777777', Aadhar: 777777777, Aadress: 'Phoenix' },
//     { id: 15, lastName: 'Wilson', firstName: 'Olivia', email: 'wilson@example.com', phone: '2222222222', Aadhar: 222222222, Aadress: 'San Antonio' },
//     { id: 16, lastName: 'Moore', firstName: 'Liam', email: 'moore@example.com', phone: '4444444444', Aadhar: 444444444, Aadress: 'San Diego' },
//     { id: 17, lastName: 'Taylor', firstName: 'Charlotte', email: 'taylor@example.com', phone: '6666666666', Aadhar: 666666666, Aadress: 'San Francisco' },
//     { id: 18, lastName: 'Anderson', firstName: 'Ethan', email: 'anderson@example.com', phone: '1111111111', Aadhar: 111111111, Aadress: 'San Jose' },
//     { id: 19, lastName: 'Thomas', firstName: 'Amelia', email: 'thomas@example.com', phone: '8888888888', Aadhar: 888888888, Aadress: 'Austin' },
//     { id: 20, lastName: 'Jackson', firstName: 'William', email: 'jackson@example.com', phone: '5555555555', Aadhar: 555555555, Aadress: 'Seattle' },
// ];

const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 90
    },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'email',
        headerName: 'email',
        width: 150,
        editable: true,
    },
    {
        field: 'Room Number',
        headerName: 'Room Number',
        width: 150,
        editable: true,
    },
    {
        field: 'phone',
        headerName: 'Phone Number',
        width: 200,
        editable: true,
    },
    {
        field: 'Aadhar',
        headerName: 'Aadhar No',
        sortable: false,
        width: 160,

    },
    {
        field: 'Aadress',
        headerName: 'Aadress',
        sortable: false,
        width: 160,

    },
];



const GuestTable = ( {token}) => {



    const [rows, setrows] = useState([]);
    console.log(rows)


    useEffect(() => {
        const fetchGuests = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINTS.API}/guests/allguest`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': '*',
                    },

                });
                const guestArray = Object.values(response.data).map((guest, index) =>({
                    ...guest,
                    id: index + 1,
                }));

                setrows(guestArray);


            } catch (error) {
                console.error("Error fetching guest data:", error);
            }
        };


        fetchGuests();
    }, []);


    const { theme } = useTheme();

    return (

        <div id='guesttable' className={`themed-component ${theme}`} >

            <Navbar />
            <div className='Maincontai'>
                <div className='mainguest-table' >
                    <h1>Guest Details</h1>
                </div >
                <div className={`themed-component ${theme}`} >

                    <div style={style} className={`themed-component ${theme}`} >

                        <DataGrid className={`themed-component ${theme}`}
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            initialState={{
                                pagination: {
                                    paginationModel: {
                                        pageSize: 10,
                                    },
                                },
                            }}
                            pageSizeOptions={[10]}
                            checkboxSelection
                            disableRowSelectionOnClick
                            disableSelectionOnClick
                        />

                    </div>
                </div>

            </div>

        </div>
    )
}

export default GuestTable;