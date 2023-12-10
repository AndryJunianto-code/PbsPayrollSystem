export default (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        required:true,
        unique:true
      },
      password: {
        type: DataTypes.STRING,
        allowNull:false,
        required:true,
        unique:true
      },
    },{initialAutoIncrement:1});
    return User;
  };
  