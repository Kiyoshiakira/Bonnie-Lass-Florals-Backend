<<<<<<< HEAD
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 }
    }
  ],
  total: Number,
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Processing' }
});

=======
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, default: 1 }
    }
  ],
  total: Number,
  shippingAddress: {
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Processing' }
});

>>>>>>> ffce8cb4cf62ee0a000e380ca04a033bb8b6f2a4
module.exports = mongoose.model('Order', orderSchema);