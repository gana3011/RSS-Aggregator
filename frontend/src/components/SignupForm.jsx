import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';

const SignupForm = () => {

  const navigate = useNavigate();

  const {user, checkAuth } = useAuth();

  useEffect(()=>{
    checkAuth();
    if(user){
      navigate("/channelForm");
    }
    console.log("signup and login");
  },[user]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    const {name, email, password} = formData;
    if(!(password === formData.password_confirmation)){
      setMessage("Enter the password correctly");
    }
    else{
    try{
    const response = await axios.post("http://localhost:3000/api/auth/signup",formData);
    setMessage(response.data.message);
    setFormData({
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    });
    }
    catch(err){
      console.error(err.message);
      setMessage(err.response.message);
    }
    finally{
      setLoading(false);
    } 
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
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              required
            />
          </div>

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

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
              Password Confirmation
            </label>

            <input
              type="password"
              id="PasswordConfirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              required
            />
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
  disabled={loading}
  className={`inline-block shrink-0 rounded-md border border-blue-600 px-12 py-3 text-sm font-medium text-white transition ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-transparent hover:text-blue-600"
  }`}
>
  {loading ? "Wait..." : "Create an account"}
</button>

            <div className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <div className="text-gray-700 underline"><Link to="/signin">Log in.</Link></div>
            </div>
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

export default SignupForm;
