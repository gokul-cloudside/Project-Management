const Joi = require("joi");

const userDto = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
  role: Joi.string().valid("Admin", "Superuser", "User").required(),
});

const loginDto = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});

module.exports = { loginDto, userDto };
