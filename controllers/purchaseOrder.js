const PurchaseOrder = require('../models/PurchaseOrder');
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const PurchaseDetail = require('../models/TransactionDetail');
const LocalStorage = require('node-localstorage').LocalStorage;

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
  var localStorage = new LocalStorage('./scratch');
  //list of purchaseDetailId that has just been inserted
  var purchaseDetailId;
  var purchaseDetailIdList = [];

  //parse localStorage - products
  var products = JSON.parse(localStorage.getItem('products'));
  $.each(products, function(key,val){
    console.log ("creating product number", key);
    var purchaseDetail = new PurchaseDetail({
      product: val.productId,
      qty: val.qty,
      price: val.price,
      isPurchase: true
    });
    console.log ("saving product number", key);
    purchaseDetail.save((err, newPurchaseDetail) => {
      if (err) { 
          console.log ("failed saving product number..", key ,"\n cause:", err);
          return res.json({
            "Result":"ERROR",
            "Message": err
          });
      }
      else {
        console.log ("success saving product number", key , "..");
        purchaseDetailId = newPurchaseDetail._id;
        purchaseDetailIdList.push(purchaseDetailId);
      }
   });
  });//end of looping localStorage

  //parse localStorage - purchaseHeader
  var purchaseHeader = JSON.parse(localStorage.getItem('purchaseHeader'));
  //insert to purchaseOrder
  console.log ("create object purchase order..");
  const purchaseOrder = new PurchaseOrder({
    purchaseDetail: purchaseDetailIdList,
    supplierId: purchaseHeader.supplierId,
    purchaseDate: purchaseHeader.purchaseDate,
    paidDate : purchaseHeader.paidDate
  });
  console.log ("saving object purchase order..");
  purchaseHeader.save((err, newPurchaseOrder) => {
      if (err) { 
          console.log ("failed saving purchase order..\n cause:", err);
          return res.json({
            "Result":"ERROR",
            "Message": err
          });
      }
      else {
        console.log ("success saving purchase order..");
        purchaseDetailId = newPurchaseDetail._id;
        purchaseDetailIdList.push(purchaseDetailId);
      }
  });
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

