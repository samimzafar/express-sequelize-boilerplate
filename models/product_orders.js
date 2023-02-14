"use strict";
const moment = require("moment");
let table = "product_orders";
module.exports = (sequelize, DataTypes) => {
  const ProductOrders = sequelize.define(table, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    fk_product_Id: {
      type: DataTypes.INTEGER,
    },
    fk_order_Id: {
      type: DataTypes.INTEGER,
    },
    quantity: {
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

  ProductOrders.beforeCreate(async (productOrders) => {
    productOrders.dataValues.createdAt = moment().unix();
    productOrders.dataValues.updatedAt = moment().unix();
  });
  ProductOrders.beforeUpdate(async (productOrders) => {
    productOrders.dataValues.updatedAt = moment().unix();
  });

  ProductOrders.associate = (models) => {
    ProductOrders.belongsTo(models.Products, {
      as: "product",
      foreignKey: "fk_product_Id",
    });
    ProductOrders.belongsTo(models.Orders, {
      as: "order",
      foreignKey: "fk_order_Id",
    });
  };

  return ProductOrders;
};
