const Project = require("../models/Project");
const User = require("../models/User");
const ProjectParticipants = require("../models/projectParticipant");

const addParticipantToProject = async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req.body;
  try {
    const project = await Project.findByPk(id);
    const user = await User.findByPk(userId);
    if (!project || !user) {
      return res.status(404).json({ error: "Project or User not found" });
    }
    await ProjectParticipants.create({
      projectId: project.id,
      userId: user.id,
      role: role || "Member",
    });
    res.status(200).json({ message: "Participant added to project" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeParticipantFromProject = async (req, res) => {
  const { id, participantId } = req.params;
  try {
    const project = await Project.findByPk(id);
    const user = await User.findByPk(participantId);
    if (!project || !user) {
      return res.status(404).json({ error: "Project or User not found" });
    }
    await ProjectParticipants.destroy({
      where: {
        projectId: project.id,
        userId: user.id,
      },
    });
    res.status(200).json({ message: "Participant removed from project" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllParticipantsOfProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id, {
      include: {
        model: User,
        as: "participants",
        through: {
          attributes: ["role"],
        },
      },
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project.participants);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateParticipantRoleInProject = async (req, res) => {
  const { id, participantId } = req.params;
  const { role } = req.body;
  try {
    const projectParticipant = await ProjectParticipants.findOne({
      where: {
        projectId: id,
        userId: participantId,
      },
    });
    if (!projectParticipant) {
      return res
        .status(404)
        .json({ error: "Participant not found in this project" });
    }
    projectParticipant.role = role || "Member";
    await projectParticipant.save();
    res.status(200).json({ message: "Participant role updated" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addParticipantToProject,
  removeParticipantFromProject,
  getAllParticipantsOfProject,
  updateParticipantRoleInProject,
};
