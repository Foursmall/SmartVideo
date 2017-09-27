/**
 * Created by zhaoxuebin on 2016/12/9.
 */
var Data_VoteModel = require("../schema/Schema.js").Data_VoteModel;
var dbconfig =require("../sys_config.js");
exports.Data_Vote =Data_Vote;

function Data_Vote() {
    if(typeof this.newData_Vote == "undefined"){
        Data_Vote.prototype.newData_Vote =newData_Vote;
    }
    if(typeof this.deleteData_Vote == "undefined"){
        Data_Vote.prototype.deleteData_Vote =deleteData_Vote;
    }
    if(typeof this.clearData_Vote == "undefined"){
        Data_Vote.prototype.clearData_Vote =clearData_Vote;
    }
    if(typeof this.updateNum == "undefined"){
        Data_Vote.prototype.updateNum =updateNum;
    }
    if(typeof this.incItemCount == "undefined"){
        Data_Vote.prototype.incItemCount =incItemCount;
    }
}

/**
 * 生成默认的count字段填充数据，投票数目为10，在"../sys_config.js"中设置
 * @returns {Array}
 */
function getDefaultCount() {
    var defaultCount =new Array();
    var num =dbconfig.vote_num;
    for(var i=1;i<=num;i++){
        defaultCount.push({
            name:'vote_'+i,
            count:0
        });
    }
    return defaultCount;
};

/**
 * 新建一个投票数据Data_Vote对象
 * @param element_Id [Object_Id (required)]
 * @param num  [Number (required)]
 * @param fn  [Function (required)]
 */
function newData_Vote(element_Id,num,fn) {
    var query = Data_VoteModel.create({
        _id:element_Id,
        num:num,
        count:getDefaultCount()

    },function (err,doc) {
        fn(err,doc);
    });
};

/**
 * 删除一个投票数据Data_Vote对象
 * @param element_Id  [Object_Id (required)]
 * @param fn  [Function (required)]
 */
function deleteData_Vote(element_Id,fn) {
   var query = Data_VoteModel.findOneAndRemove({_id:element_Id},function (err, doc) {
       fn(err,doc);
   });
};

/**
 * 清除投票统计数据
 * @param element_Id
 * @param fn
 */
function clearData_Vote(element_Id,fn) {
    var query =Data_VoteModel.findOneAndUpdate({_id:element_Id},{$set:{count:getDefaultCount()}},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 修改投票互动元素的投票item数目，
 * @param element_Id  [Object_Id (required)]
 * @param num   num  [Number (required)]
 * @param fn   [Function (required)]
 */
function updateNum(element_Id,num,fn) {
    var query =Data_VoteModel.findOneAndUpdate({_id:element_Id},{
        $set:{
            num:num
        }
    },function (err,doc) {
        fn(err,doc);
    });
};

/**
 * 更新投票item的数目
 * @param element_Id [Object_Id (required)]
 * @param item [Number (required) ] 投票项 item
 * @param fn
 */
function incItemCount(element_Id,index,  fn) {
    var item ='vote_'+index;
    var query = Data_VoteModel.findOneAndUpdate({_id:element_Id,count:{$elemMatch:{name:item}}},{$inc:{'count.$.count':1}},function (err, doc) {
        fn(err,doc);
    });

};

