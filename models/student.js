"use strict";
const moment = require("moment");
let table = "students";
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    semester: {
      type: DataTypes.INTEGER,
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

  Student.beforeCreate(async (student) => {
    student.dataValues.createdAt = moment().unix();
    student.dataValues.updatedAt = moment().unix();
  });
  Student.beforeUpdate(async (student) => {
    student.dataValues.updatedAt = moment().unix();
  });
  Student.associate = function (models) {
    Student.hasMany(models.StudentBanks, {
      as: "studentBanks",
      foreignKey: "fk_student_Id",
    });
    Student.belongsToMany(models.Banks, {
      through: models.StudentBanks,
      as: "banks",
      foreignKey: "fk_student_Id",
    });
  };

  return Student;
};
