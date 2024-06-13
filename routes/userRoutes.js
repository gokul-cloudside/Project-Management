const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = express.Router();

router.get("/api/users", getAllUsers);
router.get("/api/users/:id", getUserById);
router.put("/api/users/:id", updateUser);
router.delete("/api/users/:id", deleteUser);

module.exports = router;
