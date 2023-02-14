"use strict";
const moment = require("moment");
let table = "orders";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    address: {
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

  Order.beforeCreate(async (order) => {
    order.dataValues.createdAt = moment().unix();
    order.dataValues.updatedAt = moment().unix();
  });
  Order.beforeUpdate(async (order) => {
    order.dataValues.updatedAt = moment().unix();
  });

  Order.associate = function (models) {
    Order.hasMany(models.ProductOrders, {
      as: "orderProducts",
      foreignKey: "fk_order_Id",
    });
    Order.belongsToMany(models.Products, {
      through: models.ProductOrders,
      as: "products",
      foreignKey: "fk_order_Id",
    });
  };
  return Order;
};
