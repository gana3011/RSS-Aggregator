import axios from "axios";

export const fetchSubscribers = async (channelId) =>{
    const apiKey = process.env.YT_API_KEY;
    try{
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels`, {
            params: {
              part: "statistics",
              id: channelId,
              key: apiKey,
            },
          });

          if(response.data.items && response.data.items.length>0){
            const {subscriberCount} = response.data.items[0].statistics;
            return subscriberCount;
          }
          else {
            throw new Error("No channel found for the provided ID.");
          }
    }

    catch (error) {
        throw new Error(`Failed to fetch subscriber count: ${error.response?.data?.error?.message || error.message}`);
      }
}