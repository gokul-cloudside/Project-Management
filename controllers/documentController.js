const Document = require("../models/Document");
const Project = require("../models/Project");

const uploadDocument = async (req, res) => {
  const { name, url, projectId } = req.body;
  try {
    const findProject = await Project.findByPk(projectId);
    if (!findProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    const document = await Document.create({ name, url, projectId });
    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.status(200).json(documents);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDocumentById = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.status(200).json(document);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    await document.destroy();
    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
  deleteDocument,
};
