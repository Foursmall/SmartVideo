/**
 * Created by zhaoxuebin on 2016/12/28.
 * 数据库连接模块
 */
var mongoose= require('mongoose');
var sys_config =require('./sys_config');

module.exports= function () {
    // connection
    mongoose.connect(sys_config.MONGOOSE_CONSTR);
}
