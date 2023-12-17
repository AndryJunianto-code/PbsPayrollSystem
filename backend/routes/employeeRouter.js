import { addEmployee, generateEmployeePdf, getAllEmployee, getAllEmployeeId, getAllEmployeeTrackRecords, getAllJournal, getAllJournalFilter, getSingleEmployeeDashboard, getSingleEmployeeTrackRecordsOnMonth, updateEmployee } from '../controllers/employeeController.js';
import express from 'express'
const employeeRouter = express.Router();

employeeRouter.get('/getAllEmployee', getAllEmployee);
employeeRouter.get('/getAllEmployeeId', getAllEmployeeId);
employeeRouter.get('/getAllEmployeeTrackRecords/:week', getAllEmployeeTrackRecords);
employeeRouter.get('/getSingleEmployeeTrackRecordsOnMonth/:employeeId/:year/:month', getSingleEmployeeTrackRecordsOnMonth);
employeeRouter.get('/getSingleEmployeeDashboard/:employeeId/:year/:month', getSingleEmployeeDashboard);
employeeRouter.get('/getAllJournal', getAllJournal);
employeeRouter.get('/getAllJournalFilter/:fromDate/:toDate', getAllJournalFilter);
employeeRouter.post('/', addEmployee);
employeeRouter.post('/generatePdf', generateEmployeePdf);
employeeRouter.put("/:id", updateEmployee);

export default employeeRouter;