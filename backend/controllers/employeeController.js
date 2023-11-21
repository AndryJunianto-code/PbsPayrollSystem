import db from "../models/index.js";
import puppeteer from "puppeteer";
import { Op, Sequelize } from "sequelize";
import attendanceModel from "../models/attendanceModel.js";

const Employee = db.employee;
const Position = db.position;
const ImmunityLog = db.immunityLog;
const Sales = db.sales;
const Attendance = db.attendance;
const EmployeePositionHistory = db.employeePositionHistory;

export const addEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(200).json(newEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const generateEmployeePdf = async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const employeeHtml = req.body.html;
    await page.setContent(employeeHtml, { waitUntil: "domcontentloaded" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });
    
    await browser.close();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=employee.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllEmployee = async (req, res) => {
  try {
    const employeesWithLatestPosition = await Employee.findAll({
      include: [
        {
          model: EmployeePositionHistory,
          as: "employeePositionHistory",
          include: [
            {
              model: Position,
            },
          ],
        },
      ],
      order: [
        [
          "createdAt","DESC"
        ],
        [
          { model: EmployeePositionHistory, as: "employeePositionHistory"},
          "createdAt",
          "DESC",
        ],
      ],
    });
    res.status(200).json(employeesWithLatestPosition);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllEmployeeTrackRecords = async (req, res) => {
  try {
    const allEmployee = await Employee.findAll({
      include: [
        {
          model: EmployeePositionHistory,
          as: "employeePositionHistory",
          include: [
            {
              model: Position,
            },
          ],
        },
        {
          model: ImmunityLog,
          where: {
            week: req.params.week,
          },
          limit: 1,
        },
        {
          model: Sales,
          where: {
            salesWeek: req.params.week,
          },
          required: false,
        },
      ],
      order: [
        [
          "createdAt","DESC"
        ],
        [
          { model: EmployeePositionHistory, as: "employeePositionHistory" },
          "createdAt",
          "DESC",
        ],
      ],
    });

    const allEmployeeModified = allEmployee.map((employee) => {
      const immunityLog =
        employee.immunityLogs.length > 0 ? employee.immunityLogs[0] : null;
      const totalSalesAmount = employee.sales.reduce(
        (total, sale) => total + sale.salesAmount,
        0
      );
      return {
        id: employee.id,
        name: employee.name,
        position: employee.employeePositionHistory[0].position,
        immunityLog: immunityLog,
        totalSalesAmount,
      };
    });
    res.status(200).json(allEmployeeModified);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getSingleEmployeeTrackRecordsOnMonth = async(req,res)=> {
  try{
    const employee = await Employee.findByPk(req.params.employeeId, {
      include: [
        {
          model: EmployeePositionHistory,
          as: "employeePositionHistory",
          include: [
            {
              model: Position,
            },
          ],
        },
        {
          model: ImmunityLog,
          where: {
            date: {
              [Op.between]: [
                new Date(req.params.year, req.params.month - 1, 1),
                new Date(req.params.year, req.params.month, 0, 23, 59, 59, 999), // Set the end of the last day
              ],
            },
          },
          required: false,
        },
        {
          model: Attendance,
          where: {
            date: {
              [Op.between]: [
                new Date(req.params.year, req.params.month - 1, 1),
                new Date(req.params.year, req.params.month, 0, 23, 59, 59, 999), // Set the end of the last day
              ],
            },
          },
          required: false,
        }
      ],
      order: [
        [
          { model: EmployeePositionHistory, as: "employeePositionHistory" },
          "createdAt",
          "DESC",
        ],
      ],
    })
    const employeeJSON = employee.toJSON();
    const totalRevenuePoint = employeeJSON.immunityLogs.reduce(
      (total, log) => total + log.revenuePoint,
      0
    );
    const totalHours = employeeJSON.attendances.reduce(
      (totals, attendance) => {
        totals.totalWorkingHours += attendance.workingHour;
        totals.totalReimbursedHours += attendance.reimbursedHour;
        return totals;
      },
      { totalWorkingHours: 0, totalReimbursedHours: 0 }
    );
    employeeJSON.totalRevenuePoint = totalRevenuePoint;
    employeeJSON.totalHours = totalHours;
    res.status(200).json(employeeJSON);
  } catch(err) {
    res.status(500).json(err);
  }
  
}

export const getAllEmployeeId = async (req, res) => {
  try {
    const allEmployee = await Employee.findAll({
      attributes: ["id", "name"],
    });
    res.status(200).json(allEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateEmployee = async (req, res) => {
  let id = req.params.id;
  const updatedEmployee = await Employee.update(req.body, {
    where: { id },
    returning: true,
  });
  res.status(200).json(updatedEmployee);
};
