const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Route for creating a Razorpay order
router.post('/create-order', paymentController.createOrder);

// Route for verifying the payment
router.post('/verify-payment', paymentController.verifyPayment);

module.exports = router;
