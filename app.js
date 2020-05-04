const express = require('express');
const Cards = require('./models/Cards');
var path = require('path');
//const Sequelize = require('sequelize');

const app = express();
var route = express.Router();

var indexRouter = require('./routes/index');
var apiRestRouter = require('./routes/rest/api');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/', indexRouter);
app.use('/cartes',apiRestRouter);

app.use(function(req, res, next) {
    next(createError(404));
  });


app.listen(8000);