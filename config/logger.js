const { createLogger, format, transports } = require("winston");
require("dotenv").config();

const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: format.combine(
    format.timestamp(),
    format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
    )
  ),
  transports: [
    new transports.File({ filename: process.env.LOG_FILE || "app.log" }),
  ],
});

module.exports = logger;
