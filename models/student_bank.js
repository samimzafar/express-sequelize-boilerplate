"use strict";
const moment = require("moment");
let table = "student_banks";
module.exports = (sequelize, DataTypes) => {
 const StudentBanks = sequelize.define(table, {
  id: {
   allowNull: false,
   autoIncrement: true,
   primaryKey: true,
   type: DataTypes.INTEGER,
  },
  fk_student_Id: {
   type: DataTypes.INTEGER
  },
  fk_bank_Id: {
   type: DataTypes.INTEGER
  },
  createdAt: {
   allowNull: false,
   type: DataTypes.INTEGER,
  },
  updatedAt: {
   allowNull: false,
   type: DataTypes.INTEGER,
  },
 });

 StudentBanks.beforeCreate(async (studentBanks) => {
  studentBanks.dataValues.createdAt = moment().unix();
  studentBanks.dataValues.updatedAt = moment().unix();
 });
 StudentBanks.beforeUpdate(async (studentBanks) => {
  studentBanks.dataValues.updatedAt = moment().unix();
 });

 StudentBanks.associate = (models) => {
  StudentBanks.belongsTo(models.Students, {
   as: "student",
   foreignKey: "fk_student_Id",
  });
  StudentBanks.belongsTo(models.Banks, {
   as: "bank",
   foreignKey: "fk_bank_Id",
  });
 };

 return StudentBanks;
};
