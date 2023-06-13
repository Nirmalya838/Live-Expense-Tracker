const express = require('express');
const router = express.Router();
const postLoginController = require('../controllers/postLoginController');

router.post('/login/success', postLoginController.loginUser);

module.exports = router;