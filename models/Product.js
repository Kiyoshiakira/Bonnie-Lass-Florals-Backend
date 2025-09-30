const express = require('express');
const router = express.Router();
const multer = require('multer');
const Product = require('../models/Product');

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'))
});
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, type, subcategory, stock, options } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : '';
    const parsedOptions = options ? options.split(',').map(s => s.trim()) : [];

    const product = new Product({
      name,
      description,
      price,
      image,
      type,
      subcategory,
      stock: parseInt(stock, 10) || 1,
      options: parsedOptions,
      featured: false
    });

    await product.save();
    res.json({ message: 'Product uploaded successfully!', product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed.' });
  }
});

router.get('/', async (req, res) => {
  // Fetch all products
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products.' });
  }
});

module.exports = router;
