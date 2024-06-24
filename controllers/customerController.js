const Customer = require("../models/Customer");
const Project = require("../models/Project");

const createCustomer = async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const customer = await Customer.create({ name, email, phone });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, projectId } = req.body;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    await customer.update({ name, email, phone, projectId });
    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    await customer.destroy();
    res.status(204).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const associateCustomerWithProject = async (req, res) => {
  const { id } = req.params;
  const { customerId } = req.body;
  try {
    const project = await Project.findByPk(id);
    const customer = await Customer.findByPk(customerId);
    if (!project || !customer) {
      return res.status(404).json({ error: "Project or Customer not found" });
    }
    await project.addCustomer(customer);
    res.status(200).json({ message: "Customer associated with project" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const removeCustomerFromProject = async (req, res) => {
  const { id, customerId } = req.params;
  try {
    const project = await Project.findByPk(id);
    const customer = await Customer.findByPk(customerId);
    if (!project || !customer) {
      return res.status(404).json({ error: "Project or Customer not found" });
    }
    await project.removeCustomer(customer);
    res.status(200).json({ message: "Customer removed from project" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllCustomersOfProject = async (req, res) => {
  const { id } = req.params;
  try {
    const project = await Project.findByPk(id, {
      include: [{ model: Customer }],
    });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json(project.Customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  associateCustomerWithProject,
  removeCustomerFromProject,
  getAllCustomersOfProject,
};
