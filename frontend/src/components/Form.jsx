import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoSlider from './VideoSlider.jsx';
import { useAuth } from '../../AuthContext.jsx';


const Form = () => {
  const[name, setName] = useState("");
  const[url, setUrl] = useState("");
  const[message, setMessage] = useState("");
  const[refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const{user, checkAuth} = useAuth();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    checkAuth();
    setLoading(true);
    
    const data = {name, url};
    try {
      const response = await axios.post(`http://localhost:3000/api/users/${user.id}/channels`,data, 
      { withCredentials: true});
      setMessage(response.data.message);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error(error.message);
      setMessage(error.response?.data.message);
    }
    finally{
      setLoading(false);
    } 
    setName("");
    setUrl("");
  }

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:pb-10 lg:grid-cols-12"> {/* Reduced min height */}
          <main className="flex justify-center px-4 py-4 sm:px-4 lg:col-span-7 lg:px-6 lg:py-8 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-6 gap-4 items-end"> {/* Reduced mt-8 to mt-4 */}
                {/* Channel Name Input */}
                <div className="col-span-6 sm:col-span-2">
                  <label htmlFor="ChannelName" className="block text-sm font-medium text-gray-700">
                    Channel Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    required
                  />
                </div>
  
                {/* URL Input */}
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="Url" className="block text-sm font-medium text-gray-700">
                    Url
                  </label>
                  <input
                    type="text"
                    id="url"
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-xs"
                    required
                  />
                </div>
  
                {/* Button - Now placed beside input fields */}
                <div className="col-span-6 sm:col-span-1 flex justify-end">
                  <button
                    disabled={loading}
                    className={`inline-block rounded-md border border-rose-600 px-6 py-2 text-sm font-medium text-white transition ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-rose-600 hover:bg-transparent hover:text-rose-600"
                    }`}
                  >
                    {loading ? "Adding..." : "Add"}
                  </button>
                </div>
  
                {/* Message Display */}
                {message && <p className="col-span-6 text-sm text-gray-600">{message}</p>}
              </form>
            </div>
          </main>
        </div>
      </section>
  
      {/* Reduce margin space between form and VideoSlider */}
      <div className="mt-4">
        <VideoSlider refresh={refresh} />
      </div>
    </div>
  );
  
}

export default Form;
