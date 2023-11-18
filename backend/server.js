import express, {json, urlencoded } from 'express';
import mysql from 'mysql';
import cors from 'cors';
import employeeRouter from './routes/employeeRouter.js';
import positionRouter from './routes/positionRouter.js'
import salesRouter from './routes/salesRouter.js';
import attendanceRouter from './routes/attendanceRouter.js';
import immunityLogRouter from './routes/immunityLogRouter.js';
import payslipRouter from './routes/payslipRouter.js';
import employeePositionHistoryRouter from './routes/employeePositionHistoryRouter.js';
import dotenv from 'dotenv'

const app = express();
dotenv.config();
app.use(json());
app.use(urlencoded({extended:true}))
app.use(cors());

const db = mysql.createConnection({});

app.use('/api/employee', employeeRouter);
app.use('/api/position', positionRouter);
app.use('/api/sales', salesRouter);
app.use('/api/attendance', attendanceRouter)
app.use('/api/immunityLog', immunityLogRouter);
app.use('/api/payslip', payslipRouter);
app.use('/api/employeePositionHistory', employeePositionHistoryRouter);

app.listen(8800, () => {
    console.log('connected');
})