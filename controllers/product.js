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
/*
*   Returns list of products
*/
exports.list = (req, res) => {
  Product.find({}, (err, products) => {
    if (err) { return next(err); }
    res.json({
       "Result":"OK",
       "Records":products});
    });
};

/*
*   Insert new product
*/
exports.create = (req, res) => {  
    req.assert('name', 'Name cannot be empty').notEmpty();
    req.assert('description', 'Description cannot be empty').notEmpty();
    req.assert('currentQty', 'Current quantity cannot be empty').notEmpty();
    req.assert('currentQty', 'Current quantity must be a number').isNumeric();

    const errors = req.validationErrors();

    if (errors) {
      return res.json({
       "Result":"ERROR",
       "Message":errors[0].msg
      });
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      currentQty: req.body.currentQty,
      soldQty: 0
    });

    Product.findOne({ name: req.body.name }, (err, existingProduct) => {
      
      if (existingProduct) {
        return res.json({
          "Result":"ERROR",
          "Message":'Product with the same name already exists.'
        });
      }

      product.save((err, newProduct) => {

        if (err) { 
          return res.json({
            "Result":"ERROR",
            "Message": err
          });
        }
     
        return res.json({
          "Result":"OK",
          "Record": newProduct
        });
      });
    }); };


/*
*   Update existing product
*/
exports.update = (req, res) => {
  req.assert('name', 'Name cannot be empty').notEmpty();
  req.assert('description', 'Description cannot be empty').notEmpty();
  
  const errors = req.validationErrors();

  if (errors) {
    return res.json({
       "Result":"ERROR",
       "Message":errors[0].msg
      });
  }

  Product.findById(req.body._id, (err, product) => {
    if (err) { 
      return res.json({
       "Result":"ERROR",
       "Message":err.msg
      });
    }
    product.name = req.body.name;
    product.description = req.body.description;
    product.save((err) => {
      if (err) {
        return res.json({
          "Result":"ERROR",
          "Message":err.msg
          });
      }
     return res.json({
          "Result":"OK"
        });
    });
  });
};


/*
*   Update existing product
*/
exports.delete = (req, res) => {
  Product.remove({ _id: req.body._id }, (err) => {
    if (err) { return next(err); }
    res.json({
          "Result":"OK"
    });
  }); };
