import db from "../models/index.js";

const Position = db.position;

export const addPosition = async (req, res) => {
  try {
    const newPosition = await Position.create(req.body);
    res.status(200).json(newPosition);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllPosition = async (req, res) => {
  try {
    const allPosition = await Position.findAll();
    res.status(200).json(allPosition);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getOnePosition = async(req,res)=> {
  try {
    const position = await Position.findOne({where:{title:req.body.title}});
    res.status(200).json(position);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const updatePosition = async (req, res) => {
  let id = req.params.id;
  const updatedPosition = await Position.update(req.body, {
    where: { id },
    returning: true,
  });
  res.status(200).json(updatedPosition);
};