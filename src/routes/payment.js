const express = require('express');
const { userAuth } = require('../middlewares/auth');
const paymentRouter = express.Router();
const razorpayInstance = require('../utils/razorpay');
const Payment = require('../models/payment');
const User = require('../models/user');
const { memberShipAmount } = require('../utils/constant');
const {
  validateWebhookSignature,
} = require('razorpay/dist/utils/razorpay-utils');

paymentRouter.post('/payment/create', userAuth, async (req, res) => {
  const { membershipType } = req.body;
  const { firstName, lastName, emailId } = req.user;
  try {
    const order = await razorpayInstance.orders.create({
      amount: memberShipAmount[membershipType] * 100,
      currency: 'INR',
      receipt: 'order_rcptid_11',
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      notes: order.notes,
    });
    const savePayment = await payment.save();
    res.json({ ...savePayment.toJSON(), keyId: process.env.RAZORPAY_TEST_KEY });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

paymentRouter.post('/payment/webhook', async (req, res) => {
  try {
    console.log('I am started');
    const webhookSignature = req.get('x-razorpay-signature');

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );

    if (!isWebhookValid) {
      return res.status(400).json({ msg: 'Webhook signature is invalid' });
    }

    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });
    payment.status = paymentDetails.status;
    await payment.save();

    const user = await User.findOne({ _id: payment.userId });
    user.isPremium = true;
    user.memberShipType = payment.notes.membershipType;
    await user.save();

    console.log('Webhook processed successfully:', {
      orderId: paymentDetails.order_id,
      status: paymentDetails.status,
    });
    return res.status(200).json({ msg: 'Webhook received successfully' });
  } catch (err) {
    console.error('Webhook error:', err.message);
    return res.status(500).json({ msg: err.message });
  }
});

paymentRouter.get('/payment/verify', userAuth, async (req, res) => {
  try {
    const user = req.user.toJSON();
    if (user.isPremium) {
      return res.json({ isPremium: true });
    } else {
      return res.json({ isPremium: false });
    }
  } catch (error) {
    res.status(400).json('Error', error);
  }
});
module.exports = { paymentRouter };
