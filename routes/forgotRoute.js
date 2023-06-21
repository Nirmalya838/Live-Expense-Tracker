const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/password/forgotpassword', async (req, res) => {
  const { email } = req.body;

  // Perform necessary logic here, such as sending a password reset email
  // You can use libraries like nodemailer or any other email service provider

  // For demonstration purposes, we'll simulate a delay of 2 seconds before sending the response
  await new Promise((resolve) => setTimeout(resolve, 2000));

  res.json({ message: 'Password reset email sent successfully' });
});

module.exports = router;
