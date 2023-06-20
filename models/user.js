const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const user = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
      },
  premium: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
});

module.exports = user;
