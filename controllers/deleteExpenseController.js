const Expense = require('../models/expense');

exports.deleteExpense = async (req, res) => {
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

    await foundExpense.destroy();

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
