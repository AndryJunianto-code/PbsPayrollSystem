import db from '../models/index.js';

const Employee = db.employee;
const Position = db.position;

export const addEmployee = async (req,res) => {
    try{
        const {name,gender,dob,nik,phoneNumber,joinedDate,positionId} = req.body;
        let data = {
            name,gender,dob,nik,positionId,phone_number:phoneNumber,joined_date:joinedDate,
        }
        const newEmployee = await Employee.create(data)
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

export const updateEmployee = async(req,res) => {
    const {name,gender,dob,nik,phoneNumber,joinedDate,positionId} = req.body;
    let id = req.params.id
    let data = {
        name,gender,dob,nik,positionId,phone_number:phoneNumber,joined_date:joinedDate,
    }
    const updatedEmployee = await Employee.update(data, {where: {id},returning:true})
    res.status(200).json(updatedEmployee);
}