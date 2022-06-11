// [x] initialize and configure Express app
// [x] initialize templating library
// [x] create home controller
// [x] bind routing
// [x] create layout
// [x] create data service
// - [x] read all
// - [x] read one by ID
// - [x] create
// - [] edit
// - [x] delete
// - [x] search
// [x] implement controllers
// - [x] home (catalog)
// - [x] about
// - [x] details
// - [x] create
// - [x] search
// - [x] edit
// - [x] delete
// [x] add front-end code

const express = require('express');
const hbs = require('express-handlebars');

const carsService = require('./services/carsService');

const { home } = require('./controllers/homeController');
const { about } = require('./controllers/aboutController');
const create = require('./controllers/createController');
const { details } = require('./controllers/detailsController');
const deleteController = require('./controllers/deleteController');
const edit = require('./controllers/editController');

const { notFound } = require('./controllers/notFound');

const app = express();

app.engine('hbs', hbs.create({
    extname: 'hbs'
}).engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(carsService());

app.get('/', home);
app.get('/about', about);
app.get('/details/:id', details);

app.route('/create')
    .get(create.get)
    .post(create.post);

app.route('/delete/:id')
    .get(deleteController.get)
    .post(deleteController.post);

app.route('/edit/:id')
    .get(edit.get)
    .post(edit.post);

app.all('*', notFound);

app.listen(3000, () => console.log('Server started on port 3000'));