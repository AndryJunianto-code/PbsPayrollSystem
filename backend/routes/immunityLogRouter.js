import express from 'express'
import { addImmunityLog, getImmunityLogOnDate } from '../controllers/immunityLogController.js';
const immunityLogRouter = express.Router();

immunityLogRouter.get('/onDate/:date', getImmunityLogOnDate);
immunityLogRouter.post('/', addImmunityLog);

export default immunityLogRouter;