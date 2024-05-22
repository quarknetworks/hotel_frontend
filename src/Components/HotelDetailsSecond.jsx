import React,{useState} from 'react'
import axios from 'axios'
import API_ENDPOINTS from '../confi';

const HotelDetailsSecond = ({totalRoom, settotalRoom, page, setpage ,token}) => {

  const [formData, setFormData] = useState({
    HotelTotalRooms: '',
    aadharUrl: '',
    panPhotoUrl: '',
    gstCertificateUrl: '',
    businessPanUrl: ''
});



const handleFileUpload = async (event, fileNameKey) => {
    const file = event.target.files[0];
    const fileType = getFileType(file);

    if (file && (fileType === 'jpg' || fileType === 'png' || fileType === 'pdf' || fileType === 'jpeg')) {
        try { 
         
            const response = await axios.post('http://192.168.1.4:8080/upload/Url',{fileType,fileName: fileNameKey },{
                headers:{
                    'Content-Type': 'application/json',
                }
            });
            
            const uploadUrl = response.data[0].upload_url; 
            const fileUrl = response.data[0].document_url;
            
            await axios.put(uploadUrl, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                //   'Content-Type': file.type
                }
              });
      
              // Update the formData state with the uploaded file's URL
              setFormData(prevState => ({
                ...prevState,
                [`${fileNameKey}Url`]: fileUrl
              }));
            
            console.log(uploadUrl);
            console.log(fileUrl);

        } catch (error) {
            console.error('Error uploading file:', error);
        }
    } else {
        // alert('Please upload a file of type JPG, PNG, or PDF.');
    }
};

const getFileType = (file) => {
    const fileName = file.name.toLowerCase();
    const fileExtension = fileName.split('.').pop();
    return fileExtension;
};

const apiCall = () => {
    const filesData = {
        aadharUrl: formData.aadharUrl,
        panPhotoUrl: formData.panPhotoUrl,
        gstCertificateUrl: formData.gstCertificateUrl,
        businessPanUrl: formData.businessPanUrl,
        HotelTotalRooms: formData.HotelTotalRooms,
      };

    console.log(filesData)


    axios.post(`${API_ENDPOINTS.API}/doc`, filesData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
        })
        .then((result) => {
            if (result.data.success === true) {
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
                        onChange={(e)=> handleFileUpload(e, 'aadhar')}
                            />
                    </div>
                    <div className='row'>
                        <label>Upload Owner Pan card</label>
                        <input type="file" id="pan-photo" name="pan-photo"
                      onChange={(e)=> handleFileUpload(e, 'panPhoto')}
                             />
                    </div>

                    <div className='row'>
                        <label>Upload Hotel Gst Certificate</label>
                        <input type="file" id="gstCertificate" name="gstCertificate"
                        onChange={(e)=> handleFileUpload(e, 'gstCertificate')}
                             />
                    </div>
                    <div style={{display: 'flex'}}>
                    <div className='row' style={{marginTop: '10px'}}>
                        <label>Upload Hotel Business Pan</label>
                        <input type="file" id="businessPan" name="businessPan" 
                        onChange={(e)=> handleFileUpload(e, 'businessPan')}
                            />
                    </div>
                    <div className='row' style={{marginTop: '10px'}}>
                        <label>Hotel Total Rooms</label>
                        <input type="text" id="" name="" 
                        
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
                        <button type="submit" onClick={apiCall} >Next</button>
                    </div>
            </div> 
    </div>
  )
}

export default HotelDetailsSecond
