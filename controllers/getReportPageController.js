const path = require('path');
const connection = require('../database/db');
const User = require('../models/user');
const Expense = require('../models/expense');

function getReportPage(req, res) {
  res.sendFile(path.join(__dirname, '../views/report.html'));
}

module.exports = {
  getReportPage,
};