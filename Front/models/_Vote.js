/**
 * Created by zhaoxuebin on 2016/12/29.
 */
var VOTE_NUM = require('../sys_config').VOTE_NUM;
var VoteModel = require('../schema/Schema').VoteModel;

module.exports = _Vote;

function _Vote() {
        _Vote.prototype.create = create;
        _Vote.prototype.getById = getById;
        _Vote.prototype.deleteById = deleteById;
        _Vote.prototype.deleteByIds = deleteByIds;
        _Vote.prototype.updateNum = updateNum;
        _Vote.prototype.clear = clear;
        _Vote.prototype.incCountByIndex = incCountByIndex;
}

function getDefaultData() {
    var data = new Array();
    var num = VOTE_NUM;
    for (var i = 1; i <= num; i++) {
        data.push({
            index: i-1,
            count: 0
        });
    }
    return data;
}

function create(element_Id, num, fn) {
    VoteModel.create({
        _id: element_Id,
        num: num,
        data: getDefaultData()
    }, function (err, doc) {
        fn(err, doc);
    });
}

function getById(element_Id, fn) {
    VoteModel.findOne({_id: element_Id}, function (err, doc) {
        fn(err, doc);
    });
}

function deleteById(element_Id, fn) {
    VoteModel.findOneAndRemove({_id: element_Id}, function (err, doc) {
        fn(err, doc);
    });
}

function deleteByIds(element_Ids,fn) {
    VoteModel.remove({_id: {$in: element_Ids}}, function (err, doc) {
        fn(err, doc);
    });
}

function updateNum(element_Id, num, fn) {
    VoteModel.findOneAndUpdate({_id: element_Id}, {$set: {num: num}}, function (err, doc) {
        fn(err, doc);
    });
}

function clear(element_Id, fn) {
    VoteModel.findOneAndUpdate({_id: element_Id}, {$set: {data: getDefaultData()}}, function (err, doc) {
        fn(err, doc);
    });
}

function incCountByIndex(element_Id, index, fn) {
    VoteModel.findOneAndUpdate({
        _id: element_Id,
        data: {$elemMatch: {index: index}}
    }, {$inc: {'data.$.count': 1}}, function (err, doc) {
        fn(err, doc);
    });
}
