const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation failed",
      error: error.details.map((detail) => detail.message),
    });
  }
  next();
};

module.exports = {
  validate,
};
