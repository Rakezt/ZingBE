const razorpayInstance = require('../utils/razorpay');

const {
  validateWebhookSignature,
} = require('razorpay/dist/utils/razorpay-utils');

const { memberShipAmount } = require('../utils/constant');

const {
  createPayment,
  findPaymentByOrderId,
  savePayment,
} = require('../repositories/paymentRepository');
const ApiError = require('../utils/ApiError');

const { upgradeUserMembership } = require('../repositories/userRepository');

const createPaymentOrder = async (loggedUser, reqBody) => {
  const { membershipType } = reqBody;

  const amount = memberShipAmount[membershipType];

  if (!amount) {
    throw new ApiError(400, 'Invalid membership type');
  }

  const { firstName, lastName, emailId } = loggedUser;

  const order = await razorpayInstance.orders.create({
    amount: amount * 100,
    currency: 'INR',
    receipt: 'order_rcptid_11',
    notes: {
      firstName,
      lastName,
      emailId,
      membershipType,
    },
  });

  const payment = await createPayment({
    userId: loggedUser._id,
    orderId: order.id,
    status: order.status,
    amount: order.amount,
    currency: order.currency,
    notes: order.notes,
  });

  return payment;
};

const handleWebhook = async (body, signature, webhookSecret) => {
  const isValid = validateWebhookSignature(
    JSON.stringify(body),
    signature,
    webhookSecret,
  );

  if (!isValid) {
    throw new ApiError(400, 'Webhook signature is invalid');
  }

  const paymentDetails = body.payload.payment.entity;

  const payment = await findPaymentByOrderId(paymentDetails.order_id);

  if (!payment) {
    throw new ApiError(400, 'Payment not found');
  }

  payment.status = paymentDetails.status;
  payment.paymentId = paymentDetails.id;

  await savePayment(payment);

  await upgradeUserMembership(payment.userId, payment.notes.membershipType);

  return true;
};

const verifyPremium = async (loggedUser) => {
  return {
    isPremium: loggedUser.isPremium,
  };
};

module.exports = {
  createPaymentOrder,
  handleWebhook,
  verifyPremium,
};
