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
  authorize(["superUser", "admin"]),
  createCustomer
);
router.get(
  "/api/customers",
  authenticate,
  authorize(["superUser", "admin"]),
  getAllCustomers
);
router.get(
  "/api/customers/:id",
  authenticate,
  authorize(["superUser", "admin"]),
  getCustomerById
);
router.put(
  "/api/customers/:id",
  validate(customerDto),
  authenticate,
  authorize(["superUser", "admin"]),
  updateCustomer
);
router.delete(
  "/api/customers/:id",
  authenticate,
  authorize(["superUser", "admin"]),
  deleteCustomer
);
router.post(
  "/api/projects/:id/customers",
  authenticate,
  authorize(["superUser", "admin"]),
  associateCustomerWithProject
);
router.delete(
  "/api/projects/:id/customers/:customerId",
  authenticate,
  authorize(["superUser", "admin"]),
  removeCustomerFromProject
);
router.get(
  "/api/projects/:id/customers",
  authenticate,
  authorize(["superUser", "admin"]),
  getAllCustomersOfProject
);

module.exports = router;
