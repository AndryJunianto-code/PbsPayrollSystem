export default (sequelize, DataTypes) => {
    const EmployeePositionHistory = sequelize.define("employeePositionHistory", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
      },
    },{initialAutoIncrement:1});
    return EmployeePositionHistory;
  };
  