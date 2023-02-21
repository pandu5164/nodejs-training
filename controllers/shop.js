const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    // console.log('shop.js', adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    
    // const { products } = adminData;
    const products = Product.fetchAll((products) => {
        res.render('shop/product-list', {pageTitle: 'All Products', prods: products, path: '/products', hasProducts: products && products.length > 0, activeShop: true, productCSS: true}); // render used to render default templating engine, ex: pug - no need to use file extension .html
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // console.log('prodId', prodId);
    Product.findById(prodId, product => {
        // console.log('prodDetail', product);
        res.render('shop/product-detail', {pageTitle: product.title, product: product, path: '/products'});
    });
}

exports.getIndex = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop/index', {pageTitle: 'Shop', prods: products, path: '/', hasProducts: products && products.length > 0, activeShop: true, productCSS: true}); // render used to render default templating engine, ex: pug - no need to use file extension .html
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }
            res.render('shop/cart', {pageTitle: 'My Cart', path: '/cart', products: cartProducts}); // render used to render default templating engine, ex: pug - no need to use file extension .html
        })
    })
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    console.log('prodid', prodId);
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price)
    })
    res.redirect('/cart');
    // res.render('shop/cart', {pageTitle: 'My Cart', path: '/cart'}); // render used to render default templating engine, ex: pug - no need to use file extension .html
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
}

exports.getOrders= (req, res, next) => {
    res.render('shop/orders', {pageTitle: 'Orders', path: '/orders'}); // render used to render default templating engine, ex: pug - no need to use file extension .html 
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {pageTitle: 'Checkout', path: '/checkout'}); // render used to render default templating engine, ex: pug - no need to use file extension .html 
}