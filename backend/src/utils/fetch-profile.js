import axios from 'axios';

export const fetchProfile = async(channelId) =>{
    const apiKey = process.env.YT_API_KEY;
    try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`);
        if (response.data.items.length > 0) {
            const profile = response.data.items[0].snippet.thumbnails.default.url;
            return profile;
        } else {
            console.log("Channel not found");
        }
        
    } catch (error) {
        console.error(error);
        return {message:"Unable to fetch profile pic"};
    }
}
