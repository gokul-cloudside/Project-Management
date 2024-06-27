const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
} = require("../controllers/authController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateDtoMiddleware");
const { registerDto, loginDto } = require("../dto/userDto");
const router = express.Router();

router.post("/register", validate(registerDto), register);
router.post("/login", validate(loginDto), login);
router.get(
  "/profile",
  authenticate,
  authorize(["Superuser", "admin"]),
  getProfile
);
router.delete("/logout", logout);

module.exports = router;
