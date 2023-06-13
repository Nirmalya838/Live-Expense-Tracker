const express = require('express');
const router = express.Router();
const getController = require('../controllers/getSignController');

router.get('/', getController.getSignupPage);

module.exports = router;
