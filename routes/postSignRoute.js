const express = require('express');
const router = express.Router();
const signController = require('../controllers/postSignController');

router.post('/signup', signController.createUser);

module.exports = router;
