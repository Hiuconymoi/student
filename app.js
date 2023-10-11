var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter=require('./routes/student')



var app = express();

//khai bao date format
var hbs = require('hbs');
hbs.registerHelper('dateFormat', require('handlebars-dateformat')); 

//khai bao hbs
var hbs = require('hbs');
hbs.registerHelper('equal', require('handlebars-helper-equal'))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student',studentRouter);

//Khai bao body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false}))

//Khai bao va cau hinh thu vien mongoose
var mongoose = require("mongoose");
var uri = "mongodb+srv://hiuconymoi:vanhieu2k3@cluster0.4gstzz5.mongodb.net/gch1105";
mongoose.connect(uri)
.then(()=>console.log("Connect to db OK"))
.catch((err) => console.log (err));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//cau hinh port cua server de deploy len cloud
app.listen(process.env.PORT||3001);

module.exports = app;
