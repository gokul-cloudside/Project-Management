const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");
const {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
  deleteDocument,
} = require("../controllers/documentController");
const documentDto = require("../dto/documentDto");
const { validate } = require("../middleware/validateDtoMiddleware");
const router = express.Router();

router.post(
  "/api/documents",
  validate(documentDto),
  authenticate,
  authorize(["Superuser", "Admin"]),
  uploadDocument
);
router.get(
  "/api/documents",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getAllDocuments
);
router.get(
  "/api/documents/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getDocumentById
);
router.delete(
  "/api/documents/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  deleteDocument
);

module.exports = router;
