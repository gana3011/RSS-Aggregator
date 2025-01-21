import express from 'express';
import { saveVideos } from '../controllers/videoController.js';

const router = express.Router();

router.post("/:channelId/videos",saveVideos);

export default router;