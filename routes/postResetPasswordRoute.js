const express = require('express');
const postResetPasswordController = require('../controllers/postResetPasswordController');
const router = express.Router();

router.post('/resetpassword/:token', postResetPasswordController.postNewPass);

module.exports = router;
