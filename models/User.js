const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "MyUser",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
