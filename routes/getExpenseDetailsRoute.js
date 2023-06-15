const express = require('express');
const router = express.Router();
const getExpenseDetailsController = require('../controllers/getExpenseDetailsController');

router.get('/expense/details', getExpenseDetailsController.getAllExpenses);

module.exports = router;