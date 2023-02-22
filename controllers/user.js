const { sequelize, Users } = require("../models");
const ApiError = require("../utils/apiError");
const builtResponse = require("../utils/builtResponse");
module.exports = {
 create: async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
   const role = req.header("role");
   const { name, phone_number, email } = req.body;
   let user = await Users.findOne({
    where: { email }
   });
   if (user) {
    throw new ApiError(409, "User Already Exists");
   } else {
    user = await Users.create({ name, phone_number, email, role });
    builtResponse(res, "User Created successfully", user);
    await transaction.commit();
   }
  } catch (err) {
   await transaction.rollback();
   next(err);
  }
 }
};