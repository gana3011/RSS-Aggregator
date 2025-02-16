import React,{useEffect, useState} from 'react'
import Nav from '../components/Nav'
import Form from '../components/Form'
import { useAuth } from '../../AuthContext'

const Home = () => {
    const {checkAuth, user, loading} = useAuth();
    useEffect(()=>{
        checkAuth();
    },[loading]);

    if(loading) return <p>Loading...</p>
   return (
    <div>
      <Nav />
      <Form />
    </div>
)
}

export default Home
