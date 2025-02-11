import React, { useState } from 'react';
import axios from 'axios';
import VideoSlider from './VideoSlider.jsx';

const Form = () => {

  const[name, setName] = useState("");
  const[url, setUrl] = useState("");
  const[message, setMessage] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const data = {name, url};
    try {
      const response = await axios.post(`http://localhost:3000/api/users/${localStorage.getItem("userId")}/channels`, data);
      setMessage(response.data.message)``
    } catch (error) {
      console.error(error.message);
      setMessage(error.message);
    } 
    setName(" ");
    setUrl(" ");
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
            <label htmlFor="ChannelName" className="block text-sm font-medium text-gray-700">Channel Name</label>

            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              required
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="Url" className="block text-sm font-medium text-gray-700">
              Url
            </label>

            <input
              type="text"
              id="url"
              name="url"
              value={url}
              onChange={(e)=>setUrl(e.target.value)}
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
              required
            />
          </div>

          <div className="col-span-6 sm:flex-column sm:items-center sm:gap-4">
            <button
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:ring-3 focus:outline-hidden"
            >
              Add
            </button>
          </div>
          {message &&
          <p>{message}</p>}
        </form>
      </div>
    </main>
  </div>
</section>
<VideoSlider />
</div>
  )
}

export default Form;
