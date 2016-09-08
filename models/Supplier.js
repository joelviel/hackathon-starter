const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  contactPerson: { type: String, unique: true },
  address: String,
  phone : String,
  company : String,
  email : String
});

const Supplier = mongoose.model('Supplier', supplierSchema);

module.exports = Supplier;
