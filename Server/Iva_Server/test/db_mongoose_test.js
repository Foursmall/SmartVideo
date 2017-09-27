/**
 * Created by zhaoxuebin on 2016/12/7.
 */
var mongoose = require('mongoose');
var dbconfig =require('../sys_config.js');
mongoose.connect(dbconfig.mongoose_constr);
/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
    console.log('\nMongoose connection open to ' + dbconfig.mongoose_constr);
    mongoose.disconnect();
});

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {
    console.log('\nMongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('\nMongoose connection disconnected');
});