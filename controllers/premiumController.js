const path = require('path');
const connection = require('../database/db');
const User = require('../models/user');

// Controller method for getting user premium status
exports.premiumUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Retrieve the user from the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract the premium status
    const isPremium = user.premium;

    res.json({ isPremium });
  } catch (error) {
    console.error('Error fetching user premium status:', error);
    res.status(500).json({ error: 'An error occurred while fetching user premium status' });
  }
};
