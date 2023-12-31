export default (sequelize, DataTypes) => {
  const Employee = sequelize.define("employee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      required:true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
      required:true,
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
      required:true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      required:true,
    },
    joinedDate: {
      type: DataTypes.STRING,
      allowNull: false,
      required:true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull:false,
      required:true,
      defaultValue: 'Active'
    }
  },{initialAutoIncrement:1000});
  return Employee;
};
