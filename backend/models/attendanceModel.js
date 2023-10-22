export default (sequelize, DataTypes) => {
    const Attendance = sequelize.define("attendance", {
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
      workingHour: {
        type: DataTypes.FLOAT(2,1),
        allowNull:false,
        required:true,
        defaultValue:9
      },
      reimbursedHour: {
        type: DataTypes.FLOAT(2,1),
        allowNull:false,
        required:true,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull:false,
        required:true,
        defaultValue:'Present'
      }
    },{initialAutoIncrement:1000});
    return Attendance;
  };
  