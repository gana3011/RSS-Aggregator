import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL } from '../config';

const useAuth = () => {
  const [user,setUser] = useState(null);
  useEffect(()=>{
    const checkAuth = async()=>{
        try {
            const response = await axios.get(`${API_URL}/api/auth/verify`,{withCredentials:true});
            setUser(response.data);
        } catch (error) {
            console.error(error.message);
            setUser(null);
        }
    }
    checkAuth();
    console.log(user);
  },[])
    return user;
}

export default useAuth;
