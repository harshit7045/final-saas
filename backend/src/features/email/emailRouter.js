import express from 'express';
import emailController from './emailController.js';
import authMiddleware from "../../middelwares/jwtVerification.js";
import userController from '../users/usercontroller.js';
const emailRouter = express.Router();
emailRouter.get('/email', authMiddleware,userController.deductBalence,emailController.checkEmail);


export default emailRouter;
