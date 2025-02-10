import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const SigninForm = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const {email, password} = formData;
    console.log(formData)
    try{
    const response = await axios.post("http://localhost:3000/api/auth/signin",formData);
    setMessage(response.data.message);
    setFormData({
      email: "",
      password: "",
    });
    }
    catch(err){
      console.error(err.response?.data);
      setMessage(err.response?.data.message);
    }
  } 
  return (
    <div>

<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
            <input
              type="email"
              id="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              required
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

            <input
              type="password"
              id="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              required
            />
          </div>
          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
            >
             Login
            </button>
            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
              Don't have an account?
             <div className="text-gray-700 underline"><Link to="/">Sign up.</Link></div>
            </p>
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

export default SigninForm;
