var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');

var routes = require('./routes/index');
var orion = require('./routes/orion');
var auth = require('./routes/auth');

var app = express();

// Para que no cachee y no devuelva los códigos 304 para los recursos
app.disable('etag');

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret: "skjghskdjfhbqigohqdiouk"}));

function authChecker(req, res, next) {
    if (req.session && req.session.access_token) {
        next();
    } else {
       res.redirect("/login");
    }
}

app.get('/login', function(req, res, next) {
  res.sendFile(__dirname + '/public/login.html');
});
app.get('/logout', function(req, res){
  req.session.access_token = undefined;
  res.redirect('/');
});
app.use('/auth', auth);

// Todo lo que esté a partir de este middleware requiere de autenticacion
app.use(express.static(path.join(__dirname, 'public')));
app.use(authChecker);
app.use('/', routes);
app.use('/orion', orion);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
