const path = require('path');
const connection = require('../database/db');
const user = require('../models/user');

function getLoginPage(req, res) {
  res.sendFile(path.join(__dirname, '../views/login.html'));
}

module.exports = {
  getLoginPage,
};
