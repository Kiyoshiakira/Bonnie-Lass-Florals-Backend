const express = require('express');
const router = express.Router();

// Example GET endpoint for orders
router.get('/', (req, res) => {
  res.json({ message: 'Orders endpoint is working!' });
});

module.exports = router;
