import express from 'express'
import { addSales, getAllSales } from '../controllers/salesController.js';
const salesRouter = express.Router();

salesRouter.get('/getAllSales', getAllSales);
salesRouter.post('/', addSales);

export default salesRouter;