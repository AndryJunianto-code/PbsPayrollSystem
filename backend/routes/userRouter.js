import express from 'express'
import { verifyUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/verifyUser/:username', verifyUser);

export default userRouter;