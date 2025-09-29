const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = new User({ email, password, name });
    await user.save();
    res.json({ message: "Signup successful!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login (dummy, does not hash or session)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    res.json({ message: "Login successful!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
