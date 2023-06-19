const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Expense = sequelize.define('expense', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER, 
    allowNull: false,
  },
});

module.exports = Expense;
