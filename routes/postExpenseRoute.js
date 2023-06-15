const express = require('express');
const router = express.Router();
const postExpenseController = require('../controllers/postExpenseController');

router.post('/expense/add-expense', postExpenseController.addExpense);

module.exports = router;