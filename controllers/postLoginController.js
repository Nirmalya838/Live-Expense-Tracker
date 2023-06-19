const bcrypt = require('bcrypt');
const path = require('path');
const connection = require('../database/db');
const User = require('../models/user');

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const userId = user.id;
    res.redirect(`/expense?userId=${userId}`);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  loginUser,  
};
