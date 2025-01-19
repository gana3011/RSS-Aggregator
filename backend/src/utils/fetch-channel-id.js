import axios from 'axios';

async function fetchChannelId(handle) {
    const apiKey = process.env.YT_API_KEY; // Replace with your actual API key
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${handle}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const channels = response.data.items;

        if (channels.length > 0) {
            const channelId = channels[0].id.channelId;
            console.log(`Channel ID: ${channelId}`);
            return channelId;
        } else {
            console.log('Channel not found');
        }
    } catch (error) {
        console.error('Error fetching channel ID:', error.message);
    }
}

// Example usage:
fetchChannelId('@YeahTubeSathyeah');