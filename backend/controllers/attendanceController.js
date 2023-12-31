import { Op } from "sequelize";
import db from "../models/index.js";

const Employee = db.employee;
const Attendance = db.attendance;
const sequelize = db.sequelize;

export const addAttendance = async (req, res) => {
  try {
    console.log(req.body);
    const newAttendance = await Attendance.bulkCreate(req.body);
    res.status(200).json(newAttendance);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAttendanceOnDate = async (req, res) => {
  try {
    const allAttendance = await Attendance.findAll({
      where: { date: req.params.date },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json(allAttendance);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAttendanceOnMonth = async (req, res) => {
  try {
    const allAttendance = await Attendance.findAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), req.params.month),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), req.params.year),
          { employeeId: req.params.employeeId },
        ],
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Employee,
          as: "employee",
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json(allAttendance);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateAllAttendance = async (req, res) => {
  const t = await sequelize.transaction(); // Start a new transaction

  try {
    // Perform bulk update within the transaction
    const allAttendance = await Attendance.bulkCreate(req.body.allAttendance, {
      updateOnDuplicate: ["date", "workingHour", "reimbursedHour", "status"],
      returning: true,
      transaction: t, // Pass the transaction object
    });

    // Commit the transaction if successful
    await t.commit();

    res.status(200).json(allAttendance);
  } catch (err) {
    // Roll back the transaction if there's an error
    await t.rollback();

    res.status(500).json(err);
  }
};
