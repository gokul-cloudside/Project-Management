const express = require("express");
const {
  register,
  login,
  logout,
  getProfile,
} = require("../controllers/authController");

const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/profile",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getProfile
);
router.delete("/logout", logout);

module.exports = router;
