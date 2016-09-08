const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  supplierID : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Supplier'
  },
  description: String,
  qty : Number
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
