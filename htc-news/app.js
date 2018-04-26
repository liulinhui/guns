var createError = require('http-errors');
var express = require('express');
var http = require('http');
var debug = require('debug')('htc-news:server');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'healthTrace@12345',
    database: 'guns'
});
connection.connect();

var app = express();
// 跨域设置
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
})
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
    var page = req.query.page || 1;
    var limit = req.query.limit || 10;
    var offset = (page - 1) * limit;
    connection.query(`select id,title,draft,realtime,time from news where language='${language}' order by time desc limit ${offset},${limit};`, function (err, result, fileds) {
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
    res.send(err);
});

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
