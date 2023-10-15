import db from "../models/index.js";

const Position = db.position;

export const addPosition = async (req, res) => {
  try {
    const {
      title,
      salary,
      target,
      promotionTarget,
      monthlyCommisionFirstTier,
      monthlyCommisionSecondTier,
      quarterBonusFirstTier,
      quarterBonusSecondTier,
    } = req.body;
    let data = {
      title,
      salary,
      target,
      promotion_target: promotionTarget,
      monthly_commision_first_tier: monthlyCommisionFirstTier,
      monthly_commision_second_tier: monthlyCommisionSecondTier,
      quarter_bonus_first_tier: quarterBonusFirstTier,
      quarter_bonus_second_tier: quarterBonusSecondTier,
    };
    const newPosition = await Position.create(data);
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
    const {
        title,
        salary,
        target,
        promotionTarget,
        monthlyCommFirst,
        monthlyCommSecond,
        quarterBonusFirst,
        quarterBonusSecond,
      } = req.body;
  let id = req.params.id;
  let data = {
    title,
    salary,
    target,
    promotion_target: promotionTarget,
    monthly_commision_first_tier: monthlyCommFirst,
    monthly_commision_second_tier: monthlyCommSecond,
    quarter_bonus_first_tier: quarterBonusFirst,
    quarter_bonus_second_tier: quarterBonusSecond,
  };
  const updatedPosition = await Position.update(data, {
    where: { id },
    returning: true,
  });
  res.status(200).json(updatedPosition);
};