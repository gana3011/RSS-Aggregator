import axios from "axios";

export const fetchChannelId = async (name, url) => {
  const apiKey = process.env.YT_API_KEY;

  // Check if the URL already contains the channelId
  const channelMatch = url.match(/youtube\.com\/channel\/([a-zA-Z0-9_-]+)/);
  if (channelMatch) {
    return channelMatch[1]; // Return the channelId directly
  }

  // Check if it's a handle or custom channel URL
  const usernameMatch = url.match(/youtube\.com\/(?:c\/|@)([a-zA-Z0-9_-]+)/);

  if (usernameMatch) {
    const username = usernameMatch[1];

    // Use the YouTube API Search endpoint to find the channelId
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search`,
      {
        params: {
          part: "snippet",
          q: username, 
          type: "channel",
          key: apiKey,
        },
      }
    );

    if (response.data.items && response.data.items.length > 0) {
        const channel = response.data.items.find(
            (item) => item.snippet.title === name
          );
          if (channel) {
            return channel.snippet.channelId;
          }
        }
    }


  // If the URL is in user format (e.g., /user/)
  const userMatch = url.match(/youtube\.com\/user\/([a-zA-Z0-9_-]+)/);
  if (userMatch) {
    const username = userMatch[1];

    // Use the YouTube API Channels endpoint to find the channelId
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels`,
      {
        params: {
          part: "id",
          forUsername: username,
          key: apiKey,
        },
      }
    );

    if (response.data.items && response.data.items.length > 0) {
      return response.data.items[0].id;
    }
  }

  throw new Error("Unable to extract channelId from the URL.");
};



