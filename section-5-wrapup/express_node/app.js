const http = require('http');

const express = require('express');

const app = express(); // as express exports as a function we need to call and initialize express such a way

// app.use((req, res, next) => { // next is used to call the function use and do the next step - commenting fr now by treating as dummy middleware
//     console.log('In the middeware!');
//     next(); // this next allows to run the next middleware function in line @ line-12
//  }); // use allaows to add a newmiddleware function and will execute for every incoming req.

 app.use((req, res, next) => { // next is used to call the function use and do the next step
    console.log('In another middeware!');
    res.send('<h1>Hai Pavan Kumar Z</h1>'); // send response of type any - its an express func.
 });

app.listen(3000); // express way of create server