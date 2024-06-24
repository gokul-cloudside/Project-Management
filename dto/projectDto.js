const Joi = require("joi");

const projectDto = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).required(),
  status: Joi.string().valid("active", "inactive").required(),
  region: Joi.string().required(),
  category: Joi.string().required(),
  budget: Joi.number().min(0).required(),
  loss: Joi.number().min(0).required(),
  profit: Joi.number().min(0).required(),
});

const participantDto = Joi.object({
  userId: Joi.string().uuid().required(),
  role: Joi.string().valid("Employee", "Manager", "Admin").required(),
});
const updateParticipantDto = Joi.object({
  role: Joi.string().valid("Employee", "Manager", "Admin").required(),
});
module.exports = { projectDto, participantDto, updateParticipantDto };
