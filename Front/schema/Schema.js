/**
 * Created by zhaoxuebin on 2016/12/28.
 * 使用mongoose生成原始模型
 */
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var project_Id_itemSchema = new Schema({
    name:{type:String,required:true},
    project_Id :{type:Schema.ObjectId,required:true}
},{_id:false});

var userSchema = new Schema({
    name: {type: String},
    password: {type: String, required: true},
    email: {type: String, index: 1},
    email_verify:{type:Boolean,default:false},
    phone:{type:String,index:1},
    phone_verify:{type:Boolean,default:false},
    verify_code:{type:String},
    created: {type: Date, required: true, default: new Date()},
    project_Id_items: [project_Id_itemSchema]
}, {_id: true, versionKey: false, collection: 'user'});

var element_Id_itemSchema = new Schema({
    name:{type:String,required:true},
    element_Id :{type:Schema.ObjectId,required:true}
},{_id:false});

var projectSchema = new Schema({
    name: {type: String, required: true},
    created: {type: Date, required: true, default: new Date()},
    updated: {type: Date },
    play_count: {type: Number, default: 0},
    user_Id: {type: Schema.ObjectId, required: true, index: 1},
    description: {type: String},
    element_Id_items: [element_Id_itemSchema]
}, {_id: true, versionKey: false, collection: 'project'});

var sizeSchema = new Schema({
    w: {type: Number, required: true},
    h: {type: Number, required: true}
}, {_id: false});

var positionSchema = new Schema({
    t: {type: Number, required: true},
    l: {type: Number, required: true},
    w: {type: Number, required: true},
    h: {type: Number, required: true}
}, {_id: false});

var elementSchema = new Schema({
    name: {type: String, required: true},
    kind: {type: Number, required: true},
    created:{type: Date, required: true, default: new Date()},
    updated:{type: Date},
    favourite:{type:Number,default:0},
    show_count: {type: Number, default: 0},
    description: {type: String},
    project_Id_item: project_Id_itemSchema,
    titles: [String],
    images: [String],
    colors: [String],
    times: [String],
    links: [String],
    sizes: [sizeSchema],
    positions: [positionSchema],
    texts: [String]

}, {_id: true, versionKey: false, collection: 'element'});

var vote_itemSchema = new Schema({
    index: {type: Number, required: true},
    count: {type: Number, required: true, default: 0}
}, {_id: false, versionKey: false});

var voteSchema = new Schema({
    _id: {type: Schema.ObjectId, index: 1, required: true},
    num: {type: Number, default: 0},
    data: [vote_itemSchema]
}, {_id: false, versionKey: false, collection: 'vote'});

var action_itemSchema = new Schema({
    kind: {type: Number, required: true},
    count: {type: Number, required: true}
}, {_id: false});

var element_actionSchema = new Schema({
    _id: {type: Schema.ObjectId, index: 1, required: true},
    data: [action_itemSchema]
}, {_id: false, versionKey: false, collection: 'element_action'});


var UserModel = mongoose.model('UserModel', userSchema);
var ProjectModel = mongoose.model('ProjectModel', projectSchema);
var SizeModel = mongoose.model('SizeModel', sizeSchema);
var PositionModel = mongoose.model('PositionModel', positionSchema);
var ElementModel = mongoose.model('ElementModel', elementSchema);
var VoteModel = mongoose.model('VoteModel', voteSchema);
var Action_ItemModel = mongoose.model('Action_ItemModel',action_itemSchema);
var Element_ActionModel = mongoose.model('Element_ActionModel', element_actionSchema);


exports.UserModel=UserModel;
exports.ProjectModel=ProjectModel;
exports.SizeModel = SizeModel;
exports.PositionModel = PositionModel;
exports.ElementModel = ElementModel;
exports.VoteModel = VoteModel;
exports.Element_ActionModel = Element_ActionModel;

