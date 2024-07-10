const express = require("express");
const {
  createDeployment,
  getAllDeployments,
  getDeploymentById,
  updateDeployment,
  deleteDeployment,
} = require("../controllers/deploymentController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const deploymentDto = require("../dto/deploymentDto");
const { validate } = require("../middleware/validateDtoMiddleware");

const router = express.Router();

router.post(
  "/api/deployments",
  validate(deploymentDto),
  authenticate,
  authorize(["superUser", "admin"]),
  createDeployment
);
router.get(
  "/api/deployments",
  authenticate,
  authorize(["superUser", "admin"]),
  getAllDeployments
);
router.get(
  "/api/deployments/:id",
  authenticate,
  authorize(["superUser", "admin"]),
  getDeploymentById
);
router.put(
  "/api/deployments/:id",
  validate(deploymentDto),
  authenticate,
  authorize(["superUser", "admin"]),
  updateDeployment
);
router.delete(
  "/api/deployments/:id",
  authenticate,
  authorize(["superUser", "admin"]),
  deleteDeployment
);

module.exports = router;
