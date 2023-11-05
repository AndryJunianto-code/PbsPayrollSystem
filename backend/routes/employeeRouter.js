import { addEmployee, generateEmployeePdf, getAllEmployee, getAllEmployeeId, getAllEmployeeTrackRecords, updateEmployee } from '../controllers/employeeController.js';
import express from 'express'
const employeeRouter = express.Router();

employeeRouter.get('/getAllEmployee', getAllEmployee);
employeeRouter.get('/getAllEmployeeId', getAllEmployeeId);
employeeRouter.get('/getAllEmployeeTrackRecords/:week', getAllEmployeeTrackRecords);
employeeRouter.post('/', addEmployee);
employeeRouter.post('/generatePdf', generateEmployeePdf);
employeeRouter.put("/:id", updateEmployee);

export default employeeRouter;