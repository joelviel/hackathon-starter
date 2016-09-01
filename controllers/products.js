/**
 * GET /
 * Products page.
 */
exports.getProducts = (req, res) => {
  res.render('products', {
    title: 'Products'
  });
};