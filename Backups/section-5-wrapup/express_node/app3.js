const http = require('http');

const bodyParser = require('body-parser'); // if not given by express version using, then need to install exclusively

const express = require('express');

const app = express();

app.use(bodyParser.urlencoded({extended: false})); // it's used to parse the req. - used for forms only not for files or json - use options extended to false to remove wwarnings

app.use('/', (req, res, next) => {
   console.log('this always calls');
   next();
})

app.use('/add-product', (req, res, next) => { 
   console.log('In product middeware!');
   res.send(`<html>
   <head>
   <title><h1>Product view</h1></title>
   </head>
   <body>
   <form action="/product" method="POST">
   <input type="text" name="product" />
   <button type="submit">Add product</button>
   </form>
   </body>
   </html>`);
});

// app.use('/product', (req, res, next) => { // app.use() used to access both get and post methods so we need to be specific to handle the request whether to catch only get / post
//    console.log('In product middeware!', req.body);
//    res.redirect('/');
// });

// app.get('/product', (req, res, next) => { //filter for get request
//    console.log('In product middeware!', req.body);
//    res.redirect('/');
// });

app.post('/product', (req, res, next) => { //filter for post request - it also has patch & put methods
   console.log('In product middeware!', req.body);
   res.redirect('/');
});

app.use('/', (req, res, next) => { 
    console.log('In another middeware!');
    res.send('<h1>Hai Pavan Kumar Z, this is default page</h1>');
 });

app.listen(3000);