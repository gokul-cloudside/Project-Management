const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { logRequests, logResponses } = require("./middleware/loggerMiddleware");
const { sequelize } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logRequests);
app.use(logResponses);
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use(userRoutes);

sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
