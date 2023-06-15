const express = require('express');
const router = express.Router();
const getExpenseController = require('../controllers/getExpenseController');

router.get('/expense', getExpenseController.getExpensePage);

module.exports = router;