const nodemailer = require('nodemailer');

async function sendMail (req, res) {
    const { email } = req.body;
  
    // Create a transporter using Brevo SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: false, // Set it to true if your SMTP server requires SSL
      auth: {
        user: 'virusnirmalya@gmail.com',
        pass: 'gFhBcSd4YkjnaGR8'
      }
    });
  
    // Define the email options
    const mailOptions = {
      from: 'sender@example.com',
      to: email,
      subject: 'Password Reset',
      text: 'Please follow the instructions to reset your password.'
    };
  
    try {
      // Send the password reset email
      await transporter.sendMail(mailOptions);
      console.log('password sent')
      res.json({ message: 'Password reset email sent successfully' });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ error: 'An error occurred while sending the password reset email' });
    }
  };

module.exports= {
    sendMail
}