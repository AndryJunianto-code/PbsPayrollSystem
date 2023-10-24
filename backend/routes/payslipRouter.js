import express from 'express'
import { addPayslip, generatePayslipPdf, getAllPayslip } from '../controllers/payslipController.js';
const payslipRouter = express.Router();

payslipRouter.post('/', addPayslip);
payslipRouter.post('/generatePdf', generatePayslipPdf)
payslipRouter.get('/getAllPayslip', getAllPayslip);

export default payslipRouter;