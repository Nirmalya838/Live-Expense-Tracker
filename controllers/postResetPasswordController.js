const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const PasswordRequest = require('../models/password');

async function postNewPass (req, res) {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      // Find the password request in the database
      const passwordRequest = await PasswordRequest.findOne({
        where: {
          id: token,
          isActive: true
        }
      });
  
      // Check if the password request exists and is active
      if (!passwordRequest) {
        return res.status(404).json({ error: 'Password reset request not found or expired' });
      }
  
      // Find the user associated with the password request
      const user = await User.findByPk(passwordRequest.userId);
  
      // Check if the user exists
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Encrypt the new password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Update the user's password
      user.password = hashedPassword;
      await user.save();
  
      // Deactivate the password request
      passwordRequest.isActive = false;
      await passwordRequest.save();
  
      return res.json({ message: 'Password reset successful. Redirect to /login' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'An error occurred while resetting the password' });
    }
  }

  module.exports = {
    postNewPass
  }