import React,{useEffect, useState} from 'react'
import Nav from '../components/Nav'
import Form from '../components/Form'
import { useAuth } from '../../AuthContext'

const Home = () => {
    const {checkAuth, user, setUser, loading} = useAuth();
    useEffect(()=>{
        checkAuth();
    },[loading]);

    if(loading) return <p>Loading...</p>
   return (
    <div>
      <Nav user={user} setUser={setUser}/>
      <Form />
    </div>
)
}

export default Home
