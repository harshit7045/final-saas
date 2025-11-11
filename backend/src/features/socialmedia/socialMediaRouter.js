
import express from 'express';
import socialMediaController from './socialMediaController.js';
import authMiddleware from "../../middelwares/jwtVerification.js";
import userController from '../users/usercontroller.js';
const socialMediaRouter = express.Router();
socialMediaRouter.get('/social',authMiddleware,userController.deductBalence,socialMediaController.checkSocialMedia);


export default socialMediaRouter;
