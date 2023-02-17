const path = require('path');

const express = require('express');

const adminRouter = express.Router();

const rootDir = require('../utils/path');

// /admin/add-product => get
adminRouter.get('/add-product', (req, res, next) => { // same patch can be used admin/ add-product for both get and post, as methods differ.
    console.log('In add-product middeware!');

    // res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')); // without rootDir

    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

    // res.send(`<html>
    // <head>
    // <title><h1>Product view</h1></title>
    // </head>
    // <body>
    // <form action="/admin/add-product" method="POST">
    // <input type="text" name="product" />
    // <button type="submit">Add product</button>
    // </form>
    // </body>
    // </html>`);
 });

// /admin/add-product => post
 adminRouter.post('/add-product', (req, res, next) => { // 1. filter for post request - it also has patch & put methods , 2. Need to add like '/admin/add-product' if in app.js no filter is passed
    console.log('In product middeware!', req.body);
    res.redirect('/');
 });

module.exports = adminRouter;