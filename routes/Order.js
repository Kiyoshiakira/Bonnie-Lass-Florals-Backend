const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get current user's orders
router.get('/mine', auth, async (req, res) => {
  try {
    // If using Firebase Auth in frontend, pass user email via query param
    const userEmail = req.query.email;
    if (!userEmail) return res.status(400).json({ error: 'Email required' });

    // Find user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const orders = await Order.find({ user: user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});

// Admin: View all orders
router.get('/all', auth, async (req, res) => {
  try {
    // Optionally check if req.session.user.role === 'admin'
    const orders = await Order.find({}).populate('items.product user');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch all orders.' });
  }
});

module.exports = router;
