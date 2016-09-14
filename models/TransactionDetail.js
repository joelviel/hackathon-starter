const mongoose = require('mongoose');

const transactionDetailSchema = new mongoose.Schema({
   product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    qty: Number,
    price: Number,
    isPurchase: Boolean
});

const TransactionDetail = mongoose.model('TransactionDetail', transactionDetailSchema);

module.exports = TransactionDetail;
