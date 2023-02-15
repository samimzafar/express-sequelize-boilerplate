("use strict");
const moment = require("moment");
let table = "dev_projects";
module.exports = (sequelize, DataTypes) => {
 const DevProject = sequelize.define(
  table,
  {
   id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
   },
   fk_dev_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   fk_project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   createdAt: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
   updatedAt: {
    type: DataTypes.INTEGER,
    allowNull: false,
   },
  },
 );

 DevProject.beforeCreate((devProject) => {
  devProject.dataValues.createdAt = moment().unix();
  devProject.dataValues.updatedAt = moment().unix();
 });

 DevProject.beforeUpdate((devProject) => {
  devProject.dataValues.updatedAt = moment().unix();
 });

 DevProject.associate = (models) => {
  DevProject.belongsTo(models.Devs, {
   as: "devs",
   foreignKey: "fk_dev_id",
   id: "id",
  });
  DevProject.belongsTo(models.Projects, {
   as: "projects",
   foreignKey: "fk_project_id",
   id: "id",
  });
 };



 return DevProject;
};
