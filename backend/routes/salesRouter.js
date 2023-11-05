import express from 'express'
import { addSales, getAllSales, getSalesByWeek, updateSales } from '../controllers/salesController.js';
const salesRouter = express.Router();

salesRouter.get('/getAllSales', getAllSales);
salesRouter.get('/getAllSales/:salesWeek', getSalesByWeek);
salesRouter.post('/', addSales);
salesRouter.put('/:id', updateSales);

export default salesRouter;