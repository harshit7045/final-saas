import express from 'express';
import { upload, imageController } from './imageController.js'; // Adjust the path as necessary
import authMiddleware from "../../middelwares/jwtVerification.js";
const imageRouter = express.Router();

imageRouter.post('/upload', upload.single('avatar'), imageController.uploadImage);

export default imageRouter;
