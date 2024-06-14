const logger = require('../config/logger');

const logRequests = (req, res, next) => {
  logger.info(`Incoming Request: ${req.method} ${req.url}`);
  next();
};

const logResponses = (req, res, next) => {
  const originalSend = res.send.bind(res);
  res.send = (body) => {
    logger.info(`Response: ${res.statusCode} ${body}`);
    originalSend(body);
  };
  next();
};

module.exports = {
  logRequests,
  logResponses,
};
