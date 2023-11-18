import express from 'express'
import { addBulkEmployeePositionHistory, addEmployeePositionHistory } from '../controllers/employeePositionHistoryController.js';
const employeePositionHistoryRouter = express.Router();

employeePositionHistoryRouter.post('/', addEmployeePositionHistory);
employeePositionHistoryRouter.post('/bulk', addBulkEmployeePositionHistory);

export default employeePositionHistoryRouter;