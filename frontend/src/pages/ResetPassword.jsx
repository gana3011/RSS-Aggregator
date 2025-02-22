import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import { API_URL } from '../config';


const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { token } = useParams(); 
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        if(!(password === confirmation)){
            setMessage("Enter the password correctly");
            return;
          }
        try{
            const respone = await axios.post(`${API_URL}/api/auth/reset-password/${token}`,{password});
            setMessage(respone.data.message);
            setTimeout(() => navigate("/signin"), 2000);
            setPassword("");
            setConfirmation("");
            }
        catch(error){
            console.error(error.message);
            setMessage(error.response?.data.message);
        }
        finally{
            setLoading(false);
        }
    }

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
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
            <input
              type="password"
              id="Password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="mt-1 px-5 py-2 w-full rounded-md border-[1.1px] border-black bg-white text-sm text-gray-700 shadow-xs"
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
              value={confirmation}
              onChange={(e)=>setConfirmation(e.target.value)}
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
  {loading ? "Wait..." : "Reset Password"}
</button>

            {/* <div className="mt-4 text-sm text-gray-500 sm:mt-0">
              Already have an account?
              <div className="text-gray-700 underline"><Link to="/signin">Log in.</Link></div>
            </div> */}
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

export default ResetPassword
