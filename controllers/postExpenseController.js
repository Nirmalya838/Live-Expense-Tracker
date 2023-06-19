const path = require('path');
const connection = require('../database/db');
const Expense = require('../models/expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, type, date } = req.body;
    const userId = req.query.userId;

    const newExpense = await Expense.create({ amount, type, date, userId });

    if (newExpense) {
      res.redirect(`/expense?userId=${userId}`);
    } else {
      res.status(500).json({ message: 'Error adding expense' });
    }
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
