//import require libs
var express = require('express');
var validator = require('express-validator');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var passport = require('passport');
// var session = require('express-session');

//routing for each component
var index = require('./routes/index');
var inventories = require('./routes/inventories');
var items = require('./routes/items');
var categories = require('./routes/categories');
var users = require('./routes/users');
var auth = require('./routes/auth');

//load passport stategies
require('./config/passport');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

//log request to console
app.use(logger('dev'));

//for fav icon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  safeFileNames: true,
  preserveExtension: true
}));
app.use(validator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret:'keyboard cat',
//   resave: true,
//   saveUninitialized: true 
// }));
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/', index);
app.use('/inventories', passport.authenticate('jwt', {session: false}), inventories);
app.use('/items', passport.authenticate('jwt', {session: false}), items);
app.use('/categories', passport.authenticate('jwt', {session: false}), categories);
app.use('/users', passport.authenticate('jwt', {session: false}), users);
app.use('/auth', auth);
app.use('/static', express.static('public'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// function handleError(err,req,res,next){
//   var output = {
//       error: {
//           name: err.name,
//           message: err.message,
//           text: err.toString()
//       }
//   };
//   var statusCode = err.status || 500;
//   res.status(statusCode).json(output);
// }

// app.use([handleError]);

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
