import { faAdd, faArrowUp, faCopy, faSortDown, faSortUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

//import FormModal from './Modal/FormModal';

const CreateDataset = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  


  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
          setFile(event.target.files[0]);
      }
  };


  const handleSave = () => {

    CreateSurvey();


}


const CreateSurvey = async () => {
    if (!file) {
        alert("Please select a file");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);



    try {
         const response = await fetch(`${apiUrl}/api/upload`, {
                method: "POST",
                body: formData,
        });

      if (response.ok) {
       // const jsonData = await response.json();
        
        Swal.fire({
            icon: 'success',
            title: 'Registration Successful!',
            text: 'Your account has been created successfully.',
            timer: 3000, // Auto-close after 2 seconds
            showConfirmButton: false, // Hide the confirm button
        }).then(() =>{
           // navigate('/');    

        });
      } else {
        const errorResponse = await response.json();
        console.error( errorResponse.message || 'Unknown error');
        return Swal.fire({
            icon: 'error',
            title: 'Survey Creation Failed',
            text: errorResponse.message || "Unexpected Error",
            confirmButtonColor: '#2591DE',
        });
      }

    } catch (error) {
      console.error('Error fetching publications:', error);
      //setErrorMessage('Error fetching publications');
    } finally {
      //loadPublication.current = false;
      //setLoading(false);
    }
  };






  return (
    <>

        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>

    </>
  );
};

export default CreateDataset;