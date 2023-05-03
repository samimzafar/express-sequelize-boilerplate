("use strict");
const moment = require("moment");
const table = "users";
module.exports = (sequelize, DataTypes) => {
 const User = sequelize.define(
  table,
  {
   id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
   },
   name: {
    type: DataTypes.STRING,
    allowNull: true,
   },
   phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
   },
   email: {
    type: DataTypes.STRING,
    allowNull: true,
   },
   role: {
    type: DataTypes.ENUM("Admin", "Developer"),
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
  }
 );
 User.beforeCreate((user) => {
  user.dataValues.createdAt = moment().unix();
  user.dataValues.updatedAt = moment().unix();
 });

 User.beforeUpdate((user) => {
  user.dataValues.updatedAt = moment().unix();
 });
 return User;
};