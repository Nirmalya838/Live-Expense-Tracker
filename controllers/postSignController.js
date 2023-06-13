const path = require('path');
const connection = require('../database/db');
const User = require('../models/user');

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      return res.status(400).send('Email ID already exists');
    }
    const newUser = await User.create({ name, email, password });
    res.redirect('/signup.html');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  createUser,
};
