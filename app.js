const express = require('express');
const Cards = require('./models/Cards');
const bodyparser = require('body-parser')
var path = require('path');

//const Sequelize = require('sequelize');

const app = express();
var route = express.Router();

var indexRouter = require('./routes/index');
var apiRestRouter = require('./routes/rest/api');

//Body parser
app.use(bodyparser.urlencoded({ extended: true}))
app.use(bodyparser.json())

//Template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Routes
app.use('/', indexRouter);
app.use('/cartes',apiRestRouter);

app.get('/cartes', function(req,req){
  app.render('cards/create', {title: "Create cards"})
})
  

app.use(function(req, res, next) {
    next(res.status(404).send());
  });


app.listen(8000);