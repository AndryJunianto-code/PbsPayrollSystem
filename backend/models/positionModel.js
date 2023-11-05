export default (sequelize, DataTypes) => {
  const Position = sequelize.define("position", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement:true,
      primaryKey:true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      required:true,
      unique:true
    },
    rank: {
      type: DataTypes.INTEGER,
      allowNull:false,
      required:true,
      unique:true
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      required:true,
    },
    target: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    promotionTarget: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    monthlyCommisionFirstTier: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    monthlyCommisionSecondTier: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    quarterBonusFirstTier: {
      type: DataTypes.INTEGER,
      allowNull:true
    },
    quarterBonusSecondTier: {
      type: DataTypes.INTEGER,
      allowNull:true
    }
  },{initialAutoIncrement:1});
  return Position;
};
