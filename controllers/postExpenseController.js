const path = require('path');
const connection = require('../database/db');
const expense = require('../models/expense');

exports.addExpense = async (req, res) => {
  try {
    const { amount, type, date } = req.body;

    const newExpense = await expense.create({ amount, type, date });

    if (newExpense) {
      res.redirect('/expense');
    } else {
      res.status(500).json({ message: 'Error adding expense' });
    }
  } catch (error) {
    console.error('Error adding expense:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};