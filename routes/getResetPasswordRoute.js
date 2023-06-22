const express = require('express');
const path = require('path');
const router = express.Router();
const PasswordRequest = require('../models/password');

// GET route for showing the password reset form
router.get('/password/resetpassword/:token', async (req, res) => {
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
});

module.exports = router;
