import db from "../models/index.js";

const Sales = db.sales;

export const addSales = async (req, res) => {
    try {
      const newSales = await Sales.create(req.body);
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

export const updateSales = async (req, res) => {
  let id = req.params.id;
  const updatedSales = await Sales.update(req.body, {
    where: { id },
    returning: true,
  });
  res.status(200).json(updatedSales);
};