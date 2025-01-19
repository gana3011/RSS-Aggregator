import { pool } from '../utils/database.js';
import { fetchChannelDetails } from '../utils/fetch-channel-details.js';

export const saveChannels = async(req, res)=>{
    const idWithColon = req.params.id; 
    const id = parseInt(idWithColon.slice(1), 10); 

    const {url} = req.body;
    if (!url || typeof url !== 'string') {
        return res.status(400).send({ error: "Invalid or missing 'url' in request body." });
    }
    
    try {
        const {channelId, channelName, channelUrl} = await fetchChannelDetails(url);
        const existingChannel = await pool.query("select * from channels where channel_id = $1",[channelId]);
        if(existingChannel.rows.length == 0){
            await pool.query("insert into channels(channel_id,channel_url,channel_name) values($1,$2,$3)",[channelId, channelUrl, channelName]);
        } 
        const user_channel = await pool.query("insert into user_channels (user_id,channel_id) values ($1,$2) on conflict(user_id, channel_id) do nothing",[id, channelId]);
        if(user_channel.rowCount > 0){
            return res.status(200).send({ message: 'Channel added successfully to the user' });
        } else {
            return res.status(200).send({ message: 'Channel already linked to user' });
        }
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send({error: "Unable to fetch"});
    }
}

