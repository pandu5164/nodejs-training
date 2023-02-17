const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('shop.js', adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  const { products } = adminData;
  res.render('shop', {pageTitle: 'Shop', prods: products, path: '/', hasProducts: products && products.length > 0, activeShop: true, productCSS: true}); // render used to render default templating engine, ex: pug - no need to use file extension .html
});

module.exports = router;
