<<<<<<< HEAD
const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
  platform: String,
  url: String
});

=======
const mongoose = require('mongoose');

const socialSchema = new mongoose.Schema({
  platform: String,
  url: String
});

>>>>>>> ffce8cb4cf62ee0a000e380ca04a033bb8b6f2a4
module.exports = mongoose.model('Social', socialSchema);