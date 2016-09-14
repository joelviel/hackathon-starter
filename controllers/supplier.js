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

/*
*   return list of suppliers
*/
exports.list = (req, res) => {
  Supplier.find({}, (err, suppliers) => {
    if (err) { return next(err); }
    res.json({
       "Result":"OK",
       "Records":suppliers});
    });
};

/*
*   insert new supplier
*/
exports.create = (req, res) => {
    const supplier = new Supplier({
      name    : req.body.name,
      address : req.body.address,
      phone   : req.body.phone,
      company : req.body.company,
      email   : req.body.email
    });

    req.assert('name', 'Name cannot be empty').notEmpty();
    req.assert('address', 'Address cannot be empty').notEmpty();
    req.assert('phone', 'Phone cannot be empty').notEmpty();
    req.assert('email', 'Email cannot be empty').notEmpty();
    req.assert('email', 'Wrong email format').isEmail();


    const errors = req.validationErrors();

    if (errors) {
      return res.json({
       "Result":"ERROR",
       "Message":errors[0].msg
      });
    }


    Supplier.findOne({ name: req.body.name }, (err, existingSupplier) => {
      
    console.log('Looking for exsiting supplier with the same name...');      

    if (existingSupplier) {
      return res.json({
        "Result":"ERROR",
        "Message":'Supplier with the same name already exists.'
      });
    }

    supplier.save((err, newSupplier) => {
      
      console.log('No entry found, creating new Supplier...');   

      console.log(err + '!');

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


/*
*   update existing supplier
*/
exports.update = (req, res) => {
  
    req.assert('name', 'Name cannot be empty').notEmpty();
    req.assert('address', 'Address cannot be empty').notEmpty();
    req.assert('phone', 'Phone cannot be empty').notEmpty();
    req.assert('email', 'Email cannot be empty').notEmpty();
    req.assert('email', 'Wrong email format').isEmail();


    const errors = req.validationErrors();

    if (errors) {
      return res.json({
       "Result":"ERROR",
       "Message":errors[0].msg
      });
    }
 
  Supplier.findById(req.body._id, (err, supplier) => {
    if (err) { 
      return res.json({
       "Result":"ERROR",
       "Message":err
      });
    }

    supplier.name     = req.body.name;
    supplier.address  = req.body.address,
    supplier.phone    = req.body.phone,
    supplier.company  = req.body.company,
    supplier.email    = req.body.email

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

};

/*
*   delete existing supplier
*/
exports.delete = (req, res) => {
  Supplier.remove({ _id: req.body._id }, (err) => {
    if (err) { return next(err); }
    res.json({
          "Result":"OK"
    });
  }); };
