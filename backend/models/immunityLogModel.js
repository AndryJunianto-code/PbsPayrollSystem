export default (sequelize, DataTypes) => {
  const ImmunityLog = sequelize.define(
    "immunityLog",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      week: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      immunity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        default: 10,
      },
      coreWallet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        defaultValue: 0,
      },
      supplementWallet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        defaultValue: 0,
      },
      promotionPoint: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        defaultValue: 0,
      },
      revenuePoint: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        defaultValue: 0,
      },
      lead: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
        defaultValue: 0,
      },
    },
    { initialAutoIncrement: 1000 }
  );
  return ImmunityLog;
};
