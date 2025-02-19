import axios from 'axios';
import React, { useEffect, useState } from 'react'

const useAuth = () => {
  const [user,setUser] = useState(null);
  useEffect(()=>{
    const checkAuth = async()=>{
        try {
            const response = await axios.get("http://localhost:3000/api/auth/verify",{withCredentials:true});
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
