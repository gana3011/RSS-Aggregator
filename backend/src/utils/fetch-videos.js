import axios from 'axios';
import xml2js from 'xml2js';

export const fetchVideos = async(rssId) =>{
    const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${rssId}`;
    const response = await axios.get(rss);
    const parser = new xml2js.Parser({explicitArray:false});
    const result = await parser.parseStringPromise(response.data);
    const entries = result.feed.entry;
    const videos = [];
    entries.forEach(video => {
        const id = video["yt:videoId"];
        const title = video.title;
        const link = video.link.$.href
        const published = video.published;
        const mediaGroup = video["media:group"];
        const thumbnailUrl = mediaGroup["media:thumbnail"].$.url;
        const views = mediaGroup["media:community"]["media:statistics"].$.views;
        videos.push({id,title,link,published,thumbnailUrl,views});
    });
    return videos;
}
