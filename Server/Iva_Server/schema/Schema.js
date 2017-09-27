/**
 * Created by zhaoxuebin on 2016/12/7.
 */
var mongoose = require("mongoose");
var dbconfig =require('../sys_config.js');

var Schema = mongoose.Schema;

var userSchema = new  Schema({
    name: {type:String,required :true,index:1},
    pwd:  {type:String,required:true} ,
    email:{type:String ,required:true,index:1},
    time:  {type: Date,default:Date.now},
    project_Id:[Schema.ObjectId]
    }, { id:true,versionKey: false,collection:'user'});

var projectSchema =new  Schema({
    name :{type:String ,required :true},
    time :{type: Date,default:Date.now},
    user_Id:{type:Schema.ObjectId ,required :true,index:1},
    element_Id :[Schema.ObjectId]
    }, { id:true,versionKey:false,collection:'project'});

var frtSchema =new  Schema({
    _id :{type:Schema.ObjectId,index:1,required:true},
    count :{type :Number  ,default :0}
    }, { _id:false,versionKey:false,collection:'frt',id:true } );

var sizeSchema =new  Schema({
    width:{type:Number,required :true},
    length:{type:Number,required:true}
    }, { _id:false  });

var positionSchema =new Schema({
    top:{type:Number,required :true},
    left:{type:Number,required :true},
    width:{type:Number,required :true},
    height:{type:Number,required :true}
    },{ _id:false });

var elementSchema = new Schema({
    kind : {type: Number,required:true},
    titles:[String],
    imgs:[String],
    colors:[String],
    times:[Number],
    links:[String],
    sizes:[sizeSchema],
    positions:[positionSchema],
    texts:[String]
    },{id:true,versionKey:false,collection:'element'});

var vote_itemSchema = new  Schema({
    name:{type:String,required:true},
    count:{type:Number,required:true}
    },{ _id:false,versionKey:false });

var data_voteSchema =new Schema({
    _id :{type:Schema.ObjectId,index:1,required:true},
    num: {type:Number,default: 0},
    count:[vote_itemSchema]
    }, { _id:false,versionKey:false,collection:'data_vote',id:true  });

var data_actionSchema =new Schema({
    kind:{type:Number,required:true},
    count:{type:Number,required:true}
    },{ _id:false });

var data_elementSchema =new Schema({
    _id :{type:Schema.ObjectId,index:1,required:true},
    show_count:{type:Number,default:0},
    kind:{type:Number,requied:true},
    data:[data_actionSchema]
    },{ _id:false,versionKey:false,collection:'data_element',id:true });

var data_projectSchema =new Schema({
    _id:{type:Schema.ObjectId,index:1,required:true},
    play_count :{type:Number,default:0},
    UV:{type:Number,default:0}
    },{ _id:false,id:true,versionKey:false,collection:'data_project' });

var action_kindSchema = new Schema({
    _id:{type:Number,required :true,index:1},
    name:{type:String,required:true,index:1}
    },{ _id:false,id:true,versionKey:false,collection:'action_kind' });


var UserModel = mongoose.model('UserModel',userSchema);
var ProjectModel = mongoose.model('ProjectModel',projectSchema);
var FrtModel =mongoose.model('FrtModel',frtSchema);
var ElementModel =mongoose.model('ElementModel',elementSchema);
var SizeModel = mongoose.model('SizeModel',sizeSchema);
var PositionModel =mongoose.model('PositionModel',positionSchema);
var Data_VoteModel = mongoose.model('Data_VoteModel',data_voteSchema);
var Data_ActionModel =mongoose.model('Data_ActionModel',data_actionSchema);
var Data_ElementModel = mongoose.model('Data_ElementModel',data_elementSchema);
var Data_ProjectModel = mongoose.model('Data_ProjectModel',data_projectSchema);
var Action_KindModel =mongoose.model('Action_KindModel',action_kindSchema);
var Vote_ItemModel =mongoose.model('Vote_ItemModel',vote_itemSchema);

exports.UserModel=UserModel;
exports.ProjectModel=ProjectModel;
exports.FrtModel =FrtModel;
exports.ElementModel=ElementModel;
exports.SizeModel =SizeModel;
exports.PositionModel= PositionModel;
exports.Data_VoteModel =Data_VoteModel;
exports.Data_ActionModel =Data_ActionModel;
exports.Data_ElementModel= Data_ElementModel;
exports.Data_ProjectModel =Data_ProjectModel;
exports.Action_KindModel =Action_KindModel;
