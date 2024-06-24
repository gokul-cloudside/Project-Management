const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const ProjectParticipants = sequelize.define(
  "ProjectParticipants",
  {
    role: {
      type: DataTypes.STRING,
      defaultValue: "Member",
    },
  },
  {}
);

module.exports = ProjectParticipants;
