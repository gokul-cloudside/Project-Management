const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const ProjectParticipants = require("./projectParticipant");

const Project = sequelize.define(
  "Project",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
    region: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    budget: {
      type: DataTypes.FLOAT,
    },
    loss: {
      type: DataTypes.FLOAT,
    },
    profit: {
      type: DataTypes.FLOAT,
    },
  },
  {}
);

Project.belongsToMany(User, {
  through: ProjectParticipants,
  as: "participants",
  foreignKey: "projectId",
});
User.belongsToMany(Project, {
  through: ProjectParticipants,
  as: "projects",
  foreignKey: "userId",
});
module.exports = Project;
