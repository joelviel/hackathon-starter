const mongoose = require('mongoose');

const purchaseOrderSchema = new mongoose.Schema({
    purchaseDetails : [{ type: mongoose.Schema.Types.ObjectId, ref: 'TransactionDetail' }],
    supplier : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    purchaseDate: Date,
    paidDate    : Date,
}, { timestamps: true });

const PurchaseOrder = mongoose.model('PurchaseOrder', purchaseOrderSchema);

module.exports = PurchaseOrder;
