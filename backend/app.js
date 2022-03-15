var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require('better-sqlite3');
//const jsonParser = express.json();

// DATABASE STUFF
const db = new database('./db/data.db', { verbose: console.log });
db.exec("CREATE TABLE IF NOT EXISTS Meal ( \
id INTEGER PRIMARY KEY AUTOINCREMENT, \
name TEXT, \
description VARCHAR(255) NOT NULL, \
price INTEGER, \
rating INTEGER, \
country TEXT, \
course TEXT \
)");

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

const { Server } = require('http');
const { log } = require('console');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// ENABLE CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;



const insert = db.prepare("INSERT INTO Meal \
(name, description, price, rating, country, course) \
VALUES (@name, @description, @price, @rating, @country, @course) ");

/*
insert.run({
    name: "Sample Name",
    description: "Description",
    price: 9999,
    rating: 5,
    country: "Russia",
    course: "Main Course"
});
*/
