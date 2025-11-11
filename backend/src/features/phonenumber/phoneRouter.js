import express from 'express';
import phoneController from './phoneController.js';
import authMiddleware from "../../middelwares/jwtVerification.js";
import userController from '../users/usercontroller.js';
const phoneRouter = express.Router();
phoneRouter.get('/phone',authMiddleware,userController.deductBalence,phoneController.checkPhone);


export default phoneRouter;
