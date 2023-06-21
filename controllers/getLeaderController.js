const path = require('path');
const connection = require('../database/db');
const User = require('../models/user');

function getLeaderboardPage(req, res) {
  res.sendFile(path.join(__dirname, '../views/leaderboard.html'));
}

module.exports = {
  getLeaderboardPage,
};