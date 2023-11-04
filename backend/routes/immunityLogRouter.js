import express from 'express'
import { addImmunityLog, deleteImmunityLog, getImmunityLogOnWeek } from '../controllers/immunityLogController.js';
const immunityLogRouter = express.Router();

immunityLogRouter.get('/onWeek/:week', getImmunityLogOnWeek);
immunityLogRouter.post('/', addImmunityLog);
immunityLogRouter.delete('/:id', deleteImmunityLog);

export default immunityLogRouter;