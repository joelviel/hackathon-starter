const Product = require('../models/Product');

/**
 * GET / api/products
 * Products page.
 */
exports.getProducts = (req, res) => {
   res.render('product', {
    title: 'Products'
  });
};

/**
 * GET /
 * Product form page.
 */
exports.getProduct = (req, res) => {
  Product.find({}, (err, product) => {
    if (err) { return next(err); }
    res.render('product', {
      title: 'Products',
      productlist: product
    });
  });
};

/**
 * POST /product
 * Insert new product.
 */
exports.postInsertProduct = (req, res, next) => {
  req.assert('name', 'Name cannot be empty').notEmpty();
  req.assert('description', 'Description cannot be empty').notEmpty();
  req.assert('qty', 'Quantity cannot be empty').notEmpty();
  req.assert('qty', 'Quantity must be numeric').isNumeric();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/products/index');
  }

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    qty: req.body.qty
  });

  Product.findOne({ name: req.body.name }, (err, existingProduct) => {
    if (existingProduct) {
      req.flash('errors', { msg: 'Product with the same name already exists.' });
      return res.redirect('/products/index');
    }
    product.save((err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Product has been added succesfully.' });
      return res.redirect('/products/index');
    });
  });
};

/**
 * POST /product
 * Update product.
 */
exports.postUpdateProduct = (req, res, next) => {
  req.assert('name', 'Name cannot be empty').notEmpty();
  req.assert('description', 'Description cannot be empty').notEmpty();
  req.assert('qty', 'Quantity cannot be empty').notEmpty();
  req.assert('qty', 'Quantity must be numeric').isNumeric();

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/products/index');
  }

  Product.findById(req.body.id, (err, product) => {
    if (err) { return next(err); }
    product.name = req.body.name;
    product.description = req.body.description;
    product.save((err) => {
      if (err) { return next(err); }
      req.flash('success', { msg: 'Product has been updated.' });
      res.redirect('/products/index');
    });
  });
};

/**
 * POST /product
 * Delete product.
 */
exports.postDeleteAccount = (req, res, next) => {
  Product.remove({ _id: req.body.id }, (err) => {
    if (err) { return next(err); }
    req.flash('info', { msg: 'Product has been deleted.' });
    res.redirect('/');
  });
};