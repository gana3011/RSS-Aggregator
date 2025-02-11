import axios from 'axios'
import React, { useEffect, useState} from 'react'

const VideoSlider = () => {
  const [channels,setChannels] = useState([]);
  const [videos, setVideos] = useState({});
  useEffect(()=>{
    const fetchChannel = async()=>{
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${localStorage.getItem("userId")}/channels`);
        if (response.data && Array.isArray(response.data.channels)) {
          setChannels(response.data.channels);
          response.data.channels.forEach((channel) => {
            fetchVideos(channel.channel_id, channel.channel_name);
          });
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchChannel();
  },[])

  const fetchVideos = async(channelId, channelName) =>{
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${localStorage.getItem("userId")}/channels/${channelId}/videos`);
        setVideos((prevVideos)=>({
          ...prevVideos, [channelName] : response.data.videos
        }));
      } catch (error) {
        
      }
  }
  return (
    <div>
      
    </div>
  )
}

export default VideoSlider;
