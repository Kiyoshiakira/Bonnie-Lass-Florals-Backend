const express = require('express');
const router = express.Router();

// Simple contact POST handler
router.post('/', async (req, res) => {
  try {
    // Here you would send an email or store the message
    // For now, just echo success
    res.json({ message: "Thank you for contacting us!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to send message." });
  }
});

module.exports = router;
