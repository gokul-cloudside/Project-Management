const express = require("express");
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  associateCustomerWithProject,
  removeCustomerFromProject,
  getAllCustomersOfProject,
} = require("../controllers/customerController");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const customerDto = require("../dto/customerDto");
const { validate } = require("../middleware/validateDtoMiddleware");
const router = express.Router();

router.post(
  "/api/customers",
  validate(customerDto),
  authenticate,
  authorize(["Superuser", "Admin"]),
  createCustomer
);
router.get(
  "/api/customers",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getAllCustomers
);
router.get(
  "/api/customers/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getCustomerById
);
router.put(
  "/api/customers/:id",
  validate(customerDto),
  authenticate,
  authorize(["Superuser", "Admin", "User"]),
  updateCustomer
);
router.delete(
  "/api/customers/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  deleteCustomer
);
router.post(
  "/api/projects/:id/customers",
  authenticate,
  authorize(["Superuser", "Admin"]),
  associateCustomerWithProject
);
router.delete(
  "/api/projects/:id/customers/:customerId",
  authenticate,
  authorize(["Superuser", "Admin"]),
  removeCustomerFromProject
);
router.get(
  "/api/projects/:id/customers",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getAllCustomersOfProject
);

module.exports = router;
