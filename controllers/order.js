// const { Sequelize, Op } = require("sequelize");
const { Orders, Products, ProductOrders } = require("../models");

module.exports = {
 add: async (req, res) => {
  try {
   const payLoad = {
    "address": "KPK",
    "products":
     [
      {
       "id": 8,
       "qty": 4
      },
      {
       "id": 2,
       "qty": 3
      }
     ]
   };
   // const order = await Orders.create();
   const savedOrder = await Orders.create(payLoad, { w: 1 }, { returning: true });
   // Loop through all the items in req.products
   payLoad.products.forEach(async (item) => {


    // Search for the product with the givenId and make sure it exists. If it doesn't, respond with status 400.
    // const product = await Products.findByPk(item.id);
    // if (!product) {
    //  return res.status(400);
    // }

    // Create a dictionary with which to create the ProductOrder
    const po = {
     fk_order_Id: savedOrder.id,
     fk_product_Id: item.id,
     quantity: item.qty,
    };
    // Create and save a productOrder
    await ProductOrders.create(po, { w: 1 }, { returning: true });
   });

   // If everything goes well, respond with the order
   return res.status(200).json(savedOrder);
  } catch (err) {
   console.log(err);
   return res
    .status(err.status || 500)
    .send(err.message || "Something went wrong!");
  }
 },

 get: async (req, res) => {
  try {
   const allOrders = await Orders.findOne({
    where:{id:8},
    attributes: ["id", "address"],
    include: [{
     model: Products,
     required:true,
     as: "products",
     attributes: ["id", "price"],
     through: {
      attributes: ["id"]
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
