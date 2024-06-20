const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const Project = require("./Project");

const Document = sequelize.define(
  "Document",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
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

Project.hasMany(Document, { foreignKey: "projectId" });
Document.belongsTo(Project, { foreignKey: "projectId" });

module.exports = Document;
