const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const { taskDto } = require("../dto/taskDto");
const { validate } = require("../middleware/validateDtoMiddleware");

const router = express.Router();
router.post(
  "/api/tasks",
  validate(taskDto),
  authenticate,
  authorize(["superUser", "admin"]),
  createTask
);
router.get(
  "/api/tasks",
  authenticate,
  authorize(["superUser", "admin"]),
  getAllTasks
);
router.get(
  "/api/tasks/:id",
  authenticate,
  authorize(["superUser", "admin"]),
  getTaskById
);
router.put(
  "/api/tasks/:id",
  validate(taskDto),
  authenticate,
  authorize(["superUser", "admin"]),
  updateTask
);
router.delete(
  "/api/tasks/:id",
  authenticate,
  authorize(["superUser", "admin"]),
  deleteTask
);

module.exports = router;
