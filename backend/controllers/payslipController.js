import db from "../models/index.js";
import puppeteer from "puppeteer";
import { Op } from "sequelize";

const Payslip = db.payslip;
const Employee = db.employee;
const Adjustment = db.adjustment;
const sequelize = db.sequelize;

export const generatePayslipPdf = async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const payslipHTML = req.body.html;
    await page.setContent(payslipHTML, { waitUntil: "domcontentloaded" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=payslip.pdf");
    res.send(pdfBuffer);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addPayslip = async (req, res) => {
  try {
    const newPayslip = await Payslip.create(req.body);
    res.status(200).json(newPayslip);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updatePayslip = async (req, res) => {
  try {
    let id = req.params.id;
  const updatedPayslip = await Payslip.update(req.body, {
    where: { id },
    returning: true,
  });
  res.status(200).json(updatedPayslip);
  } catch(err) {
    res.status(500).json('Duplicate')
  }
  
};

export const getAllPayslipByMonth = async (req, res) => {
  try {
    const allPayslip = await Payslip.findAll({
      where: {
        monthYear:req.params.monthYear
      },
      include: [
        {
          model: Employee,
          required:false,
        },
        {
          model: Adjustment,
          required:false,
        }
      ],
    });

    const flattenedData = allPayslip.map((log) => {
      const {
        id,
        date,
        basicSalary,
        commision,
        deduction,
        netSalary,
        status,
        employee,
        adjustments
      } = log;
      let netAdjustment = adjustments.reduce((total,adj)=> total + adj.amount,0)
      return {
        id,
        date,
        basicSalary,
        commision,
        deduction,
        netSalary,
        status,
        employeeId: employee.id,
        employeeName: employee.name,
        phoneNumber:employee.phoneNumber,
        netAdjustment,
        adjustments,
      };
    });
    res.status(200).json(flattenedData);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTotalIncomeByMonth = async (req, res) => {
  try {
    const allPayslip = await Payslip.findAll({
      where: {
        monthYear:req.params.monthYear
      },
    });

    const totalNetSalary = allPayslip.reduce((total,payslip)=>total + payslip.netSalary,0);
    const totalCommision = allPayslip.reduce((total,payslip)=>total + payslip.commision,0);
    const totalBaseSalary = totalNetSalary-totalCommision
    res.status(200).json({totalNetSalary,totalCommision,totalBaseSalary});
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getTotalPayslipYearly = async(req,res)=> {
  try {
    const allPayslip = await Payslip.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.col('netSalary')), 'totalSalary'],
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
      order: sequelize.literal('month ASC'), 
      logging:console.log,  
    });
   
    res.status(200).json(allPayslip);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const deletePayslip = async (req, res) => {
  try {
    await Payslip.destroy({
      where: {
        id: req.params.id
      },
    });

    res.status(200).json("Success: Record deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};


