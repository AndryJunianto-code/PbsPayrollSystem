import db from "../models/index.js";

const Adjustment = db.adjustment;

export const addAdjustment = async (req, res) => {
  console.log(req.body)
  try {
    const newAdjustment = await Adjustment.bulkCreate(req.body);
    res.status(200).json(newAdjustment);
  } catch (err) {
    res.status(500).json(err);
  }
};


