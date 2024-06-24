const Joi = require("joi");

const deploymentDto = Joi.object({
  name: Joi.string().required(),
  projectId: Joi.number().integer().required(),
  environment: Joi.string().valid("local", "staging", "production").required(),
  version: Joi.string()
    .pattern(/^v?\d+\.\d+\.\d+$/)
    .required(),
  status: Joi.string().valid("success", "failure", "pending").required(),
});

module.exports = deploymentDto;
