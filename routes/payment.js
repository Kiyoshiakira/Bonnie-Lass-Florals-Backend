const express = require('express');
const router = express.Router();
const { Client, Environment } = require('square');
const Order = require('../models/Order');

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.NODE_ENV === 'production' ? Environment.Production : Environment.Sandbox,
});

router.post('/square', async (req, res) => {
  const { sourceId, shippingAddress, items, total } = req.body;
  if (!sourceId || !items || !Array.isArray(items) || !shippingAddress) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const amountCents = Math.round(Number(total) * 100);
  try {
    const paymentsApi = squareClient.paymentsApi;
    const paymentResponse = await paymentsApi.createPayment({
      sourceId,
      idempotencyKey: require('crypto').randomBytes(12).toString('hex'),
      amountMoney: {
        amount: amountCents,
        currency: 'USD'
      }
    });
    if (paymentResponse.result.payment.status !== "COMPLETED") {
      return res.status(402).json({ error: "Payment failed.", details: paymentResponse.result });
    }
    // Create order in DB
    const order = await Order.create({
      items,
      total,
      shippingAddress,
      status: 'Processing',
      payment: {
        method: 'square',
        status: 'paid',
        transactionId: paymentResponse.result.payment.id
      }
    });
    res.json({ message: "Payment successful and order created!", orderId: order._id });
  } catch (err) {
    console.error("Square payment error:", err);
    res.status(500).json({ error: "Payment processing error.", details: err.message || err });
  }
});

module.exports = router;
