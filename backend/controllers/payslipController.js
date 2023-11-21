import db from "../models/index.js";
import puppeteer from "puppeteer";

const Payslip = db.payslip;
const Employee = db.employee;
const Adjustment = db.adjustment;

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

export const getAllPayslip = async (req, res) => {
  try {
    const allPayslip = await Payslip.findAll({
      include: [
        {
          model: Employee,
        },
        {
          model: Adjustment,
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
