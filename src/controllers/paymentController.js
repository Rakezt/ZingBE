const {
  createPaymentOrder,
  handleWebhook,
  verifyPremium,
} = require('../services/paymentServices');
const asyncHandler = require('../utils/asyncHandler');

const createPayment = asyncHandler(async (req, res) => {
  const payment = await createPaymentOrder(req.user, req.body);

  res.status(200).json({
    ...payment.toJSON(),
    keyId: process.env.RAZORPAY_TEST_KEY,
  });
});

const paymentWebhook = asyncHandler(async (req, res) => {
  const webhookSignature = req.get('x-razorpay-signature');

  await handleWebhook(
    req.body,
    webhookSignature,
    process.env.RAZORPAY_WEBHOOK_SECRET,
  );

  return res.status(200).json({
    msg: 'Webhook received successfully',
  });
});
const verifyPayment = asyncHandler(async (req, res) => {
  const result = await verifyPremium(req.user);

  return res.status(200).json(result);
});

module.exports = {
  createPayment,
  paymentWebhook,
  verifyPayment,
};
