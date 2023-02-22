const Joi = require("joi");
module.exports = {
 userRegistrationSchema: Joi.object({
  name: Joi.string().required(),
  phone_number: Joi.string().required(),
  email: Joi.string().required()
 })
};