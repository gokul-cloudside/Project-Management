const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { logRequests, logResponses } = require("./middleware/loggerMiddleware");
const { sequelize } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const documentRoutes = require("./routes/documentRoutes");
const deploymentRoutes = require("./routes/deploymentRoutes");
const customerRoutes = require("./routes/customerRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(logRequests);
app.use(logResponses);
app.use(cors());

app.use("/api/auth", authRoutes);
app.use(userRoutes);
app.use(projectRoutes);
app.use(taskRoutes);
app.use(documentRoutes);
app.use(deploymentRoutes);
app.use(customerRoutes);

let server;
function startServer() {
  return new Promise((resolve, reject) => {
    server = app.listen(process.env.PORT || 5000, (err) => {
      if (err) reject(err);
      console.log(`Server running on port ${server.address().port}`);
      resolve();
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close((err) => {
        if (err) reject(err);
        console.log("Server stopped");
        resolve();
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  app,
  startServer,
  closeServer,
};

sequelize
  .sync()
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error", err));
