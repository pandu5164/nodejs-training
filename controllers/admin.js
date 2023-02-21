const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('admin/edit-product', {pageTitle: 'Add Product', path: '/admin/add-product', editing: false, activeAddProduct: true, formsCSS: true, productCSS: true});
}

exports.postAddProduct = (req, res, next) => {
    // products.push({ title: req.body.title });
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            res.redirect('/');
        }
        res.render('admin/edit-product', {pageTitle: 'Edit Product', path: '/admin/edit-product', editing: editMode, product: product});
    })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc);
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('admin/products', {pageTitle: 'Admin Products', prods: products, path: '/admin/products', hasProducts: products && products.length > 0, activeShop: true, productCSS: true}); // render used to render default templating engine, ex: pug - no need to use file extension .html
    });
}
