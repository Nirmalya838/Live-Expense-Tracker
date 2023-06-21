const Expense = require('../models/expense');
const User = require('../models/user');
const sequelize = require('sequelize');
const connection = require('../database/db');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'total'],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
