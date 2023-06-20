const express = require('express');
const premiumController = require('../controllers/premiumController');

const router = express.Router();

router.get('/user/:userId/premium', premiumController.premiumUser);

module.exports = router;
