var sys_config= require('./sys_config');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession =require('cookie-session');
var cors= require('cors');
var jwt = require('jwt-simple');
var engines = require('consolidate');

//数据库启动模块
require('./db')();
//

var index = require('./routers/index');
var users = require('./routers/users');
var UserRouter = require('./routers/UserRouter');
var ProjectRouter = require('./routers/ProjectRouter');
var ElementRouter = require('./routers/ElementRouter');
var API = require('./routers/API');
var ImageRouter = require('./routers/ImageRouter');
var VerifyRouter = require('./routers/VerificationRouter');
var multiparty =  require('connect-multiparty');

var multipartMiddleware = multiparty();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.engine('jade', engines.jade);
// app.engine('html', engines.ejs);
// app.set('view engine', 'jade');


app.set('image_db',path.join(__dirname,'image_db'));
app.use(cors());
app.set('jwtTokenSecret','fousrsmall');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//Concise output colored by response status for development use.
// The :status token will be colored red for server error codes,
// yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  secret:'FOURSMALL',
  key:'sid',
  cookie:{secure:false,httpOnly:true,maxAge:12*60*60*1000}
  //会话有效期设置30分钟
}));



//To create a virtual path prefix (where the path does not actually exist in the file system) for files
//However, the path that you provide to the express.static function is relative to the directory from
// where you launch your node process. If you run the express app from another directory,
// it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.join(__dirname, 'public')));
app.use('/videoplus',express.static(path.join(__dirname, 'videoplus')));

app.use('/image_db',express.static(path.join(__dirname, 'image_db')));
app.use('/image',express.static(path.join(__dirname, 'image_db')));




app.use('/', index);
app.use('/users', users);
app.use('/user',UserRouter);
app.use('/project',ProjectRouter);
app.use('/element',ElementRouter);
app.use('/api',API);
app.use('/image',multipartMiddleware,ImageRouter);
app.use('/verification',VerifyRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


//app.set('env','production');
console.log(app.get('env'));

//使用npm  start 命令启动服务器时，无需添加
app.listen(3000);


module.exports = app;
