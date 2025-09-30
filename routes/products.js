const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const Product = require('../models/Product');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const product = new Product({ name, description, price, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
=======
const multer = require('multer');
const Product = require('../models/Product');

// Multer setup: save uploads to /public/uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// POST /api/products - create product with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? '/uploads/' + req.file.filename : '';
    const product = new Product({ name, description, price, image });
    await product.save();
    res.json({ message: "Product uploaded!", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
>>>>>>> ffce8cb4cf62ee0a000e380ca04a033bb8b6f2a4
