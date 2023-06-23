const express = require('express');
const router = express.Router();
const getResetPasswordController = require('../controllers/getResetPasswordController');

// GET route for showing the password reset form
router.get('/password/resetpassword/:token', getResetPasswordController.resetPassword);

module.exports = router;
