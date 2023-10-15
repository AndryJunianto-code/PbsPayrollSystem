import db from "../models/index.js";

const Sales = db.sales;

export const addSales = async (req, res) => {
    try {
      const {
       salesDate,salesAmount,customerName,companyName,phoneNumber,productName,remarks,employeeId
      } = req.body;
      let data = {
        sales_date:salesDate,sales_amount:salesAmount,customer_name:customerName,company_name:companyName,phone_number:phoneNumber,product_name:productName,remarks
      };
      const newSales = await Sales.create(data);
      res.status(200).json(newSales);
    } catch (err) {
      res.status(500).json(err);
    }
  };

export const getAllSales = async (req, res) => {
  try {
    const allSales = await Sales.findAll();
    res.status(200).json(allSales);
  } catch (err) {
    res.status(500).json(err);
  }
};
