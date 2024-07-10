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
  authorize(["superUser", "admin"]),
  createProject
);
router.get(
  "/api/projects",
  authenticate,
  authorize(["superUser", "admin"]),
  getAllProjects
);
router.get(
  "/api/projects/:id",
  authenticate,
  authorize(["superUser", "admin"]),
  getProjectById
);
router.put(
  "/api/projects/:id",
  validate(projectDto),
  authenticate,
  authorize(["superUser", "admin"]),
  updateProject
);
router.delete(
  "/api/projects/:id",
  authenticate,
  authorize(["superUser", "admin"]),
  deleteProject
);

router.post(
  "/api/projects/:id/participants",
  validate(participantDto),
  authenticate,
  authorize(["superUser", "admin"]),
  addParticipantToProject
);

router.delete(
  "/api/projects/:id/participants/:participantId",
  authenticate,
  authorize(["superUser", "admin"]),
  removeParticipantFromProject
);

router.get(
  "/api/projects/:id/participants",
  authenticate,
  authorize(["superUser", "admin"]),
  getAllParticipantsOfProject
);

router.put(
  "/api/projects/:id/participants/:participantId",
  validate(updateParticipantDto),
  authenticate,
  authorize(["superUser", "admin"]),
  updateParticipantRoleInProject
);

router.get(
  "/api/charts/projects/:id",
  authenticate,
  authorize(["superUser", "admin"]),
  getProjectChartData
);
router.get(
  "/api/charts/tasks",
  authenticate,
  authorize(["superUser", "admin"]),
  getTaskAnalytics
);
router.get(
  "/api/charts",
  authenticate,
  authorize(["superUser", "admin"]),
  getFilterData
);

module.exports = router;
