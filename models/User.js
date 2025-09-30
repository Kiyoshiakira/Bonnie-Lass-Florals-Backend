<<<<<<< HEAD
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  name: String
});

=======
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  name: String
});

>>>>>>> ffce8cb4cf62ee0a000e380ca04a033bb8b6f2a4
module.exports = mongoose.model('User', userSchema);