const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/api/tasks",
  authenticate,
  authorize(["Superuser", "Admin"]),
  createTask
);
router.get(
  "/api/tasks",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getAllTasks
);
router.get(
  "/api/tasks/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getTaskById
);
router.put(
  "/api/tasks/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  updateTask
);
router.delete(
  "/api/tasks/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  deleteTask
);

module.exports = router;
