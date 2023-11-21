export default (sequelize, DataTypes) => {
    const Payslip = sequelize.define("payslip", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        required:true,
      },
      monthYear: {
        type: DataTypes.STRING,
        allowNull:false,
        required:true,
      },
      basicSalary: {
        type: DataTypes.FLOAT(10,1),
        allowNull: false,
        required: true,
      },
      commision: {
        type: DataTypes.FLOAT(10,1),
        allowNull: false,
        required:true,
        default: 0,
      },
      deduction: {
        type: DataTypes.FLOAT(10,1),
        allowNull: false,
        required:true,
        default: 0,
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
    },{
      initialAutoIncrement:1,
      indexes: [
        {
          unique: true,
          fields: ["monthYear", "employeeId"],
          name: "uniquePayslip", // Add unique constraint
        },
      ],
    });
    return Payslip;
  };
  