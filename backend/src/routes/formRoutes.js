import express from 'express';
import { body } from 'express-validator';
import { RequestValidation } from '../middlewares/request-validation.js';
import { saveChannels } from '../controllers/formController.js';

const router = express.Router();

router.post("/:id/channels",[body("url").notEmpty().isURL().withMessage("Enter valid Url")], RequestValidation, saveChannels)

export default router;