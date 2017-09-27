/**
 * Created by zhaoxuebin on 2016/12/29.
 */
var ACTION_KIND_NUM = require('../sys_config').ACTION_KIND_NUM;
var Element_ActionModel = require('../schema/Schema').Element_ActionModel;

module.exports = _Element_Action;

function _Element_Action() {
    _Element_Action.prototype.create = create;
    _Element_Action.prototype.getById =getById;
    _Element_Action.prototype.deleteById = deleteById;
    _Element_Action.prototype.deleteByIds= deleteByIds;
    _Element_Action.prototype.incCountByKind = incCountByKind;
    _Element_Action.prototype.clearData=clearData;
}

function getDefaultData() {
    var num = ACTION_KIND_NUM;
    var default_datas = new Array();
    for (var i = 1; i <= num; i++) {
        default_datas.push({kind: i, count: 0});
    }
    return default_datas;
}

function create(element_Id, fn) {
    Element_ActionModel.create({
        _id: element_Id,
        data: getDefaultData()
    }, function (err, doc) {
        fn(err, doc);
    });
}

function getById(element_Id,fn) {
    Element_ActionModel.findOne({_id:element_Id},{},function (err,doc) {
        fn(err,doc);
    });
}

function deleteById(element_Id, fn) {
    Element_ActionModel.findOneAndRemove({_id: element_Id}, function (err, doc) {
        fn(err, doc);
    });
}

function deleteByIds(element_Ids,fn) {
    Element_ActionModel.remove({_id: {$in: element_Ids}}, function (err, doc) {
        fn(err, doc);
    });
}

function incCountByKind(element_Id, kind, fn) {
    Element_ActionModel.findOneAndUpdate({
        _id: element_Id,
        data: {$elemMatch: {kind: kind}}
    }, {$inc: {'data.$.count': 1}}, function (err, doc) {
        fn(err, doc);
    });
}

function clearData(element_Id,fn) {
    Element_ActionModel.findOneAndUpdate({_id:element_Id},{$set:{data:getDefaultData()}},function (err, doc) {
        fn(err,doc);
    });
}
