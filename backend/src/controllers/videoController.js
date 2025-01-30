import { pool } from "../utils/database.js";


export const getVideos  = async (req,res) => {
   const channelId = req.params.channelId;
   
   if(!channelId ){
    return res.status(400).send({message:"Invalid Channel Id"});
   }

   try {
    const videos = await pool.query('select * from videos where channel_id  = $1',[channelId]);
    if(videos.rowCount > 0){
        return res.status(200).send({message:"Videos fetched successfully", videos: videos.rows});
    }
   } catch (error) {
    return res.status(500).send({error: "Unable to fetch videos"});
   }
   
}

