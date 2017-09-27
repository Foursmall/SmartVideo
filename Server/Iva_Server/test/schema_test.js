/**
 * Created by zhaoxuebin on 2016/12/8.
 */

var mongoose = require("mongoose");
var  schema = require("../schema/Schema.js");
var dbconfig =require("../sys_config.js");
var db =mongoose.connect(dbconfig.mongoose_constr);
var user = require("./User.js");
var project =require('./Project.js');
var frt = require('./Frt.js');
var element =require('./Element.js');
var data_vote = require('./Data_Vote.js');
var data_element= require('./Data_Element.js');
var action_kind =require('./Action_Kind.js');


// user.addUser('foursmall_2','798','2274438770',["58494334b03d8d758052af62"]);
//project.addProject("video_2","5849443eb03d8d758052af66");
// //frt.addFrt("58493fddb03d8d758052af53",110);
// var _size =new  SizeModel({
//     length:4,
//     width:4
// });
// element.addElement(2,["title1","title2"],['img1','img2'],["color1","color2"],[2.2,3,2],['www.baidu.com'],
//     [ _size],
//    [ new PositionModel({top:1,left:1,width:1,height:1}),new PositionModel({top:2,left:2,width:2,height:2})],
//     []
//     ["text1","text2"]
// );
//data_vote.addData_Vote(mongoose.Types.ObjectId(),4);
//data_element.addData_Element(mongoose.Types.ObjectId(),0,0,2,[{kind:1,count:11},{kind:2,count:22}]);

// action_kind.addAction_Kind(4,'kind4');