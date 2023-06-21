const express = require('express');
const router = express.Router();
const getLeaderController = require('../controllers/getLeaderController');

router.get('/leaderboard', getLeaderController.getLeaderboardPage);

module.exports = router;