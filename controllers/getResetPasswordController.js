const express = require('express');
const path = require('path');
const PasswordRequest = require('../models/password');

async function resetPassword (req, res) {
    const { token } = req.params;
  
    try {
      // Check if the password request with the provided token exists and is active
      const passwordRequest = await PasswordRequest.findOne({ where: { id: token, isActive: true } });
  
      if (!passwordRequest) {
        return res.status(404).json({ error: 'Password reset request not found or expired' });
      }
  
      // Render the password reset form
      // res.render('reset-password', { token });
      res.sendFile(path.join(__dirname, '../views/resetPass.html'));
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching the password reset request' });
    }
  }

  module.exports = {
    resetPassword
  }