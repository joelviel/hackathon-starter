const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const PurchaseDetail = require('../models/TransactionDetail');
const async = require ('async');

// jtable
exports.jtable = (req, res) => {
  res.render('purchase/purchaseOrder-jtable', {
    title: 'Purchase Orders jtable'
  });
};

// new purchase
exports.newPurchase = (req, res) => {

  Supplier.find({}, (err, existingSuppliers) => {
    if (err) { return next(err); }
    res.render('purchase/newPurchase', {
      title: 'New Purchase',
      suppliers: existingSuppliers,
    });
  });
};

// add product
exports.addProduct = (req, res) => {
  Product.find({}, (err, existingProducts) => {
    if (err) { return next(err); }

    res.render('purchase/addProduct', {
      products: existingProducts
    });
  });
};

// show products
exports.showProducts = (req, res) => {
  res.render('purchase/showProducts', {
  });
};

// Restful API for purchaseOrder 
/*
*   Returns list of purchaseOrder
*/
exports.list = (req, res) => {
    PurchaseOrder
        .find({ })
        .populate('supplier', 'name') // only return the Supplier's name
        .exec(function (err, purchaseOrders) {
        if (err) console.log(err);
        res.json({
            "Result":"OK",
            "Records":purchaseOrders});
        });
        //to-do child table of transaction details
};

/*
*   Create and save new purchaseOrder
*/
exports.create = (req, res) => {
  // list of purchaseDetailId that has just been inserted
  var purchaseDetailId;
  var purchaseDetailIdList = [];
  var purchaseDetail;
  var products = req.body.products;
  var purchaseHeader = req.body.purchaseHeader;

  async.each(products, function (item, callback){
      purchaseDetail = new PurchaseDetail({
        product: item.productId,
        qty: item.qty,
        price: item.price,
        isPurchase: true
      });
      purchaseDetail.save((err, newPurchaseDetail) => {
        if (err) { 
          console.log ("failed saving product. Cause:", err);
          return res.json({
            "Result":"ERROR",
            "Message": err
          });  
        }
        else {
          purchaseDetailId = newPurchaseDetail._id;
          purchaseDetailIdList.push(purchaseDetailId);
          console.log ("success saving productID:", newPurchaseDetail._id , "..");
        }
        callback();
      }); 
  }, function (err){

    console.log ('supplierID:', purchaseHeader.supplierId);
    const purchaseOrder = new PurchaseOrder({
      purchaseDetail: purchaseDetailIdList,
      supplierId: purchaseHeader.supplierId,
      purchaseDate: purchaseHeader.purchaseDate,
      paidDate : purchaseHeader.paidDate
    });
    console.log ('purchaseOrder', purchaseOrder);
    console.log (purchaseDetailIdList);

    // purchaseOrder.save((err, newPurchaseOrder) => {
    //     if (err) { 
    //         console.log ("failed saving purchase order..\n cause:", err);
    //         return res.json({
    //           "Result":"ERROR",
    //           "Message": err
    //         });
    //     }
    //     else {
    //       console.log ("success saving purchase order..", newPurchaseOrder._id);
    //     }
    // });
  });//end async.each
};

/*
*   Update existing puchaseOrder
*/
exports.update = (req, res) => {    };

/*
*   Delete existing puchaseOrder
*/
exports.delete = (req, res) => {
    //to-do delete transaction details
  PurchaseOrder.remove({ _id: req.body._id }, (err) => {
    if (err) { return next(err); }
    res.json({
          "Result":"OK"
    });
  }); };

