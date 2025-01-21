import { pool } from "../utils/database.js";
import { fetchVideos } from "../utils/fetch-videos.js";

export const saveVideos  = async (req,res) => {
    const channelId = req.params.channelId;
    
    try {
        const videos = await fetchVideos(channelId);
        let insertedCount = 0;
        for(let video of videos){
            const {id, title, link, thumbnailUrl, views} = video;
            const query = await pool.query("insert into videos(video_id, title, link, thumbnailUrl, views) values ($1,$2,$3,$4,$5)",[id, title, link, thumbnailUrl, views]);
            if(query.rowCount > 0){
                insertedCount++;
            }
        }
        if(insertedCount > 0){
            return res.status(200).send({message: "videos added successfully"});
        }
    } catch (error) {
        console.error(error.message);
    }
    
}

