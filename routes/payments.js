const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST /api/payments/square
router.post('/square', async (req, res) => {
  const { sourceId, shippingAddress, items, total } = req.body;

  if (!sourceId || !total) {
    return res.status(400).json({ error: "Missing sourceId or total." });
  }

  // Square expects amount in cents
  const amount = Math.round(Number(total) * 100);

  // Unique idempotency key for each payment
  const idempotencyKey = Date.now().toString() + Math.random().toString(36).slice(2);

  try {
    const response = await axios.post(
      'https://connect.squareup.com/v2/payments',
      {
        source_id: sourceId,
        idempotency_key: idempotencyKey,
        amount_money: {
          amount: amount,
          currency: 'USD'
        },
        // Optionally, you can send shipping/contact info in "shipping_address" or "buyer_email_address"
        // shipping_address: shippingAddress,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // TODO: Optionally, save order in your DB here

    res.json({ message: 'Payment successful!', payment: response.data.payment });
  } catch (err) {
    // Square API errors are returned in err.response.data
    const errorMsg = err?.response?.data?.errors?.[0]?.detail || 'Payment failed.';
    res.status(400).json({ error: errorMsg });
  }
});

module.exports = router;
