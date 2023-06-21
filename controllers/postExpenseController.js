const path = require('path');
const connection = require('../database/db');
const Expense = require('../models/expense');
const User = require('../models/user');

exports.addExpense = async (req, res) => {
  const { amount, type, date } = req.body;
  const userId = req.query.userId;

  const transaction = await connection.transaction();

  try {
    const newExpense = await Expense.create({ amount, type, date, userId }, { transaction });

    if (newExpense) {
      const user = await User.findByPk(userId, { transaction });
      user.total = (parseInt(user.total) || 0) + parseInt(amount);
      await user.save({ transaction });
      await transaction.commit();

      res.redirect(`/expense?userId=${userId}`);
    } else {
      res.status(500).json({ message: 'Error adding expense' });
    }
  } catch (error) {
    console.error('Error adding expense:', error);
    await transaction.rollback();
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
