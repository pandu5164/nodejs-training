const http = require('http');

const express = require('express');

const app = express(); // as express exports as a function we need to call and initialize express such a way

// order matter a lot - top to bottom approach for routes

app.use('/', (req, res, next) => {
   console.log('this always calls');
   next(); // proceed to next middleware based on path
})

app.use('/add-product', (req, res, next) => { // next is used to call the function use and do the next step - first arg is path, 2nd is func.
   console.log('In product middeware!');
   res.send('<h1>Hai Pavan Kumar Z, this is a product view page</h1>'); // send response of type any - its an express func.
});
// we are not calling next() after line 9, so it never goes to line 12 and handle the req and resp. by matching path.
 app.use('/', (req, res, next) => { // next is used to call the function use and do the next step - first arg is path, 2nd is func.
    console.log('In another middeware!');
    res.send('<h1>Hai Pavan Kumar Z, this is default page</h1>'); // send response of type any - its an express func.
 });

app.listen(3000); // express way of create server