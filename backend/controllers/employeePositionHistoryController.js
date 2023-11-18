import db from "../models/index.js";

const Employee = db.employee;
const Position = db.position;
const EmployeePositionHistory = db.employeePositionHistory;
const sequelize = db.sequelize;

export const getLatestEmployeePositionHistory = async (req,res) => {
  try {
    const latestHistory = await EmployeePositionHistory.findOne({
      where: {
        employeeId: req.params.employeeId, 
      },
      include: [
        {
          model: Employee,
        },
        {
          model: Position,
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(latestHistory)
  } catch (err) {
    res.status(500).json(err);
  }
}

export const addEmployeePositionHistory = async (req, res) => {
    try {
      const newEmployeePositionHistory = await EmployeePositionHistory.create(req.body);
      res.status(200).json(newEmployeePositionHistory);
    } catch (err) {
      res.status(500).json(err);
    }
}


  