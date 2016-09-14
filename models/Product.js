const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name        : { type: String, unique: true },
  description : String,
  currentQty  : Number,
  soldQty     : Number
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
