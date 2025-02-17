import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext.jsx';


const SigninForm = () => {
  
  const navigate = useNavigate();

  const {checkAuth}  = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name] : e.target.value});
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);
    const {email, password} = formData;
    try{
    const response = await axios.post("http://localhost:3000/api/auth/signin",formData,{withCredentials:true});
    const{token, id} = response.data;
    await checkAuth();
    // localStorage.setItem("token", token);
    // localStorage.setItem("userId", id);
    setFormData({
      email: "",
      password: "",
    });
    navigate("/channelForm");
    }
    catch(err){
      console.error(err.response?.data);
      setMessage(err.response?.data.message);
    }
    finally{
      setLoading(false);
    }
  } 
  return (
    <div>

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
  disabled={loading}
  className={`inline-block shrink-0 rounded-md border border-rose-600 px-12 py-3 text-sm font-medium text-white transition ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-rose-600 hover:bg-transparent hover:text-rose-600"
  }`}
>
  {loading ? "Wait..." : "Signin"}
</button>
            <div className="mt-4 text-sm text-gray-500 sm:mt-0">
              Don't have an account?
             <div className="text-gray-700 underline"><Link to="/signup">Sign up.</Link></div>
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

export default SigninForm;
