import { database, user, password, host as _host, dialect as _dialect, pool as _pool } from '../config/dbconfig.js';

import { Sequelize, DataTypes } from "sequelize";
import Employee from './employeeModel.js';
import Position from './positionModel.js';

const sequelize = new Sequelize(
  database,
  user,
  password,
  {
    host: _host,
    dialect: _dialect,
    pool: {
      max: _pool.max,
      min: _pool.min,
      acquire: _pool.acquire,
      idle: _pool.idle,
    },
    define: {
      freezeTableName:true
    }
  }
);

sequelize.authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.employee = Employee(sequelize,DataTypes);
db.position = Position(sequelize,DataTypes);

db.employee.belongsTo(db.position);
db.position.hasMany(db.employee);

db.sequelize.sync({ force: false }).then(() => console.log("re-sync done"));

export default db;