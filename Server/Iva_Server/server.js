/**
 * Created by zhaoxuebin on 2016/12/13.
 */

/**
 * 模块引入
 */
var express = require('express');
var bodyParser =require('body-parser');
var cookieParser =require('cookie-parser');

/**
 * Http server 设置
 */
var server = express();
server.set('port', 8080);

/**
 * 中间价
 */
server.use(bodyParser()).
       use(cookieParser());


/**
 * 路由模块
 */
require('./routes/api')(server);



/**
 * Http server startup
 */
server.listen(server.get('port'),function () {
    console.log('Express server listening on port ' + server.get('port'));
});
