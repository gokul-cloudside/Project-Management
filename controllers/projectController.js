const Project = require("../models/Project");
const Task = require("../models/Task");
const Deployment = require("../models/Deployment");
const { Op } = require("sequelize");

const createProject = async (req, res) => {
  const { name, description, status, loss, profit, budget, region, category } =
    req.body;
  try {
    const project = await Project.create({
      name,
      description,
      status,
      loss,
      profit,
      budget,
      region,
      category,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const { name, description, status } = req.body;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    await project.update({ name, description, status });
    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    const tasks = await Task.findAll({ where: { projectId: id } });
    const deployments = await Deployment.findAll({ where: { projectId: id } });
    const documents = await Document.findAll({ where: { projectId: id } });

    if (tasks.length > 0 || deployments.length > 0 || documents.length > 0) {
      return res.status(400).json({ error: "Project cannot be deleted" });
    }
    await project.destroy();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const formatProjectChartData = (project) => {
  return {
    id: project.id,
    name: project.name,
    status: project.status,
    budget: project.budget,
    loss: project.loss,
    profit: project.profit,
    region: project.region,
    category: project.category,
  };
};

const getProjectChartData = async (req, res) => {
  const projectId = req.params.id;
  try {
    console.log(projectId);
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    const formattedData = formatProjectChartData(project);
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const prepareTaskAnalytics = (tasks) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const inprogressTasks = tasks.filter(
    (task) => task.status === "inprogress"
  ).length;

  return {
    totalTasks,
    completedTasks,
    pendingTasks,
    inprogressTasks,
  };
};

const getTaskAnalytics = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    const analytics = prepareTaskAnalytics(tasks);
    res.status(200).json(analytics);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getFilterData = async (req, res) => {
  const { region, category, budget, loss, profit } = req.query;
  let whereClause = {};

  if (region) {
    whereClause.region = region;
  }

  if (category) {
    whereClause.category = category;
  }

  if (budget) {
    whereClause.budget = {
      [Op.eq]: parseFloat(budget),
    };
  }

  if (loss) {
    whereClause.loss = {
      [Op.eq]: parseFloat(loss),
    };
  }

  if (profit) {
    whereClause.profit = {
      [Op.eq]: parseFloat(profit),
    };
  }

  try {
    const projects = await Project.findAll({ where: whereClause });
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectChartData,
  getTaskAnalytics,
  getFilterData,
};
