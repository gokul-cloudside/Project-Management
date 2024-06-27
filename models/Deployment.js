const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Project = require("./Project");

const Deployment = sequelize.define(
  "Deployment",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    environment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "id",
      },
    },
  },
  {}
);

Project.hasMany(Deployment, { foreignKey: "projectId" });
Deployment.belongsTo(Project, { foreignKey: "projectId" });

module.exports = Deployment;
