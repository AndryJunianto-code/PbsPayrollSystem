import db from "../models/index.js";
import puppeteer from 'puppeteer';

const Payslip = db.payslip;
const Employee = db.employee;

export const generatePayslipPdf = async(req,res) => {
  try{
    const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const { employeeName, employeeID, netSalary } = req.body;
  const payslipHTML = `<div className="payslip">
  <h2>Pay Slip</h2>
  <table className="table">
    <tbody>
      <tr>
        <td>Employee Name:</td>
        <td>${employeeName}</td>
      </tr>
      <tr>
        <td>Employee ID:</td>
        <td>${employeeID}</td>
      </tr>
      <tr>
        <td>Salary:</td>
        <td>${netSalary}</td>
      </tr>
    </tbody>
  </table>
</div>`; 
await page.setContent(payslipHTML, { waitUntil: 'domcontentloaded' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=payslip.pdf');
  res.send(pdfBuffer);

  } catch(err) {  
    res.status(500).json(err);
  }
}

export const addPayslip = async (req, res) => {
  try {
    const newPayslip = await Payslip.create(req.body);
    res.status(200).json(newPayslip);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllPayslip = async (req,res) => {
  try{
      const allPayslip = await Payslip.findAll({
          include:[{
              model:Employee,
              as:'employee',
          }]
      })

      const flattenedData = allPayslip.map(log=> {
        const {id,date,basicSalary,totalCommision,totalDeduction,netSalary,status,employee} = log;
        return {
          id,date,basicSalary,totalCommision,totalDeduction,netSalary,status,employeeId:employee.id,employeeName:employee.name
        }
      })
      res.status(200).json(flattenedData);
  } catch(err) {
      res.status(500).json(err);
  }
}

