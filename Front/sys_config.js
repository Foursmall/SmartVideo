/**
 * Created by zhaoxuebin on 2016/12/28.
 * 系统参数配置
 */
var mongoose_constr ="mongodb://root:root@localhost:28008/database";

var vote_num =10;
var actionkind_num = 15;
var jwt_secret ='bupt'

exports.MONGOOSE_CONSTR =mongoose_constr;
exports.VOTE_NUM =vote_num;
exports.ACTION_KIND_NUM = actionkind_num;
exports.JWT_SECRET= jwt_secret;