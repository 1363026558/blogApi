var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//token秘钥
global.secret = '35asdfsa5f';
app.set('secret', '35asdfsa5f');

//allow custom header and CORS
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }
  else {
    next();
  }
});

//改写入口
var http = require('http');
var server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//静态资源
app.use('/public/uploads', express.static(path.join(__dirname, '/public/uploads')));

//post请求
app.use(bodyParser.urlencoded({}))
app.use('/', indexRouter);
app.use('/users', usersRouter);


server.listen('3000')