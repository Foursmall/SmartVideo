/**
 * Created by zhaoxuebin on 2016/12/9.
 */
var mongoose = require("mongoose");
var actionkind_num =require('../sys_config').actionkind_num;
var Data_ElementModel = require("../schema/Schema.js").Data_ElementModel;

exports.Data_Element=Data_Element;

function Data_Element() {
    if(typeof this.newData_Element == "undefined"){
        Data_Element.prototype.newData_Element =newData_Element;
    }
    if(typeof this.deleteData_Element == "undefined"){
        Data_Element.prototype.deleteData_Element =deleteData_Element;
    }
    if(typeof this.incShow_Count == "undefined"){
        Data_Element.prototype.incShow_Count =incShow_Count;
    }
    if(typeof this.incKind_Action == "undefined"){
        Data_Element.prototype.incKind_Action =incKind_Action;
    }
}

/**
 * 新建一个element互动数据文档，无datas字段值
 * @param element_Id
 * @param show_count
 * @param kind
 * @param fn
 */
function newData_Element(element_Id, show_count, kind, fn) {
    var query = Data_ElementModel.create({
        _id:element_Id,
        show_count:show_count,
        kind:kind,
        data:getDefaultData()
    },function (err,doc) {
        fn(err,doc);
    });
};

/**
 * 删除一个element互动数据文档
 * @param element_Id
 * @param fn
 */
function deleteData_Element(element_Id,fn) {
    var query = Data_ElementModel.findOneAndRemove({_id:element_Id},function (err, doc) {
        ifn(err,doc);
    });
};

/**
 * 设置默认的data 数据集合值，所有kind的count值设为初始值0，data集合的数目有action_kind集合的count()决定
 * 暂时由配置文件[sys_config.js]里的actionkind_num决定
 * @param num [Number (required)]   action_kind集合的count()决定
 */
function getDefaultData() {
    var num =actionkind_num;
    var defaultdatas=new Array();
    for(var i=0;i<num;i++){
        defaultdatas.push({kind:i,count:0});
    }
    return defaultdatas;
}

/**
 * 设置data字段的值 ,datas值应该由function getDefaultData(num)生成
 * @param element_Id
 * @param datas
 * @param fn
 */
// function addDefaultData_Kind(element_Id, datas, fn) {
//     var query = Data_ElementModel.findOneAndUpdate({_id:element_Id},{$push:{data:{$each:datas}}},function (err, doc) {
//         fn(err,doc);
//     });
// };

/**
 * 互动元素曝光次数统计
 * @param element_Id
 */
function incShow_Count(element_Id,fn) {
    var query = Data_ElementModel.findOneAndUpdate({_id:element_Id},{$inc:{show_count:1}},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 自增 kind 类型的用户行为action
 * @param element_Id
 * @param kind
 */
function incKind_Action(element_Id,kind,fn) {
    var query = Data_ElementModel.findOneAndUpdate({_id:element_Id,data:{$elemMatch:{kind:kind}}},{$inc:{'data.$.count':1}},function (err, doc) {
        fn(err,doc);
    });
};




