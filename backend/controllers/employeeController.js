import db from '../models/index.js';
import puppeteer from "puppeteer";

const Employee = db.employee;
const Position = db.position;

export const addEmployee = async (req,res) => {
    try{
        const newEmployee = await Employee.create(req.body)
        res.status(200).json(newEmployee);
    } catch(err) {
        res.status(500).json(err);
    }
}

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

export const getAllEmployee = async (req,res) => {
    try{
        const allEmployee = await Employee.findAll({
            include:[{
                model:Position,
                as:'position',
            }]
        })
        res.status(200).json(allEmployee);
    } catch(err) {
        res.status(500).json(err);
    }
}

export const getAllEmployeeId = async (req,res) => {
    try{
        const allEmployee = await Employee.findAll({
            attributes:['id','name']
        })
        res.status(200).json(allEmployee);
    } catch(err) {
        res.status(500).json(err);
    }
}

export const updateEmployee = async(req,res) => {
    let id = req.params.id
    const updatedEmployee = await Employee.update(req.body, {where: {id},returning:true})
    res.status(200).json(updatedEmployee);
}