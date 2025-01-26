import axios from 'axios';

export const fetchChannelId = async(url) => {
    const apiKey = process.env.YT_API_KEY; 
    const link = url.split("/");
    const handle = link[3];

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${handle}&key=${apiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const channels = response.data.items;

        if (channels.length > 0) {
            const channelId = channels[0].id.channelId;
            return channelId;
        } else {
            console.log('Channel not found');
        }
    } catch (error) {
        console.error('Error fetching channel ID:', error.message);
    }
}

