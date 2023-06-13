const express = require('express');
const router = express.Router();
const getLoginController = require('../controllers/getLoginController');

router.get('/login', getLoginController.getLoginPage);

module.exports = router;
