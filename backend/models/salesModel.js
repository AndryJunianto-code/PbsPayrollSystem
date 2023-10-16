import generateId from "../utils/idGenerator.js";

export default (sequelize, DataTypes) => {
    const Sales = sequelize.define("sales", {
      id: {
        type: DataTypes.STRING(100),
        primaryKey:true,
        allowNull:false,
        defaultValue: () => {
          return generateId();
        }
      },
      salesDate: {
        type: DataTypes.STRING,
        allowNull:false,
        required:true
      },
      customerName: {
        type: DataTypes.STRING,
        allowNull: false,
        required:true,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue: '-'
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        required:true,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        required:true,
      },
      salesAmount: {
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
  