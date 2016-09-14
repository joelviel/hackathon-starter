const PurchaseOrder = require('../models/PurchaseOrder');

// jtable
exports.jtable = (req, res) => {
  res.render('purchaseOrder-jtable', {
    title: 'Purchase Orders jtable'
  });
};



// Restful API for purchaseOrder 
/*
*   Returns list of purchaseOrder
*/
exports.list = (req, res) => {
    console.log ('called');
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

exports.create = (req, res) => {    };
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
