/**
 * Created by zhaoxuebin on 2016/12/7.
 */
var _uuid = require('node-uuid');
function get () {
    return _uuid.v1();
}
exports.get =get;