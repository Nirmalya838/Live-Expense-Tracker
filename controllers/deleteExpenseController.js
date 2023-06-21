const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize  = require('../database/db');

exports.deleteExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const expenseId = req.params.id;
    const userId = Number(req.query.userId);

    console.log('Expense ID:', expenseId);
    console.log('User ID:', userId);

    const foundExpense = await Expense.findByPk(expenseId);

    if (!foundExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    if (foundExpense.userId !== userId) {
      return res.status(401).json({ message: 'Unauthorized: You are not allowed to delete this expense' });
    }

    const deletedExpenseAmount = foundExpense.amount;

    await foundExpense.destroy({ transaction: t });

    // Update the user's total column by subtracting the deleted expense amount
    const foundUser = await User.findByPk(userId, { transaction: t });
    foundUser.total -= deletedExpenseAmount;
    await foundUser.save({ transaction: t });

    await t.commit();

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    await t.rollback();
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
