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

// const adminData = require('./routes/admin');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000);
