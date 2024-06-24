const Joi = require("joi");

const documentDto = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().uri().required(),
  projectId: Joi.number().integer().required(),
});

module.exports = documentDto;
