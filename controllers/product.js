// const { Sequelize, Op } = require("sequelize");
const { Products, Orders } = require("../models");

module.exports = {
  get: async (req, res) => {
    try {
      const product = await Products.create({
        title: "TV",
        description: "Samsung Note",
        price: 5000
      });
      return res.status(200).send({ product });
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  },

  getOne: async (req, res) => {
    try {
      const allOrders = await Products.findOne({
        where: { id: 2 },
        attributes: ["id", "title", "description"],
        include: [{
          model: Orders,
          required: true,
          as: "orders",
          attributes: ["id", ['address', 'location']],
          through: {
            attributes: ['id', 'quantity']
          }
        }]
      });

      // Make sure to include the products
      // include: [{
      //  model: Products,
      //  as: 'products',
      //  required: false,
      //  // Pass in the Product attributes that you want to retrieve
      //  attributes: ['id', 'title', 'description'],
      // through: {
      //  // This block of code allows you to retrieve the properties of the join table
      //  model: ProductOrders,
      //  as: 'productOrders',
      //  attributes: ['quantity'],
      // }
      // }]

      return res.status(200).json(allOrders);
    } catch (err) {
      console.log(err);
      return res
        .status(err.status || 500)
        .send(err.message || "Something went wrong!");
    }
  }
};
