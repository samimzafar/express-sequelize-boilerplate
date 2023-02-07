// const { Sequelize, Op } = require("sequelize");
// const sequelize = require("sequelize");
const { Students, Banks, StudentBanks } = require("../models");

module.exports = {
 add: async (req, res) => {
  try {
   const studentPayLoad = {
    name: "Noor",
    semester: 3,
   };
   const savedStudent = await Students.create(studentPayLoad);
   // Loop through all the items in req.products
   const bankPayLoad = { name: "Hbl", location: "kpk" };
   const savedBank = await Banks.create(bankPayLoad);
   const studentBankPayLoad = {
    fk_student_Id: savedStudent.id,
    fk_bank_Id: savedBank.id
   };
   await StudentBanks.create(studentBankPayLoad);
   return res.status(200).json({
    savedStudent,
    savedBank,
    studentBankPayLoad
   });
  } catch (err) {

   console.log(err);
   return res
    .status(err.status || 500)
    .send(err.message || "Something went wrong!");
  }
 },

 getOne: async (req, res) => {
  try {
   const bankInfo = await Banks.findAll({
    where: {
     name:'mcb'
    },
    attributes: [ 'name','location'],
    include: {
     model: Students,
     as: "students",
     attributes: ['name', 'semester'],
     through: {
      attributes: []
     }
    }
   });

   // const bankInfo = await Banks.findOne({
   //  where: {
   //   name: "scb"
   //  },
   //  attributes: ['name', 'location'],
   //  include: {
   //   model: Students,
   //   as: "students",
   //   attributes: ["id", "name", "semester"],
   //   through: {
   //    attributes: []
   //   }
   //  }
   // });

   // const allOrders = await Orders.findOne({
   //  where:{id:8},
   //  attributes: ["id", "address"],
   //  include: [{
   //   model: Products,
   //   required:true,
   //   as: "products",
   //   attributes: ["id", "price"],
   //   through: {
   //    attributes: ["id"]
   //   }
   //  }]
   // });

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

   return res.status(200).json(bankInfo);
  } catch (err) {
   console.log(err);
   return res
    .status(err.status || 500)
    .send(err.message || "Something went wrong!");
  }
 }

};
