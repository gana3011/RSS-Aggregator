import axios from 'axios';
import xml2js from 'xml2js';

export const fetchVideos = async(rss) =>{
    const response = await axios.get(rss);
    const parser = new xml2js.Parser({explicitArray:false});
    const result = await parser.parseStringPromise(response.data);
}