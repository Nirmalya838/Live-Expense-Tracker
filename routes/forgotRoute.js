const express = require('express');
const router = express.Router();
const forgotController = require('../controllers/forgotController')

router.post('/password/forgotpassword', forgotController.sendMail)

module.exports = router;
