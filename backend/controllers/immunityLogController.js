import db from "../models/index.js";

const ImmunityLog = db.immunityLog;
const Employee = db.employee;
const sequelize = db.sequelize;

export const addImmunityLog = async (req, res) => {
    try {
      const newImmunityLog = await ImmunityLog.create(req.body);
      res.status(200).json(newImmunityLog);
    } catch (err) {
      res.status(500).json(err);
    }
}

export const updateImmunityLog = async (req, res) => {
  try {
    let id = req.params.id;
    console.log(req.body)
    const updatedImmunityLog = await ImmunityLog.update(req.body, {
      where: { id },
      returning: true,
    });
    res.status(200).json(updatedImmunityLog);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const addBulkImmunityLog = async(req,res)=> {
  console.log(req.body)
  try{
    const newImmunityLog = await ImmunityLog.bulkCreate(req.body);
    res.status(200).json(newImmunityLog);
  } catch(err) {
    res.status(500).json(err);
  }
}

  export const getImmunityLogOnWeek = async (req, res) => {
    try {
      const allImmunityLog = await ImmunityLog.findAll({
        where: {week:req.params.week},
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
        const {id,date,week,immunity,coreWallet,supplementWallet,promotionPoint,revenuePoint,lead,employee} = log;
        return {
          id,date,week,immunity,coreWallet,supplementWallet,promotionPoint,revenuePoint,lead,employeeId:employee.id,employeeName:employee.name
        }
      })
      
      res.status(200).json(flattenedData);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  export const deleteImmunityLog = async (req, res) => {
    const t = await sequelize.transaction();
  
    try {
      await ImmunityLog.destroy({
        where: {
          id: req.params.id
        },
        transaction: t
      });
  
      await t.commit();
      res.status(200).json("Success: Record deleted");
    } catch (err) {
      await t.rollback();
      res.status(500).json(err);
    }
  };
  