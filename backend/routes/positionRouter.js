import express from 'express';
import { addPosition, getAllPosition, getOnePosition, updatePosition } from '../controllers/positionController.js';

const positionRouter = express.Router();

positionRouter.get('/getOnePosition',getOnePosition);
positionRouter.get('/getAllPosition', getAllPosition);
positionRouter.post('/', addPosition);
positionRouter.put("/:id", updatePosition);

export default positionRouter;

