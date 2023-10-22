import { addAttendance, getAttendanceOnDate, updateAllAttendance } from '../controllers/attendanceController.js';
import express from 'express'
const attendanceRouter = express.Router();

attendanceRouter.get('/check/:date')
attendanceRouter.get('/onDate/:date', getAttendanceOnDate);
attendanceRouter.post('/', addAttendance);
attendanceRouter.put('/updateAll', updateAllAttendance);

export default attendanceRouter;