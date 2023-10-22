import { addEmployee, getAllEmployee, getAllEmployeeId, updateEmployee } from '../controllers/employeeController.js';
import express from 'express'
const employeeRouter = express.Router();

employeeRouter.get('/getAllEmployee', getAllEmployee);
employeeRouter.get('/getAllEmployeeId', getAllEmployeeId);
employeeRouter.post('/', addEmployee);
employeeRouter.put("/:id", updateEmployee);

export default employeeRouter;