import express from 'express';
import { body } from 'express-validator';
import { RequestValidation } from '../middlewares/request-validation.js';
import { fetchChannels, saveChannels } from '../controllers/channelController.js';

const router = express.Router({mergeParams: true});

router.post("/channels",[body("url").notEmpty().isURL().withMessage("Enter valid Url")], RequestValidation, saveChannels)

router.get("/channels", fetchChannels);

export default router;