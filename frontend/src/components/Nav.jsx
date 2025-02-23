import axios from 'axios';
import React from 'react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Nav = ({user,setUser}) => {
  const navigate = useNavigate();

  const handleLogout = async() =>{
    try {
      const response = await axios.post(`${API_URL}/api/auth/signout`,{},{withCredentials:true});
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl text-rose-600">
              FeedTube
            </h1>
          </div>

          <div className="md:flex md:items-center md:gap-12">
            <div className="flex items-center gap-4">
              {user ? (
                // If user is logged in, show Sign Out button
                <button
                  onClick={handleLogout}
                  className="rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm cursor-pointer"
                >
                  Sign Out
                </button>
              ) : (
                // If no user, show Sign In and Sign Up links
                <div className="sm:flex sm:gap-4">
                  <Link
                    to="/signin"
                    className="rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm"
                  >
                    Signin
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-rose-600 hidden sm:flex"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
