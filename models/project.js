"use strict";
const moment = require("moment");
let table = "projects";
module.exports = (sequelize, DataTypes) => {
 const Project = sequelize.define(table, {
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

 Project.beforeCreate(async (project) => {
  project.dataValues.createdAt = moment().unix();
  project.dataValues.updatedAt = moment().unix();
 });
 Project.beforeUpdate(async (project) => {
  project.dataValues.updatedAt = moment().unix();
 });
 Project.associate = function (models) {
  Project.hasMany(models.DevProjects, {
   as: "devProjects",
   foreignKey: "fk_project_id",
  });
 };

 return Project;
};
