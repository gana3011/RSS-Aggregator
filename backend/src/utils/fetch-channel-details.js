import axios from 'axios';
import xml2js from 'xml2js';

export const fetchChannelDetails = async (rssId) =>{
    const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${rssId}`;
    try {
        const response = await axios.get(rss);
        const parser = new xml2js.Parser({explicitArray:false});
        const result = await parser.parseStringPromise(response.data);
        const channelId = result.feed["yt:channelId"];
        const channelUrl = result.feed.author.uri;
        const channelName = result.feed.author.name;
        return {channelId, channelName, channelUrl};
    } catch (error) {
        console.error(error.message);
        return ({error:"Unable to fetch channel details"});
    }
   
}