import db from "../models/index.js";
import { Op } from "sequelize";

const Sales = db.sales;
const Employee = db.employee;
const sequelize = db.sequelize;

export const addSales = async (req, res) => {
  try {
    const newSales = await Sales.create(req.body);
    res.status(200).json(newSales);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteSales = async (req, res) => {
  try {
    await Sales.destroy({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json("Success: Record deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTotalSalesYearly = async(req,res)=> {
  try {
    const allSales = await Sales.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('salesAmount')), 'totalSales'],
        [sequelize.fn('MONTH', sequelize.col('date')), 'month'],
      ],
      where: {
        date: {
          [Op.between]: [
            new Date(req.params.year, 0, 1),
            new Date(req.params.year, 11, 31, 23, 59, 59, 999), // Set the end of the last day
          ],
        }
      },
      group: [sequelize.fn('MONTH', sequelize.col('date'))],
      raw: true, // Ensure raw results
      order: sequelize.literal('month ASC'), // Use sequelize.literal for ordering
    });
   
    res.status(200).json(allSales);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const getAllSalesByMonth = async (req, res) => {
  try {
    const allSales = await Sales.findAll({
      where: {
        date: {
          [Op.between]: [
            new Date(req.params.year, req.params.month - 1, 1),
            new Date(req.params.year, req.params.month, 0, 23, 59, 59, 999), // Set the end of the last day
          ],
        }
      },
      include: [
        {
          model: Employee,
          as: "employee",
          required:false
        },
      ],
    });

    const flattenedData = allSales.map((log) => {
      const {
        id,
        date,
        salesWeek,
        customerName,
        companyName,
        phoneNumber,
        productName,
        salesAmount,
        remarks,
        employee,
      } = log;
      return {
        id,
        date,
        salesWeek,
        customerName,
        companyName,
        phoneNumber,
        productName,
        salesAmount,
        remarks,
        employeeId: employee.id,
        employeeName: employee.name,
      };
    });
    res.status(200).json(flattenedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSalesByWeek = async (req, res) => {
  const { salesWeek } = req.params;
  try {
    const allSales = await Sales.findAll({
      where: { salesWeek },
      include: [
        {
          model: Employee,
          as: "employee",
        },
      ],
    });
    const result = Object.values(
      allSales.reduce((acc, curr) => {
        const { employee, salesAmount } = curr;
        if (!acc[employee.id]) {
          acc[employee.id] = {
            employeeId: employee.id,
            employeeName: employee.name,
            salesAmount: 0,
          };
        }

        acc[employee.id].salesAmount += salesAmount;
        return acc;
      }, {})
    );
    res.status(200).json(result);
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
