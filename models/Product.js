const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  qty : Number
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
