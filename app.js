var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var audioRouter = require("./routes/audio");
var adminRouter = require("./routes/admin");
var playlistRouter = require("./routes/playlist");

// DataBase 
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "music"
});

con.connect(function (err) {
  if (err) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use("/public", express.static('public')); 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Make our db accessible to our router
app.use(function (req, res, next) {
  req.con = con;
  next();
});


app.use('/', indexRouter);
app.use("/audio", audioRouter);
app.use("/admin", adminRouter);
app.use("/playlists", playlistRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {  //TODO: Make 404 error page
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: "Express"});
});




module.exports = app;
