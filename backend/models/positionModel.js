export default (sequelize, DataTypes) => {
    const Position = sequelize.define("position", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        required:true,
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
      promotion_target: {
        type: DataTypes.INTEGER,
        allowNull:true
      },
      monthly_commision_first_tier: {
        type: DataTypes.INTEGER,
        allowNull:true
      },
      monthly_commision_second_tier: {
        type: DataTypes.INTEGER,
        allowNull:true
      },
      quarter_bonus_first_tier: {
        type: DataTypes.INTEGER,
        allowNull:true
      },
      quarter_bonus_second_tier: {
        type: DataTypes.INTEGER,
        allowNull:true
      }
    },{initialAutoIncrement:1});
    return Position;
  };
  