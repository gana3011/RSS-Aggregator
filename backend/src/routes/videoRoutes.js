import express from 'express';
import {getVideos} from '../controllers/videoController.js';
import { RequireAuth } from '../middlewares/require-auth.js';

const router = express.Router({mergeParams: true});

router.get("/videos", RequireAuth, getVideos);

export default router;