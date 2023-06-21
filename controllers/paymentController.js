const Razorpay = require('razorpay');
const axios = require('axios');
const crypto = require('crypto');
const Order  = require('../models/order');
const User = require('../models/user');

// Initialize Razorpay client with your API keys
const razorpay = new Razorpay({
  key_id: 'rzp_test_Gm7xr3DBOIyVKR',
  key_secret: '6G8vRhwvRPeEh1gcnPRoB6XL',
});

// Controller method for creating a Razorpay order
exports.createOrder = async (req, res) => {
  try {
    const amount = 9900; // Amount in paise (e.g., 99 rupees)
    const { userId } = req.body;

    // Create the Razorpay order
    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: 'order_receipt',
      payment_capture: 1, // Auto-capture the payment
    });

    // Send the order ID to the client
    res.json({ orderId: order.id });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({ error: 'An error occurred while creating the Razorpay order' });
  }
};

exports.verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature, userId } = req.body;

  try {
    const secretKey = '6G8vRhwvRPeEh1gcnPRoB6XL'; // Replace with your actual Razorpay secret key

    // Concatenate the order ID and payment ID
    const text = orderId + '|' + paymentId;

    // Create a buffer from the secret key
    const key = Buffer.from(secretKey, 'utf8');

    // Create an HMAC SHA-256 hash using the secret key
    const hmac = crypto.createHmac('sha256', key);

    // Update the HMAC hash with the concatenated text
    hmac.update(text);

    // Generate the computed signature by digesting the HMAC hash
    const computedSignature = hmac.digest('hex');

    // Compare the computed signature with the received signature
    const isValidSignature = computedSignature === signature;

    if (!isValidSignature) {
      console.error('Invalid Razorpay signature');
      return res.status(400).json({ error: 'Invalid Razorpay signature' });
    }

    const order = await Order.create({
      paymentid: paymentId,
      orderid: orderId,
      status: 'captured',
      userId: userId
    });

     // Update the 'premium' column for the user
     const user = await User.findByPk(userId);
     user.premium = true;
     await user.save();
    // Payment signature is valid
    // Handle further processing or validation here

    res.json({ success: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'An error occurred while verifying the payment' });
  }
};
  