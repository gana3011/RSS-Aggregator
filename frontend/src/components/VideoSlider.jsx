import axios from 'axios'
import React, { useEffect, useState} from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useAuth } from '../../AuthContext.jsx'


const VideoSlider = ({refresh}) => {
  const [channels,setChannels] = useState([]);
  const [videos, setVideos] = useState({});
  const {user} = useAuth();
  useEffect(()=>{
    const fetchChannel = async()=>{
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${user.id}/channels`,
          { withCredentials: true}
        );
        if (response.data && Array.isArray(response.data.channels)) {
          setChannels(response.data.channels);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchChannel();
  },[refresh]);

useEffect(() => {
    if (channels.length > 0) {
      channels.forEach((channel) => {
        fetchVideos(channel.channel_id, channel.channel_name);
      });
    }
  }, [channels]);

  const fetchVideos = async(channelId, channelName) =>{
      try {
        const response = await axios.get(`http://localhost:3000/api/users/${user.id}/channels/${channelId}/videos`,{
          withCredentials: true
        });
        setVideos((prevVideos)=>({
          ...prevVideos, [channelName] : response.data.videos || []
        }));
      } catch (error) {
        console.log(error.message);
      }
  }
  // useEffect(() => {
  //   console.log("Updated Channels:", channels);
  // }, [channels]);

  // useEffect(() => {
  //   console.log("Updated Videos:", videos);
  // }, [channels]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  
return (
    <div>
     <div>
         {channels.map((channel)=>(
          <div key={channel.channel_id}>
            <div className='flex items-center gap-2'>
            <img src={channel.profile} alt='channel profile pic' className='rounded-full w-15 h-15'/>
            <div className='flex flex-col'>
            <a href={channel.channel_url} target='_blank' rel='noopener noreferrer'><h2>{channel.channel_name}</h2></a>
            <p><strong>Subscribers:</strong>{channel.subscribers}</p>
            </div>
            </div>
            <Slider {...settings}>
             {videos[channel.channel_name]?.map((video)=>(
              <div key={video.video_id}>
                <a href={video.link} target='_blank' rel="noopener noreferrer">
                  <img src={video.thumbnailurl} alt={video.title}/>
                  <p>{video.title}</p>
                </a>
              </div>
             ))}
            </Slider>
            </div>
        ))}
    </div>
    </div>
  )

}

export default VideoSlider;
