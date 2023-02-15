"use strict";
const moment = require("moment");
let table = "devs";
module.exports = (sequelize, DataTypes) => {
 const Dev = sequelize.define(table, {
  id: {
   allowNull: false,
   autoIncrement: true,
   primaryKey: true,
   type: DataTypes.INTEGER,
  },
  name: {
   type: DataTypes.STRING,
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

 Dev.beforeCreate(async (dev) => {
  dev.dataValues.createdAt = moment().unix();
  dev.dataValues.updatedAt = moment().unix();
 });
 Dev.beforeUpdate(async (dev) => {
  dev.dataValues.updatedAt = moment().unix();
 });
 Dev.associate = function (models) {
  Dev.hasMany(models.DevProjects, {
   as: "devProjects",
   foreignKey: "fk_dev_Id",
  });
 };

 return Dev;
};
