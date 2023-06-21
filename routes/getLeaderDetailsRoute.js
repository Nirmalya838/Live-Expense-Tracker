const express = require('express');
const router = express.Router();
const getLeaderDetailsController = require('../controllers/getLeaderDetailsController');

router.get('/user/details', getLeaderDetailsController.getAllUsers);

module.exports = router;