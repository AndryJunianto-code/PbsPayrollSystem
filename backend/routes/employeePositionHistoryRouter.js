import express from 'express'
import { addEmployeePositionHistory } from '../controllers/employeePositionHistoryController.js';
const employeePositionHistoryRouter = express.Router();

employeePositionHistoryRouter.post('/', addEmployeePositionHistory);

export default employeePositionHistoryRouter;