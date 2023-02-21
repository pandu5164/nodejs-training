// const products = [];
const fs = require('fs');
const path = require('path');
const rootDir = require('../utils/path');
const p = path.join(rootDir, 'data', 'products.json');

const Cart = require('./cart');

const getProductsfromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}
module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id,
        this.title = title,
        this.imageUrl = imageUrl,
        this.price = price,
        this.description = description
    }

    save() {
        getProductsfromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log('file write error:', error);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log('file write error:', error);
                });
            }
        });
    }
    static deleteById(id) {
        getProductsfromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id)
            console.log('product id to delete selected', product);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
                console.log('delete product failed by:', err);
            });
        });
    }
    static fetchAll (callback) {
        getProductsfromFile(callback);
    }
    static findById(id, cb) {
        getProductsfromFile(products => {
            const product = products.find(p => p.id === id)
            console.log('product selected', product);
            cb(product);
        });
    }
} 