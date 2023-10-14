import express from 'express';
import { addPosition, getAllPosition, updatePosition } from '../controllers/positionController.js';

const positionRouter = express.Router();

positionRouter.get('/getAllPosition', getAllPosition);
positionRouter.post('/', addPosition);
positionRouter.put("/:id", updatePosition);

export default positionRouter;

