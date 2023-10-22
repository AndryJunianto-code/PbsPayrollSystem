export default (sequelize, DataTypes) => {
    const Payslip = sequelize.define("payslip", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
        required:true,
      },
      basicSalary: {
        type: DataTypes.FLOAT(10,1),
        allowNull: false,
        required: true,
      },
      totalCommision: {
        type: DataTypes.FLOAT(10,1),
        allowNull: false,
        required:true,
      },
      totalDeduction: {
        type: DataTypes.FLOAT(10,1),
        allowNull: false,
        required:true,
      },
      netSalary: {
        type: DataTypes.FLOAT(10,1),
        allowNull: false,
        required:true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull:false,
        required:true,
        defaultValue: 'Paid'
      }
    },{initialAutoIncrement:1});
    return Payslip;
  };
  