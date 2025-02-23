import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav.jsx'
import React from 'react';
import { API_URL } from '../config.js';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading,setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/auth/forgot-password`,{email});
            setMessage(response.data.message);
            setEmail("");
        } catch (error) {
           console.error(error.message);
           setMessage(error.response?.data.message)
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{
        console.log(email);
    },[]);
  return (
      <div>
        <Nav />
    <section className="bg-white">
  <div className="lg:min-h-screen lg:grid-cols-12">
    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">

        <form onSubmit={handleSubmit} className="mt-30 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

            <input
              type="email"
              id="Email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="mt-1 px-5 py-2 w-full rounded-md border-[1.1px] border-black bg-white text-sm text-gray-700 shadow-xs"
              required
            />
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
  disabled={loading}
  className={`inline-block shrink-0 rounded-md border border-rose-600 px-12 py-3 text-sm font-medium text-white transition ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-rose-600 hover:bg-transparent hover:text-rose-600"
  }`}
>
  {loading ? "Wait..." : "Send Link"}
</button>
           </div>
          {message &&
          <p>{message}</p>}
        </form>
      </div>
    </main>
  </div>
</section>

    </div>

  )
}

export default ForgotPassword
