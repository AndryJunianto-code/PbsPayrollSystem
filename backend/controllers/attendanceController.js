import db from "../models/index.js";

const Employee = db.employee;
const Attendance = db.attendance;

export const checkAttendanceDateExist = async (req, res) => {
  try {
    const isAttendanceExist = await Attendance.findOne({
      where: { date: req.params.date },
    });
    if (!isAttendanceExist) {
      res.status(200).json(null);
    } else {
      res.status(200).json("Existed");
    }
  } catch (err) {}
};

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

export const updateAllAttendance = async (req, res) => {
  try {
    const allAttendance = Attendance.bulkCreate(req.body.allAttendance, {
      updateOnDuplicate: ["date", "workingHour", "reimbursedHour", "status"],
      returning: true,
    });
    res.status(200).json(allAttendance);
  } catch (err) {
    res.status(500).json(err);
  }
};
