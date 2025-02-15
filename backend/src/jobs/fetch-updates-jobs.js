import cron from 'node-cron';
import { fetchUpdates } from '../utils/fetch-updates.js';
import { pool } from '../utils/database.js';

export const startCronJob = ()=>{
    cron.schedule("*/5 * * * *", async()=>{
        console.log("running scheduled updates");
        try {
            const { rows: users } = await pool.query("SELECT DISTINCT user_id FROM user_channels");
            for (const user of users) {
                await fetchUpdates(user.user_id);
                console.log(`Fetched updates for user: ${user.user_id}`);
            }
        } catch (error) {
            console.error(error);
        }
    })
}