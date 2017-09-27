/**
 * Created by zhaoxuebin on 2016/12/9.
 */
var FrtModel = require("../schema/Schema.js").FrtModel;

exports.Frt= Frt;

function Frt() {
    if(typeof this.newFrt == "undefined"){
        Frt.prototype.newFrt =newFrt;
    }
    if(typeof this.getFrt == "undefined"){
        Frt.prototype.getFrt =getFrt;
    }
    if(typeof this.getFrtCount == "undefined"){
        Frt.prototype.getFrtCount =getFrtCount;
    }
    if(typeof this.incFrt == "undefined"){
        Frt.prototype.incFrt =incFrt;
    }
    if(typeof this.deleteFrt == "undefined"){
        Frt.prototype.deleteFrt =deleteFrt;
    }
};


/**
 * 新建一个投票文档
 * @param element_Id [String (required)]
 * @param count [String (required)]
 * @param fn  [Function (required)]
 */
function newFrt(element_Id,count,fn) {
    var query =FrtModel.create({
        _id:element_Id,
        count:count
    },function (err, doc) {
       fn(err,doc);
    });
};

/**
 * 获取一个Frt，根据 element_Id
 * @param element_Id [String  (required)]
 * @param fn  [Function  (required) ]
 */
function getFrt(element_Id,fn) {
    var query = FrtModel.findOne({_id:element_Id},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 获取一个Frt的count字段,返回一个文档，此文档中，只有一个count 字段
 * @param element_Id [String (required)]
 * @param fn  [Function (required)]
 */
function getFrtCount(element_Id,fn) {
    var query = FrtModel.findOne({_id:element_Id});
    query.select({count:1,_id:0});
    query.exec(function(err,doc){
        fn(err,doc);
    });

};

/**
 * 投票数量加一 操作
 * @param element_Id [String (required) ]
 * @param fn  [Function (required)]
 */
function incFrt(element_Id,fn) {
    var query = FrtModel.findOneAndUpdate({_id:element_Id},{$inc:{count:1}},function (err, doc) {
        fn(err,doc);
    });
}

/**
 * 删除一个 FrtModel 文档
 * @param element_Id [String (required)]
 * @param fn  [Function (required)]
 */
function deleteFrt(element_Id,fn) {
    var query = FrtModel.findOneAndRemove({_id:element_Id},function (err, doc) {
        fn(err,doc);
    });
};

