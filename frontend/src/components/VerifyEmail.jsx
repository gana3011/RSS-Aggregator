import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmail = () => {
    const[message, setMessage] = useState("Verifying...");
    const navigate = useNavigate();
    const {token} = useParams();

    useEffect(() =>{
      const verifyEmail = async() =>{
      try {
        const response = await axios.get(`http://localhost:3000/api/auth/verifyemail/${token}`, {withCredentials:true});
        setMessage(response.data.message);
        setTimeout(()=>{
          navigate("/")
        },3000);
      } catch (error) {
        console.error(error.message);
        setMessage(error.response?.data.message);
      }
    }
    verifyEmail();
  },[token,navigate]);

  return (
    <div>
      <p>{message}</p>
    </div>
  )
}

export default VerifyEmail;
