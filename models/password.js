const { v4: uuidv4 } = require('uuid');
const Sequelize = require('../database/db');
const { DataTypes } = require('sequelize');


// Define the ForgotPasswordRequests table
const PasswordRequests = Sequelize.define('PasswordRequests', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

module.exports = PasswordRequests;
