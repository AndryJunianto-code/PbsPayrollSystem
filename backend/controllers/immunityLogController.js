import db from "../models/index.js";

const ImmunityLog = db.immunityLog;
const Employee = db.employee;

export const addImmunityLog = async (req, res) => {
    try {
      const newImmunityLog = await ImmunityLog.create(req.body);
      res.status(200).json(newImmunityLog);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  export const getImmunityLogOnDate = async (req, res) => {
    try {
      const allImmunityLog = await ImmunityLog.findAll({
        where: {date:req.params.date},
        attributes: { exclude: ["createdAt", "updatedAt"]},
        include: [
            {
                model: Employee,
                as: "employee",
                attributes: ["name", "id"],
              },
        ]
      })
      res.status(200).json(allImmunityLog);
    } catch (err) {
      res.status(500).json(err);
    }
  };
