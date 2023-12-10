import express from 'express'
import { addPayslip, deletePayslip, generatePayslipPdf, getAllPayslipByMonth, getTotalIncomeByMonth, getTotalPayslipYearly, updatePayslip } from '../controllers/payslipController.js';
const payslipRouter = express.Router();

payslipRouter.post('/', addPayslip);
payslipRouter.post('/generatePdf', generatePayslipPdf)
payslipRouter.get('/getAllPayslipByMonth/:monthYear', getAllPayslipByMonth);
payslipRouter.get('/getTotalIncomeByMonth/:monthYear', getTotalIncomeByMonth);
payslipRouter.get('/getTotalPayslipYearly/:year', getTotalPayslipYearly);
payslipRouter.delete('/:id', deletePayslip);
payslipRouter.put('/:id', updatePayslip);

export default payslipRouter;