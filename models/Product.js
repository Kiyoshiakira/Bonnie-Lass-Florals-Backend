<<<<<<< HEAD
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, // URL or file path
  featured: Boolean
});

=======
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, // URL or file path
  featured: Boolean
});

>>>>>>> ffce8cb4cf62ee0a000e380ca04a033bb8b6f2a4
module.exports = mongoose.model('Product', productSchema);