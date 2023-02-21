const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const p = path.join(rootDir, 'data', 'cart.json');
  
module.exports = class Cart {
    // constructor() {
    //     this.products = [];
    //     this.totalPrice = 0;
    // } // we dont use this approach bcz we no need to create cart everytime when we add items to cart. cart will be available every time in every page..we just ned to show the number of items in cart.

    static addProduct(id, productPrice) {
        // fetch for the previous products
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if (!err) {
                console.log('file content', fileContent);
                cart = fileContent && JSON.parse(fileContent);
            } else {
                cart = {...cart};
            }
            //analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            // add new product or increase qunatity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = existingProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err =>{
                console.log('update cart error', err);
            })
        })
    }
    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const cart = JSON.parse(fileContent);
            const updatedCart = {...cart};
            const product= updatedCart.products.findIndex(prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(p, JSON.stringify(updatedCart), err =>{
                console.log('update cart error', err);
            })
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = {...JSON.parse(fileContent)};
            if (err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
}