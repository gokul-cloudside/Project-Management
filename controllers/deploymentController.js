const Deployment = require("../models/Deployment");

const createDeployment = async (req, res) => {
  const { name, environment, status, projectId, version } = req.body;
  try {
    const deployment = await Deployment.create({
      name,
      environment,
      status,
      version,
      projectId,
    });
    res.status(201).json(deployment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllDeployments = async (req, res) => {
  try {
    const deployments = await Deployment.findAll();
    res.status(200).json(deployments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDeploymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const deployment = await Deployment.findByPk(id);
    if (!deployment) {
      return res.status(404).json({ error: "Deployment not found" });
    }
    res.status(200).json(deployment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDeployment = async (req, res) => {
  const { id } = req.params;
  const { name, environment, status, projectId, version } = req.body;
  try {
    const deployment = await Deployment.findByPk(id);
    if (!deployment) {
      return res.status(404).json({ error: "Deployment not found" });
    }
    await deployment.update({ name, environment, status, projectId, version });
    res.status(200).json(deployment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDeployment = async (req, res) => {
  const { id } = req.params;
  try {
    const deployment = await Deployment.findByPk(id);
    if (!deployment) {
      return res.status(404).json({ error: "Deployment not found" });
    }
    await deployment.destroy();
    res.status(204).json({ message: "Deployment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createDeployment,
  getAllDeployments,
  getDeploymentById,
  updateDeployment,
  deleteDeployment,
};
