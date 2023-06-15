const path = require('path');
const connection = require('../database/db');
const expense = require('../models/expense');

function getExpensePage(req, res) {
  res.sendFile(path.join(__dirname, '../views/expense.html'));
}

module.exports = {
  getExpensePage,
};