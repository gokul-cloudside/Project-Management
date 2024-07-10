const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const router = express.Router();
const { validate } = require("../middleware/validateDtoMiddleware");
const { registerDto } = require("../dto/userDto");

router.get(
  "/api/users",
  authenticate,
  authorize(["superUser", "admin"]),
  getAllUsers
);
router.get(
  "/api/users/:id",
  authenticate,
  authorize(["Superuser", "admin"]),
  getUserById
);
router.put(
  "/api/users/:id",
  validate(registerDto),
  authenticate,
  authorize(["superUser", "admin"]),
  updateUser
);
router.delete(
  "/api/users/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  deleteUser
);

module.exports = router;
