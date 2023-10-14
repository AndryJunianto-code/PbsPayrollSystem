import { addEmployee, getAllEmployee, updateEmployee } from '../controllers/employeeController.js';
import express from 'express'
const employeeRouter = express.Router();

employeeRouter.get('/getAllEmployee', getAllEmployee);
employeeRouter.post('/', addEmployee);
employeeRouter.put("/:id", updateEmployee);

export default employeeRouter;