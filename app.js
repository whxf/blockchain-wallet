//Http相关
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var secret = require('./public/javascripts/constants/secret');
var ioRedis = require('ioredis');
const RedisStore = require('connect-redis')(session);
var redis_config = require('./public/javascripts/constants/db').redis_config;


//路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1); // trust first proxy


//加载项
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//     secret: secret.session_secret,
//     resave: false,
//     saveUninitialized: true,
// }));

app.use(session({
    secret: secret.session_secret,
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: redis_config.cookie,
    store: new RedisStore(redis_config.sessionStore)
}));


//映射路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

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
