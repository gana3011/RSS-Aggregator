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
          const data = response.data.channels.map(channel => {
            let formattedSubscribers;
          
            if (channel.subscribers < 1_000_000) {
              formattedSubscribers = (channel.subscribers / 1_000).toFixed(1) + "K";
            } else {
              formattedSubscribers = (channel.subscribers / 1_000_000).toFixed(1) + "M";
            }
          
            return { ...channel, subscribers: formattedSubscribers };
          });
          
          setChannels(data);
        } else {
          console.error("Unexpected response structure:", response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    fetchChannel();
  },[refresh]);

// useEffect(()=>{
//   const data = channels.map(channel=>{
//     if(channel.subscribers<1000000){
//       channel.subscribers/=1000
//       channel.subscribers.toString() + "K";
//     }
//     else{
//       channel.subscribers/=1000000 
//       channel.subscribers.toString() + "M";
//     }
//   })
//   setChannels(data);
// },[channels]);


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
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
            <a href={channel.channel_url} target='_blank' rel='noopener noreferrer'><h2 className='text-rose-600 text-xl font-semibold'>{channel.channel_name}</h2></a>
            <p><strong>Subscribers:</strong>{channel.subscribers}</p>
            </div>
            </div>
            <Slider {...settings}>
             {videos[channel.channel_name]?.map((video)=>(
              <div>
              <div key={video.video_id}>
                <a href={video.link} target='_blank' rel="noopener noreferrer">
                  <img src={video.thumbnailurl} alt={video.title}/>
                  <p>{video.title}</p>
                </a>
              </div>
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
