const { user: { userRegistrationSchema } } = require("./schemas");
const ApiError = require("../../utils/apiError");
module.exports = {
 validateUserRegistration: (req, res, next) => {
  const { error } = userRegistrationSchema.validate(req.body, {
   errors: { label: "key", wrap: { label: false } },
  });
  if (error) {
   throw new ApiError(400, error.details[0].message);
  } else {
   next();
  }
 }
};