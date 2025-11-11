import express from 'express';
import userController from './usercontroller.js';
import authMiddleware from "../../middelwares/jwtVerification.js";
const userRouter = express.Router();
userRouter.post('/signup',userController.createUser);
userRouter.post('/login',userController.signinUser);
userRouter.get('/user',authMiddleware,userController.getUser);
userRouter.patch('/wallet',authMiddleware,userController.updateWalletBalance);

export default userRouter;
