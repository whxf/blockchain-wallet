//Http相关
var create_error = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('express-session');
var secret = require('./config/secret');
const redis_store = require('connect-redis')(session);
var redis_config = require('./config/db').redis_config;


//路由
var index_router = require('./routes/index');
var api_router = require('./routes/api');
var message_router = require('./routes/message');
var user_router = require('./routes/user');
var transfer_router = require('./routes/transfer');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('trust proxy', 1); // trust first proxy


// 加载项
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: secret.session_secret,
    resave: true,
    saveUninitialized: false,
    rolling: true,
    cookie: redis_config.cookie,
    store: new redis_store(redis_config.sessionStore)
}));

// 映射路由
app.use('/', index_router);
app.use('/api', api_router);
app.use('/message', message_router);
app.use('/user', user_router);
app.use('/transfer', transfer_router);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(create_error(404));
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
