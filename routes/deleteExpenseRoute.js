const express = require('express');
const router = express.Router();
const deleteExpenseController = require('../controllers/deleteExpenseController');

router.delete('/expense/delete/:id', deleteExpenseController.deleteExpense);

module.exports = router;
