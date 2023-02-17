const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars'); // { engine, create }
// const hbs = create({ /* config */ });
const rootDir = require('./utils/path');

const app = express();
// app.engine('hbs', expressHbs({extname: 'hbs', layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'})); // how we are registering the same should be given as file name extension for express-handlebars, eg:- 'handlebars' => 404.handlebars, 'hbs' => 404.hbs
app.set('view engine', 'ejs'); // registering template engine to express - pub - built in engine, so no need to register. But we ned to register express-handlebars as it's not built in engine to node
app.set('views', path.join(rootDir, 'views'));

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: 'Page Not Found', text: 'Page not found Amigos!!!', path: '/404'}); // Note: the way we pass data to template doesn't change with the template engine change
});

app.listen(3000);
