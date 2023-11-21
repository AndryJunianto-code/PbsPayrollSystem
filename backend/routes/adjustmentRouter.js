import express from 'express'
import {addAdjustment} from '../controllers/adjustmentController.js';
const adjustmentRouter = express.Router();

adjustmentRouter.post('/bulk', addAdjustment);

export default adjustmentRouter;