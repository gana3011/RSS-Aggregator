import express from 'express';
import { body } from 'express-validator';
import { RequestValidation } from '../middlewares/request-validation.js';
import { fetchChannels, saveChannels } from '../controllers/channelController.js';
// import { RequireAuth } from '../middlewares/require-auth.js';
import { CheckAuth } from '../middlewares/check-auth.js';

const router = express.Router({mergeParams: true});

router.post("/channels",[body("url").notEmpty().isURL().withMessage("Enter valid Url")], RequestValidation, CheckAuth , saveChannels)

router.get("/channels", CheckAuth , fetchChannels);

export default router;