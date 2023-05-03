const ApiError = require("../utils/apiError");
module.exports = async (req, res, next) => {
 try {
  const role = req.header("role");
  if (role) next();
  else throw new ApiError(401, "Access denied");
 } catch (err) {
  next(err);
 }
};