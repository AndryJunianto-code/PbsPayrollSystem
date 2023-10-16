import express from 'express'
import { addSales, getAllSales, updateSales } from '../controllers/salesController.js';
const salesRouter = express.Router();

salesRouter.get('/getAllSales', getAllSales);
salesRouter.post('/', addSales);
salesRouter.put('/:id', updateSales);

export default salesRouter;