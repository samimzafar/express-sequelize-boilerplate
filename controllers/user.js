const builtResponse = require("../utils/builtResponse");
module.exports = {
 create: async (req, res, next) => {
  try {
   const role = req.header("role");
   const { name, phone_number, email } = req.body;
   let data = { name, phone_number, email, role };
   builtResponse(res, "data added", data);
  } catch (err) {
   next(err);
  }
 }
};