import React, { useEffect, useState} from 'react'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

const Landing = () => {
    const navigate = useNavigate();
    const {user, checkAuth } = useAuth();
    const [isAuthChecked, setIsAuthChecked] = useState(false); // Track if checkAuth() completed

    useEffect(() => {
        checkAuth().then(() => setIsAuthChecked(true)); // Ensure checkAuth completes
    }, [checkAuth]);

    useEffect(() => {
        if (isAuthChecked && user) {
            navigate("/channelForm");
        }
    }, [user, isAuthChecked, navigate]);
  return (
    <div>
      <Nav />
      <Hero />
    </div>
  )
}

export default Landing
