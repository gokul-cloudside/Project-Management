const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Project = require("./Project");

const Customer = sequelize.define("Customer", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
 
});

Project.belongsToMany(Customer, { through: "ProjectCustomers" });
Customer.belongsToMany(Project, { through: "ProjectCustomers" });

module.exports = Customer;
