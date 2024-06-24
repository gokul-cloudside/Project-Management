const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectChartData,
  getTaskAnalytics,
  getFilterData,
} = require("../controllers/projectController");
const {
  addParticipantToProject,
  removeParticipantFromProject,
  getAllParticipantsOfProject,
  updateParticipantRoleInProject,
} = require("../controllers/projectParticipentController");

const { authenticate, authorize } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateDtoMiddleware");
const {
  projectDto,
  participantDto,
  updateParticipantDto,
} = require("../dto/projectDto");

const router = express.Router();

router.post(
  "/api/projects",
  validate(projectDto),
  authenticate,
  authorize(["Superuser", "Admin"]),
  createProject
);
router.get(
  "/api/projects",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getAllProjects
);
router.get(
  "/api/projects/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getProjectById
);
router.put(
  "/api/projects/:id",
  validate(projectDto),
  authenticate,
  authorize(["Superuser", "Admin"]),
  updateProject
);
router.delete(
  "/api/projects/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  deleteProject
);

router.post(
  "/api/projects/:id/participants",
  validate(participantDto),
  authenticate,
  authorize(["Superuser", "Admin"]),
  addParticipantToProject
);

router.delete(
  "/api/projects/:id/participants/:participantId",
  authenticate,
  authorize(["Superuser", "Admin"]),
  removeParticipantFromProject
);

router.get(
  "/api/projects/:id/participants",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getAllParticipantsOfProject
);

router.put(
  "/api/projects/:id/participants/:participantId",
  validate(updateParticipantDto),
  authenticate,
  authorize(["Superuser", "Admin"]),
  updateParticipantRoleInProject
);

router.get(
  "/api/charts/projects/:id",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getProjectChartData
);
router.get(
  "/api/charts/tasks",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getTaskAnalytics
);
router.get(
  "/api/charts",
  authenticate,
  authorize(["Superuser", "Admin"]),
  getFilterData
);

module.exports = router;
