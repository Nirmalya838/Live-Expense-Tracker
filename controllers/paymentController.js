const Razorpay = require('razorpay');
const axios = require('axios');
const crypto = require('crypto');
const Order  = require('../models/order');
const User = require('../models/user');

const razorpay = new Razorpay({
  key_id: 'rzp_test_Gm7xr3DBOIyVKR',
  key_secret: '6G8vRhwvRPeEh1gcnPRoB6XL',
});

exports.createOrder = async (req, res) => {
  try {
    const amount = 9900;
    const { userId } = req.body;

    const order = await razorpay.orders.create({
      amount: amount,
      currency: 'INR',
      receipt: 'order_receipt',
      payment_capture: 1, 
    });

    res.json({ orderId: order.id });
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({ error: 'An error occurred while creating the Razorpay order' });
  }
};

exports.verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature, userId } = req.body;

  try {
    const secretKey = '6G8vRhwvRPeEh1gcnPRoB6XL'; 

    const text = orderId + '|' + paymentId;

    const key = Buffer.from(secretKey, 'utf8');

    const hmac = crypto.createHmac('sha256', key);

    hmac.update(text);

    const computedSignature = hmac.digest('hex');

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

     const user = await User.findByPk(userId);
     user.premium = true;
     await user.save();
    res.json({ success: true });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ error: 'An error occurred while verifying the payment' });
  }
};
  