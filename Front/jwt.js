/**
 * Created by zhaoxuebin on 2017/3/13.
 */
var jwt  = require('jwt-simple');



var id= 12345;
var token = jwt.encode({id:id},'smartvideo');

console.log(token);
var _id = jwt.decode(token,'smartvideo');
console.log(_id.id);
