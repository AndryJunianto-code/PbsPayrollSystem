import express from 'express'
import { addSales, deleteSales, getAllSalesByMonth, getSalesByWeek, getTotalSalesYearly, updateSales } from '../controllers/salesController.js';
const salesRouter = express.Router();

salesRouter.get('/getAllSalesByMonth/:month/:year', getAllSalesByMonth);
salesRouter.get('/getTotalSalesYearly/:year', getTotalSalesYearly);
salesRouter.get('/getAllSales/:salesWeek', getSalesByWeek);
salesRouter.post('/', addSales);
salesRouter.put('/:id', updateSales);
salesRouter.delete('/:id', deleteSales);

export default salesRouter;