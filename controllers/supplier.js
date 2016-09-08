const Supplier = require('../models/Supplier');


// table reactjs
exports.index = (req, res) => {
  Supplier.find({}, (err, suppliers) => {
    if (err) { return next(err); }
    res.render('suppliers', {
      title: 'Suppliers',
      suppliers: suppliers
    });
  });
};

// jtable
exports.jtable = (req, res) => {
  res.render('supplier-jtable', {
    title: 'Suppliers jtable'
  });
};



// Restful API for suppliers 

exports.list = (req, res) => {
  Supplier.find({}, (err, suppliers) => {
    if (err) { return next(err); }
    res.json({
       "Result":"OK",
       "Records":suppliers});
    });
};

exports.create = (req, res) => {
    const supplier = new Supplier({
      contactPerson: req.body.contactPerson,
    });

    Supplier.findOne({ contactPerson: req.body.name }, (err, existingSupplier) => {
      
      console.log('Looking for exsiting supplier with the same name...');      

      if (existingSupplier) {
        return res.json({
          "Result":"ERROR",
          "Message":'Supplier with the same name already exists.'
        });
      }

      supplier.save((err, newSupplier) => {
        
      console.log('No entry found, creating new Supplier...');   

        if (err) { 
          return res.json({
            "Result":"ERROR",
            "Message": err
          });
        }
        
      console.log('Saving entry in DB OK. Returning Ajax response..');   

        return res.json({
          "Result":"OK",
          "Record": newSupplier
        });
      });
    }); };

exports.update = (req, res) => {
//

  Supplier.findById(req.body._id, (err, supplier) => {
    if (err) { 
      return res.json({
       "Result":"ERROR",
       "Message":err
      });
    }
    supplier.name = req.body.name;
    supplier.save((err) => {
      if (err) {
        return res.json({
          "Result":"ERROR",
          "Message":err
          });
      }
     return res.json({
          "Result":"OK"
        });
    });
  });

//
};

exports.delete = (req, res) => {
  Supplier.remove({ _id: req.body._id }, (err) => {
    if (err) { return next(err); }
    res.json({
          "Result":"OK"
    });
  }); };
