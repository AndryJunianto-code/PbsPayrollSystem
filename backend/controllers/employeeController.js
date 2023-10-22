import db from '../models/index.js';

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

export const getAllEmployee = async (req,res) => {
    try{
        const allEmployee = await Employee.findAll({
            include:[{
                model:Position,
                as:'position',
                attributes: ['title']
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