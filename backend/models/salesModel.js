import uid from "../utils/idGenerator.js";

export default (sequelize, DataTypes) => {
    const Sales = sequelize.define("sales", {
      id: {
        type: DataTypes.STRING(100),
        primaryKey:true,
        allowNull:false,
        defaultValue: uid
      },
      sales_date: {
        type: DataTypes.STRING,
        allowNull:false,
        required:true
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
        required:true,
      },
      company_name: {
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue: '-'
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        required:true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        required:true,
      },
      sales_amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required:true,
      },
      remarks: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:""
      }
    });
    return Sales;
  };
  