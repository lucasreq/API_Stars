const express = require('express');
const Cards = require('./models/Cards');
const bodyparser = require('body-parser')
var path = require('path');

//const Sequelize = require('sequelize');

const app = express();
var route = express.Router();

var indexRouter = require('./routes/index');
var apiRestRouter = require('./routes/rest/api');

app.use(bodyparser.urlencoded({ extended: true}))
app.use(bodyparser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/cartes',apiRestRouter);
  

app.use(function(req, res, next) {
    next(createError(404));
  });


app.listen(8000);