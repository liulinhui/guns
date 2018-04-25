var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'guns'
});
connection.connect();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

/**
 * 获取新闻list
 */
app.get('/newsInterface/list', function (req, res) {
    var data = {
        data: {},
        count: 0
    };
    var language = req.query.language;
    var page = req.query.page;
    var limit = req.query.limit;
    var offset = (page - 1) * limit;
    connection.query(`select * from news where language='${language}' order by time desc limit ${offset},${limit};`, function (err, result, fileds) {
        if (err) res.send(err);
        else {
            data.data = result;
            connection.query(`select count(*) from news where language='${language}'`, function (err, result) {
                if (err) throw err;
                data.count = result[0]['count(*)'];
                res.send(data)
            });
        }
    })
});

/**
 * 根据ID查询新闻详情
 */
app.get('/newsInterface/details', function (req, res) {
    var id = req.query.id;
    connection.query(`select * from news where id =${id}`, function (err, result) {
        if (err) res.send(err);
        else {
            res.send(result[0])
        }
    })
})

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
