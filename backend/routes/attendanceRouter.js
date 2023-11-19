import { addAttendance, getAttendanceOnDate, getAttendanceOnMonth, updateAllAttendance } from '../controllers/attendanceController.js';
import express from 'express'
const attendanceRouter = express.Router();

attendanceRouter.get('/onDate/:date', getAttendanceOnDate);
attendanceRouter.get('/onMonth/:month/:year/:employeeId', getAttendanceOnMonth);
attendanceRouter.post('/', addAttendance);
attendanceRouter.put('/updateAll', updateAllAttendance);

export default attendanceRouter;