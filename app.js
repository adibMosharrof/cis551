const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/home');
const {getWorkOrdersSummaryPage} = require('./routes/work_orders_summary');
const {getWorkOrdersMonthlyPage} = require('./routes/work_orders_monthly');
const {getWorkOrdersAddPage, workOrdersAdd} = require('./routes/work_orders');
const {getPackagesPage, getPackageTableData, getPackagesAddPage, packagesAdd} = require('./routes/packages');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = process.env.PORT || 5000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.

// const db = mysql.createConnection ({
//     host: process.env.HOST || 'localhost',
//     user: process.env.USER || 'root',
//     password: process.env.PASSWORD || '',
//     database: process.env.DATABASE || 'heroku_dfddc728376b7c9'
// });
//
//
// // connect to database
// db.connect((err) => {
//     if (err) {
//         throw err;
//     }
//     console.log('Connected to database');
// });
// global.db = db;
//
// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder

// routes for the app

app.get('/', getHomePage);
app.get('/housing_complex/:housing_complex_id/work_orders_summary', getWorkOrdersSummaryPage);
app.get('/housing_complex/:housing_complex_id/work_orders_monthly', getWorkOrdersMonthlyPage);
app.get('/housing_complex/:housing_complex_id/work_orders_add', getWorkOrdersAddPage);
app.post('/work_orders_add', workOrdersAdd);
app.post('/packages_add', packagesAdd);
app.get('/housing_complex/:housing_complex_id/packages_add', getPackagesAddPage);
app.get('/housing_complex/:housing_complex_id/packages', getPackagesPage);
app.get('/packages/:housing_complex_id/:dates', getPackageTableData)
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
