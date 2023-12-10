import express from 'express'
import { addBulkImmunityLog, addImmunityLog, deleteImmunityLog, getImmunityLogOnWeek, updateImmunityLog } from '../controllers/immunityLogController.js';
const immunityLogRouter = express.Router();

immunityLogRouter.get('/onWeek/:week', getImmunityLogOnWeek);
immunityLogRouter.post('/', addImmunityLog);
immunityLogRouter.post('/bulk', addBulkImmunityLog);
immunityLogRouter.put('/:id', updateImmunityLog);
immunityLogRouter.delete('/:id', deleteImmunityLog);

export default immunityLogRouter;