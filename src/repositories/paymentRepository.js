const Payment = require('../models/payment');

const createPayment = async (data) => {
  const payment = new Payment(data);
  return await payment.save();
};

const findPaymentByOrderId = async (orderId) => {
  return await Payment.findOne({ orderId });
};

const savePayment = async (paymentDoc) => {
  return await paymentDoc.save();
};

module.exports = {
  createPayment,
  findPaymentByOrderId,
  savePayment,
};
