/**
 * Created by zhaoxuebin on 2016/12/12.
 */
var mongoose = require("mongoose");
//****开发测试时临时代码
var dbconfig =require("../sys_config.js");
mongoose.connect(dbconfig.mongoose_constr);
//****test models

// var  Action_Kind = require('../models/Action_Kind').Action_Kind;
// var action_kind =  new  Action_Kind();
// action_kind.newAction_Kind(5,'kind_5',function (err,doc) {
//     console.log(err);
//     console.log(doc);
// });
// var Data_Element=require('../models/Data_Element').Data_Element;
// var data_element= new Data_Element();
// data_element.newData_Element(mongoose.Types.ObjectId(),34,4,function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// var Data_Project = require('../models/Data_Project').Data_Project;
// var data_project =new Data_Project();
// data_project.newData_Project(mongoose.Types.ObjectId(),3,3,function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });
// var Data_Vote = require('../models/Data_Vote').Data_Vote;
// var data_vote =new Data_Vote();
// data_vote.newData_Vote(mongoose.Types.ObjectId(),5,function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });
// var ElementModel =require('../schema/Schema').ElementModel;
// var SizeModel =require('../schema/Schema').SizeModel;
// var PositionModel =require('../schema/Schema').PositionModel;
// var Element= require('../models/Element').Element;
// var element = new Element();
// var eleObj= new ElementModel();
// eleObj.kind=3;
// eleObj.imgs=['img1','img2'];
// eleObj.sizes=[SizeModel({width:1,length:1}),SizeModel({width:2,length:2})];
// eleObj.positions=[PositionModel({top:1,left:1,height:1,width:1}),PositionModel({top:2,left:2,height:2,width:2})];
// element.newElement(eleObj,function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// var Frt= require('../models/Frt').Frt;
// var frt = new Frt();
// frt.newFrt(mongoose.Types.ObjectId(),5,function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });
// var Project =require('../models/Project.js').Project;
// var project =new Project();
// project.newProject('project_2',mongoose.Types.ObjectId(),[mongoose.Types.ObjectId(),mongoose.Types.ObjectId()],function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });
//
// var User= require('../models/User.js').User;
//
// var user = new User();
// user.addUser('foursmall_1','123','1207883008@qq.com',[],function(err,doc){
//     console.log(err),
//     console.log(doc);
// });
