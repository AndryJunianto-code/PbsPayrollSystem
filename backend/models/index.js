import { database, user, password, host as _host, dialect as _dialect, pool as _pool } from '../config/dbconfig.js';

import { Sequelize, DataTypes } from "sequelize";
import Employee from './employeeModel.js';
import Position from './positionModel.js';
import Sales from './salesModel.js';
import Attendance from './attendanceModel.js';
import Payslip from './payslipModel.js';
import ImmunityLog from './immunityLogModel.js';
import EmployeePositionHistory from './employeePositionHistoryModel.js'
import Adjustment from './adjustmentModel.js';
import User from './userModel.js';

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
db.sales = Sales(sequelize,DataTypes);
db.attendance = Attendance(sequelize,DataTypes);
db.payslip = Payslip(sequelize,DataTypes);
db.adjustment = Adjustment(sequelize,DataTypes);
db.immunityLog = ImmunityLog(sequelize,DataTypes);
db.employeePositionHistory = EmployeePositionHistory(sequelize,DataTypes);
db.user = User(sequelize,DataTypes);

db.sales.belongsTo(db.employee);
db.employee.hasMany(db.sales)

db.attendance.belongsTo(db.employee);
db.employee.hasMany(db.attendance);

db.adjustment.belongsTo(db.payslip);
db.payslip.hasMany(db.adjustment);

db.payslip.belongsTo(db.employee);
db.employee.hasMany(db.payslip);

db.immunityLog.belongsTo(db.employee);
db.employee.hasMany(db.immunityLog);

db.employeePositionHistory.belongsTo(db.employee);
db.employeePositionHistory.belongsTo(db.position);
db.employee.hasMany(db.employeePositionHistory, {foreignKey: 'employeeId', as:'employeePositionHistory'});1
db.position.hasMany(db.employeePositionHistory, {foreignKey: 'positionId'});

db.sequelize.sync({ force: false }).then(() => console.log("re-sync done"));

export default db;