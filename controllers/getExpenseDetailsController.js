const Expense = require('../models/expense');

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();

    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error retrieving expenses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
