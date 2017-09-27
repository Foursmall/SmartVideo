/**
 * Created by zhaoxuebin on 2016/12/9.
 */
var mongoose = require("mongoose");
var Action_KindModel = require("../schema/Schema.js").Action_KindModel;

exports.Action_Kind=Action_Kind;

function Action_Kind() {
    if(typeof this.newAction_Kind == "undefined"){
        Action_Kind.prototype.newAction_Kind =newAction_Kind;
    }
    if(typeof this.getCount == "undefined"){
        Action_Kind.prototype.getCount =getCount;
    }
    if(typeof this.deleteAction_Kind == "undefined"){
        Action_Kind.prototype.deleteAction_Kind =deleteAction_Kind;
    }
    if(typeof this.updateAction_KindName == "undefined"){
        Action_Kind.prototype.updateAction_KindName =updateAction_KindName;
    }
}

/**
 * 新建一个Action_kind
 * @param id  [Object_Id (required)]
 * @param name [String (required)] action 类型描述
 * @param fn [Function (required) ]
 */
function newAction_Kind(id,name,fn) {
    var query = Action_KindModel.create({
        _id:id,
        name:name
    },function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 获取action的种类数目
 * @param fn
 */
function getCount(fn) {
    var query= Action_KindModel.count(function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 删除一个Action_Kind文档
 * @param id  [Object_Id (required)]
 * @param fn   [Function (required)]
 */
function deleteAction_Kind(id,fn) {
    var query = Action_KindModel.findOneAndRemove({_id:id},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 修改action的名称name
 * @param id  [Object_Id (required)]
 * @param name [String (required) ]
 * @param fn   [Function (required)]
 */
function updateAction_KindName(id,name,fn) {
    var query =Action_KindModel.findOneAndUpdate({_id:id},{$set:{name:name}},function (err, doc) {
        fn(err,doc);
    });
};




