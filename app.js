var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Para usar el JSON Web Token
const jwt = require('jsonwebtoken');

// Para usar las variables almacenadas en .env
require('dotenv').config();

/* Hago el require de las rutas y las asigno a una variable */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var salesRouter = require('./routes/sales');
var categoriesRouter = require('./routes/categories');
var adminRouter = require('./routes/admin');

var app = express();

// Defino la Secret Key
app.set('secretKey', process.env.SECRET_KEY);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/** HEADER INICIO */
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,DELETE,PUT');
  next();
});
app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
  res.send(200);
});
/** HEADER FIN */


/* app.use para asignar el router a una URL */
// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/sales', validateUser, salesRouter);
app.use('/categories', categoriesRouter);
app.use('/admin', adminRouter);

// Declaro el método validateUser 
function validateUser (req, res, next) {
  jwt.verify (req.headers ['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({message: err.message});
    } else {
      req.body.userToken = decoded;
      next(); // Este next hace que continúe la ejecución del código
    }
  });
}

// Declaro el método validateAdmin 
function validateAdmin (req, res, next) {
  jwt.verify (req.headers ['x-access-token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({message: err.message});
    } else {
      req.body.adminToken = decoded;
      next(); // Este next hace que continúe la ejecución del código
    }
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
