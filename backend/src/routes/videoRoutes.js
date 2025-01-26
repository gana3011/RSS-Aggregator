import express from 'express';
import {getVideos} from '../controllers/videoController.js'

const router = express.Router({mergeParams: true});

router.get("/videos",getVideos);

export default router;