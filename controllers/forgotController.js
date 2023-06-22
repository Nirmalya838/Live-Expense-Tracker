const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const PasswordRequest = require('../models/password');
const User = require('../models/user');

async function sendMail(req, res) {
  const { email } = req.body;

  try {
    // Retrieve the user based on the provided email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate a UUID for the reset token
    const resetToken = uuidv4();

    // Create a new record in the passwordrequests table only if the user ID is found
    const passwordRequest = await PasswordRequest.create({
      id: resetToken,
      userId: user.id,
      isActive: true,
    });

    // If password request is not created, return an error
    if (!passwordRequest) {
      return res.status(500).json({ error: 'Failed to create password reset request' });
    }

    // Create a transporter using Brevo SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: false, // Set it to true if your SMTP server requires SSL
      auth: {
        user: 'virusnirmalya@gmail.com',
        pass: 'gFhBcSd4YkjnaGR8',
      },
    });

    // Define the email options
    const resetURL = `http://localhost:5000/password/resetpassword/${resetToken}`;
    const mailOptions = {
      from: 'sender@example.com',
      to: email,
      subject: 'Password Reset',
      text: `Please follow the link to reset your password: ${resetURL}`,
      html: `<p>Please follow the link to reset your password:</p><a href="${resetURL}">${resetURL}</a>`,
    };

    // Send the password reset email
    await transporter.sendMail(mailOptions);

    console.log('Password reset email sent');
    res.json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'An error occurred while sending the password reset email' });
  }
}

module.exports = {
  sendMail,
};

