const http = require('http');

const path = require('path');

const bodyParser = require('body-parser'); // if not given by express version using, then need to install exclusively

const express = require('express');

const adminRoutes = require('./routes/admin');

const shopRoutes = require('./routes/shop');

const rootDir = require('./utils/path');

const app = express();

app.use(bodyParser.urlencoded({extended: false})); // it's used to parse the req. - used for forms only not for files or json - use options extended to false to remove wwarnings

app.use(express.static(path.join(__dirname, 'public'))); // for static files to serve like css or images
// app.use(adminRoutes);

app.use('/admin', adminRoutes); // filtered with path, now it appends admin/add-product

app.use(shopRoutes);

app.use((req, res, next) => {
   // res.status(404).send('<h1>404, page not found</h1>'); //chainingis possible with res -> res.setHeader().status().send();
   // res.sendFile(path.join(__dirname, 'views', '404.html'));
   res.sendFile(path.join(rootDir, 'views', '404.html'));
});

app.listen(3000);