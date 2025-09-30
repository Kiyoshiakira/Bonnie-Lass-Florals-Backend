<<<<<<< HEAD
const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // URL or file path
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

=======
const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // URL or file path
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

>>>>>>> ffce8cb4cf62ee0a000e380ca04a033bb8b6f2a4
module.exports = mongoose.model('GalleryItem', galleryItemSchema);