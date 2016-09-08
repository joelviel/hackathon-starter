const Product = require('../models/Product');


// table reactjs
exports.index = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) { return next(err); }
    res.render('product', {
      title: 'Products',
      productlist: products
    });
  });
};



// jtable
exports.jtable = (req, res) => {
  res.render('product-jtable', {
    title: 'Products jtable'
  });
};



// Restful API for Product 

exports.list = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) { return next(err); }
    res.json({
       "Result":"OK",
       "Records":products});
    });
};

exports.create = (req, res) => {
    
    console.log('API Product > Create '+req.body.name);
    
    req.assert('name', 'Name cannot be empty').notEmpty();
    req.assert('description', 'Description cannot be empty').notEmpty();
    req.assert('qty', 'Quantity cannot be empty').notEmpty();
    req.assert('qty', 'Quantity must be numeric').isNumeric();

    const errors = req.validationErrors();

    if (errors) {
      return res.json({
       "Result":"ERROR",
       "Message":errors
      });
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      qty: req.body.qty
    });

    Product.findOne({ name: req.body.name }, (err, existingProduct) => {
      
      console.log('Looking for exsiting product with the same name...');      

      if (existingProduct) {
        return res.json({
          "Result":"ERROR",
          "Message":'Product with the same name already exists.'
        });
      }

      product.save((err, newProduct) => {
        
      console.log('No entry found, creating new product...');   

        if (err) { 
          return res.json({
            "Result":"ERROR",
            "Message": err
          });
        }
        
      console.log('Saving entry in DB OK. Returning Ajax response..');   

        return res.json({
          "Result":"OK",
          "Record": newProduct
        });
      });
    }); };

exports.update = (req, res) => {
//
  req.assert('name', 'Name cannot be empty').notEmpty();
  req.assert('description', 'Description cannot be empty').notEmpty();
  req.assert('qty', 'Quantity cannot be empty').notEmpty();
  req.assert('qty', 'Quantity must be numeric').isNumeric();

  const errors = req.validationErrors();

  if (errors) {
    return res.json({
       "Result":"ERROR",
       "Message":errors
      });
  }

  Product.findById(req.body._id, (err, product) => {
    if (err) { 
      return res.json({
       "Result":"ERROR",
       "Message":err
      });
    }
    product.name = req.body.name;
    product.description = req.body.description;
    product.qty = req.body.qty;
    product.save((err) => {
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
  Product.remove({ _id: req.body._id }, (err) => {
    if (err) { return next(err); }
    res.json({
          "Result":"OK"
    });
  }); };
