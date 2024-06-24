const Joi = require("joi");

const taskDto = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).required(),
  status: Joi.string().valid("pending", "inprogress", "completed").required(),
  projectId: Joi.number().integer().required(),
});
module.exports = {
  taskDto,
};
