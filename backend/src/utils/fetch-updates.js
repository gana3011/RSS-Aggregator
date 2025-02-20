import { pool } from "./database.js";
import { fetchChannelDetails } from "./fetch-channel-details.js";
import { fetchVideos } from "./fetch-videos.js";
import { fetchProfile } from "./fetch-profile.js";
import { fetchSubscribers } from "./fetch-subscribers.js";

export const fetchUpdates = async(userId)=>{
    try {
        const user_channels = await pool.query("SELECT c.channel_id, c.rss_id FROM user_channels uc JOIN channels c ON uc.channel_id = c.channel_id WHERE uc.user_id = $1",[userId]);
        const channels = user_channels.rows;
        const results= await Promise.all(
            channels.map(async(channel)=>{
                const channelUpdates = await fetchChannelUpdates(channel.rss_id);
                const videoUpdates = await fetchVideoUpdates(channel.rss_id, channel.channel_id);
                return {channelUpdates,videoUpdates};
            })
        )
    } catch (error) {
        console.error(error.message);
    }
   
}

const fetchVideoUpdates = async (rssId, channelId) => {
    const maxVideos = 15;
    try {
        const videos = await fetchVideos(rssId);

        await Promise.all(videos.map(async (video) => {
            const { id, title, link, published, thumbnailUrl, views } = video;

            // Check if video exists
            const existingVideo = await pool.query(
                "SELECT video_id FROM videos WHERE video_id = $1", 
                [id]
            );

            if (existingVideo.rowCount > 0) {
                // Update existing video
                await pool.query(
                    `UPDATE videos 
                     SET title=$1, link=$2, thumbnailurl=$3, views=$4 
                     WHERE video_id=$5`,
                    [title, link, thumbnailUrl, views, id]
                );
            } else {
                // Insert new video
                await pool.query(
                    `INSERT INTO videos (video_id, channel_id, title, link, thumbnailurl, views, published) 
                     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                    [id, channelId, title, link, thumbnailUrl, views, published]
                );
            }
        }));

        // Keep only latest `maxVideos` (Delete excess videos)
        await pool.query(
            `DELETE FROM videos 
             WHERE video_id IN (
                SELECT video_id FROM videos 
                WHERE channel_id = $1 
                ORDER BY published ASC 
                OFFSET $2
             )`,
            [channelId, maxVideos]
        );

        return { message: `Video updates processed for ${channelId}` };
    } catch (error) {
        console.error("Error in fetchVideoUpdates:", error.message);
        return { message: "Unable to update or insert videos" };
    }
};


const fetchChannelUpdates = async(rssId) =>{
    try {
        const details = await fetchChannelDetails(rssId);
        const{channelName, channelUrl} = details;
        const subscribers = await fetchSubscribers(rssId);
        const profile = await fetchProfile(rssId);
        await pool.query("update channels set channel_url=$1, channel_name=$2, subscribers=$3, profile=$4 where rss_id=$5",[channelUrl,channelName,subscribers,profile,rssId]);
        return { message: `Channel details updated for ${channelName}`};

    } catch (error) {
        console.error(error.message);
        return { message: "Failed to update channel details" };
    }
}
