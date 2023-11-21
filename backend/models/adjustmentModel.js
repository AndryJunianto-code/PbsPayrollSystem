export default (sequelize, DataTypes) => {
  const Adjustment = sequelize.define("adjustment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull: false,
    },
  });
  return Adjustment;
};
