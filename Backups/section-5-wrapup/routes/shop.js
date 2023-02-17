const path = require('path');

const express = require('express');

const shopRouter = express.Router();

const rootDir = require('../utils/path');

shopRouter.get('/', (req, res, next) => { //use exact method - if we use use() instead of get() then order matters
    console.log('In default middeware!');
    // res.send('<h1>Hai Pavan Kumar Z, this is default page</h1>');
    res.sendFile(path.join(rootDir, 'views', 'shop.html')); // 1. dirname - routes folder, 2. path.join method detects the operation system we are on and add the slash accordingly. (Win - \, linux - /)
 });

 module.exports = shopRouter;
