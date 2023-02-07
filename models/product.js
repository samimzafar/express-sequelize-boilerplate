"use strict";
const moment = require("moment");
let table = "products";
module.exports = (sequelize, DataTypes) => {
 const Product = sequelize.define(table, {
  id: {
   allowNull: false,
   autoIncrement: true,
   primaryKey: true,
   type: DataTypes.INTEGER,
  },
  title: {
   type: DataTypes.STRING
  },
  description: {
   type: DataTypes.STRING
  },
  price: {
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

 Product.beforeCreate(async (product) => {
  product.dataValues.createdAt = moment().unix();
  product.dataValues.updatedAt = moment().unix();
 });
 Product.beforeUpdate(async (product) => {
  product.dataValues.updatedAt = moment().unix();
 });
 Product.associate = function (models) {
  Product.hasMany(models.ProductOrders, {
   as: "productOrders",
   foreignKey: "fk_product_Id",
  });
  Product.belongsToMany(models.Orders, {
   through: models.ProductOrders,
   as: "orders",
   foreignKey: "fk_product_Id",
  });

 };

 return Product;
};
