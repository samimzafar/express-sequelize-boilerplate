"use strict";
const moment = require("moment");
let table = "banks";
module.exports = (sequelize, DataTypes) => {
  const Bank = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    location: {
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

  Bank.beforeCreate(async (bank) => {
    bank.dataValues.createdAt = moment().unix();
    bank.dataValues.updatedAt = moment().unix();
  });
  Bank.beforeUpdate(async (bank) => {
    bank.dataValues.updatedAt = moment().unix();
  });
  Bank.associate = function (models) {
    Bank.hasMany(models.StudentBanks, {
      as: "bankStudents",
      foreignKey: "fk_bank_Id",
    });
    Bank.belongsToMany(models.Students, {
      through: models.StudentBanks,
      as: "students",
      foreignKey: "fk_bank_Id",
    });
  };

  return Bank;
};
