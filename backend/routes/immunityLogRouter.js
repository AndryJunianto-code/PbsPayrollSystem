import express from 'express'
import { addImmunityLog, deleteImmunityLog, getImmunityLogOnDate } from '../controllers/immunityLogController.js';
const immunityLogRouter = express.Router();

immunityLogRouter.get('/onDate/:date', getImmunityLogOnDate);
immunityLogRouter.post('/', addImmunityLog);
immunityLogRouter.delete('/:id', deleteImmunityLog);

export default immunityLogRouter;