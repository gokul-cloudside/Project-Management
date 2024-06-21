const express = require("express");
const {
  createDeployment,
  getAllDeployments,
  getDeploymentById,
  updateDeployment,
  deleteDeployment,
} = require("../controllers/deploymentController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/api/deployments",
  authenticate,
  authorize(["Superuser", "Admin"]),
  createDeployment
);
router.get(
  "/api/deployments",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getAllDeployments
);
router.get(
  "/api/deployments/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getDeploymentById
);
router.put(
  "/api/deployments/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  updateDeployment
);
router.delete(
  "/api/deployments/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  deleteDeployment
);

module.exports = router;
