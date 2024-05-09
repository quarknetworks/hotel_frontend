import React,{useState} from 'react'
import axios from 'axios'
import API_ENDPOINTS from '../confi';

const HotelDetailsSecond = ({totalRoom, settotalRoom, page, setpage}) => {

  const [formData, setFormData] = useState({
    HotelTotalRooms: '',
});

const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const fileType = getFileType(file);

    if (fileType === 'jpg' || fileType === 'png' || fileType === 'pdf') {
        try {
            // Send file type to server
            const response = await axios.post('http://192.168.1.5:800/upload', { fileType });
            console.log(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    } else {
        alert('Please upload a file of type JPG, PNG, or PDF.');
    }
};

const getFileType = (file) => {
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();
    return fileExtension;
};

const apiCall = () => {
    const filesData = {
        aadharFileType: 'fileTypeA', // You need to replace 'fileTypeA' with the actual file type for Aadhaar card
        panPhotoFileType: 'fileTypeB', // You need to replace 'fileTypeB' with the actual file type for PAN card
        gstCertificateFileType: 'fileTypeC', // You need to replace 'fileTypeC' with the actual file type for GST certificate
        businessPanFileType: 'fileTypeD', // You need to replace 'fileTypeD' with the actual file type for business PAN
        HotelTotalRooms: formData.HotelTotalRooms,
    };
    console.log(filesData)

    axios
        .post(`${API_ENDPOINTS.API}/signup/doc-detail`, filesData, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        })
        .then((result) => {
            if (result.status === 201) {
                setpage((page) => page + 1);
            } else {
                console.log('api failed');
            }
        })
        .catch((err) => console.log(err));
};

 
  return (
    <div>
         <div className='Foam-groups form-groups'>
                <div className='uplaodDocuments' style={{display:'flex', flexDirection:'column', gap:'1rem'}}>
                    <div className='row'>
                        {/* <label>Hotel Landmark</label>
                        <input type="text" id="pan" name="pan"
                         onChange={(event) =>
                            setFormData({ ...formData, HotelLandmark: event.target.value })}
                             /> */}
                    </div>
                    <div className='row'>
                        <label>Upload Owner Aadhaar card</label>
                        <input type="file" id="aadhar" name="aadhar" 
                        onChange={handleFileUpload}
                            />
                    </div>
                    <div className='row'>
                        <label>Upload Owner Pan card</label>
                        <input type="file" id="pan-photo" name="pan-photo"
                       onChange={handleFileUpload}
                             />
                    </div>

                    <div className='row'>
                        <label>Upload Hotel Gst Certificate</label>
                        <input type="file" id="pan-photo" name="pan-photo"
                        onChange={handleFileUpload}
                             />
                    </div>
                    <div style={{display: 'flex'}}>
                    <div className='row' style={{marginTop: '10px'}}>
                        <label>Upload Hotel Business Pan</label>
                        <input type="file" id="pan-photo" name="pan-photo" 
                        onChange={handleFileUpload}
                            />
                    </div>
                    <div className='row' style={{marginTop: '10px'}}>
                        <label>Hotel Total Rooms</label>
                        <input type="number" id="" name="" 
                        
                        value={formData.totalroom} onChange={(event) => {
                            const value = event.target.value;
                            setFormData({...formData, HotelTotalRooms: event.target.value})
                            settotalRoom({ ...totalRoom, TotalRooms: value === '' ? '' : parseInt(value) || 0, })}
                          }
                        />
                       
                    </div>
                    </div>
                </div>
                <div className="form-groups">
                        <button type="submit" onClick={apiCall} >Sign Up</button>
                    </div>
            </div> 
    </div>
  )
}

export default HotelDetailsSecond