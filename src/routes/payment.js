const express = require('express');
const paymentRouter = express.Router();

const { userAuth } = require('../middlewares/auth');

const {
  createPayment,
  paymentWebhook,
  verifyPayment,
} = require('../controllers/paymentController');

paymentRouter.post('/payment/create', userAuth, createPayment);

paymentRouter.post('/payment/webhook', paymentWebhook);

paymentRouter.get('/payment/verify', userAuth, verifyPayment);

module.exports = { paymentRouter };
