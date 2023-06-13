const path = require('path');
const connection = require('../database/db');
const user = require('../models/user');

function getSignupPage(req, res) {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
}

module.exports = {
  getSignupPage,
};
