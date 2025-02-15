import { pool } from "./database.js";
import { fetchChannelDetails } from "./fetch-channel-details.js";
import { fetchVideos } from "./fetch-videos.js";
import { fetchProfile } from "./fetch-profile.js";
import { fetchSubscribers } from "./fetch-subscribers.js";

export const fetchUpdates = async(userId)=>{
    try {
        const user_channels = await pool.query("SELECT c.channel_id, c.rss_id FROM user_channels uc JOIN channels c ON uc.channel_id = c.channel_id WHERE uc.user_id = $1",[userId]);
        const channels = user_channels.rows;
        const results= await Promise.all(
            channels.map(async(channel)=>{
                const channelUpdates = await fetchChannelUpdates(channel.rss_id);
                const videoUpdates = await fetchVideoUpdates(channel.rss_id, channel.channel_id);
                return {channelUpdates,videoUpdates};
            })
        )
    } catch (error) {
        console.error(error.message);
    }
   
}

const fetchVideoUpdates  = async(rssId,channelId)=>{
    try {
        const videos = await fetchVideos(rssId);
        for(let video of videos){
            const {id,title, link, thumbnailUrl, views} = video;
            await pool.query("update videos set title=$1, link=$2, thumbnailurl=$3, views=$4 where video_id=$5",[ title, link, thumbnailUrl, views, id]);
        }
        return {message:`Video details updated for ${channelId}`};
    } catch (error) {
        console.error(error.message);
        return {message:"Unable to update videos"};
    }
}


const fetchChannelUpdates = async(rssId) =>{
    try {
        const details = await fetchChannelDetails(rssId);
        const{channelName, channelUrl} = details;
        const subscribers = await fetchSubscribers(rssId);
        const profile = await fetchProfile(rssId);
        await pool.query("update channels set channel_url=$1, channel_name=$2, subscribers=$3, profile=$4 where rss_id=$5",[channelUrl,channelName,subscribers,profile,rssId]);
        return { message: `Channel details updated for ${channelName}`};

    } catch (error) {
        console.error(error.message);
        return { message: "Failed to update channel details" };
    }
}

fetchUpdates(1);