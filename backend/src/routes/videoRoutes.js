import express from 'express';
import {getVideos} from '../controllers/videoController.js';
// import { RequireAuth } from '../middlewares/require-auth.js';
import { CheckAuth } from '../middlewares/check-auth.js';

const router = express.Router({mergeParams: true});

router.get("/videos", CheckAuth, getVideos);

export default router;