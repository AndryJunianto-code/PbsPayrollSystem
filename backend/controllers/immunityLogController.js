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
      const flattenedData = allImmunityLog.map(log=> {
        const {id,date,immunity,coreWallet,supplementWallet,promotionPoint,revenuePoint,lead,employee} = log;
        return {
          id,date,immunity,coreWallet,supplementWallet,promotionPoint,revenuePoint,lead,employeeId:employee.id,employeeName:employee.name
        }
      })
      
      res.status(200).json(flattenedData);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  export const deleteImmunityLog = async (req,res) => {
    try{
      await ImmunityLog.destroy({where:{
        id:req.params.id
      }})
      res.status(200).json("Success");
    } catch(err) {
      res.status(500).json(err);
    }
  }
