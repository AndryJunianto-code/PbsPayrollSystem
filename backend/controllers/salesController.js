import db from "../models/index.js";

const Sales = db.sales;
const Employee = db.employee;

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
    const allSales = await Sales.findAll({
      include: [
        {
          model: Employee,
          as: "employee",
        },
      ],
    });

    const flattenedData = allSales.map((log) => {
      const {
        id,
        salesDate,
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
        salesDate,
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
