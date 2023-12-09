import express from 'express'
import { addPayslip, deletePayslip, generatePayslipPdf, getAllPayslipByMonth, getTotalIncomeByMonth } from '../controllers/payslipController.js';
const payslipRouter = express.Router();

payslipRouter.post('/', addPayslip);
payslipRouter.post('/generatePdf', generatePayslipPdf)
payslipRouter.get('/getAllPayslipByMonth/:monthYear', getAllPayslipByMonth);
payslipRouter.get('/getTotalIncomeByMonth/:monthYear', getTotalIncomeByMonth);
payslipRouter.delete('/:id', deletePayslip);

export default payslipRouter;