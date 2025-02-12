import express from 'express';
import { body } from 'express-validator';
import { RequestValidation } from '../middlewares/request-validation.js';
import { fetchChannels, saveChannels } from '../controllers/channelController.js';
import { RequireAuth } from '../middlewares/require-auth.js';

const router = express.Router({mergeParams: true});

router.post("/channels",[body("url").notEmpty().isURL().withMessage("Enter valid Url")], RequestValidation,RequireAuth, saveChannels)

router.get("/channels", RequireAuth, fetchChannels);

export default router;