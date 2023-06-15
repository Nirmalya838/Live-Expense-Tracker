const Expense = require('../models/expense');

exports.deleteExpense = async (req, res) => {
  const expenseId = req.params.id;

  try {
    const affectedRows = await Expense.destroy({ where: { id: expenseId } });

    if (affectedRows === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    console.log(`Expense with ID ${expenseId} deleted successfully`);
    return res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while deleting the expense' });
  }
};
