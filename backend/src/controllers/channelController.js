import { pool } from '../utils/database.js';
import { fetchChannelDetails } from '../utils/fetch-channel-details.js';
import { fetchChannelId } from '../utils/fetch-channel-id.js';
import { fetchVideos } from '../utils/fetch-videos.js';

export const saveChannels = async(req, res)=>{

    const id= req.params.id; 
    
    const {name, url} = req.body;

    if ((!url || typeof url !== 'string') && (!name || typeof name != 'string')) {
        return res.status(400).send({ error: "Invalid or missing 'url' in request body." });
    }
    
    try {
        const rssId = await fetchChannelId(name, url);
        const client = await pool.connect();
        try {
            client.query('begin');

            const {channelId, channelName, channelUrl} = await fetchChannelDetails(rssId);
        
            const channel = await client.query("insert into channels(channel_id,channel_url,channel_name) values($1,$2,$3) on conflict (channel_id) do update set channel_url = excluded.channel_url, channel_name = excluded.channel_name",[channelId, channelUrl, channelName]);
            const user_channel = await client.query("insert into user_channels (user_id,channel_id) values ($1,$2) on conflict(user_id, channel_id) do nothing",[id, channelId]);

            const videos = await fetchVideos(rssId);

            for(let video of videos){
                const {id, title, link, thumbnailUrl, views} = video;
                const query = await client.query("insert into videos(video_id, channel_id, title, link, thumbnailUrl, views) values ($1,$2,$3,$4,$5,$6) on conflict(video_id) do update set title = excluded.title, link = excluded.link, thumbnailUrl = excluded.thumbnailUrl, views = excluded.views",[id, channelId, title, link, thumbnailUrl, views]);
            }
            client.query('commit');
            res.status(200).send({message: "Channels and Videos added successfully", rssId, channelId});
        }catch (error) {
            await client.query('rollback');
            throw error;
        }
        finally{
            client.release();
        }
        
    } catch (error) {
        console.error(error.stack);
        return res.status(500).send({error: "Unable to add channels and videos"});
    }
    
}



