/**
 * Created by zhaoxuebin on 2016/12/11.
 */
var Data_ProjectModel = require("../schema/Schema.js").Data_ProjectModel;

exports.Data_Project =Data_Project;

function Data_Project() {
    if(typeof this.newData_Project == "undefined"){
        Data_Project.prototype.newData_Project =newData_Project;
    }
    if(typeof this.getData_Project == "undefined"){
        Data_Project.prototype.getData_Project =getData_Project;
    }
    if(typeof this.incUV == "undefined"){
        Data_Project.prototype.incUV =incUV;
    }
    if(typeof this.incPlay_Count == "undefined"){
        Data_Project.prototype.incPlay_Count =incPlay_Count;
    }
    if(typeof this.deleteData_Project == "undefined"){
        Data_Project.prototype.deleteData_Project =deleteData_Project;
    }
}

/**
 * 新建一个项目数据Data_Project文档
 * @param project_Id [Object_Id (required)]
 * @param play_count [Number (required)] 项目视频的播放次数
 * @param UV  [ Number (required)] UV量
 * @param fn [Number (required)]
 */
function newData_Project(project_Id,play_count,UV,fn) {
    var query =Data_ProjectModel.create({
        _id:project_Id,
        UV:UV,
        play_count:play_count
    },function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 获取一个项目数据Data_Project文档
 * @param project_Id [Object_Id (required)]
 * @param fn  [Function (required)]
 */
function getData_Project(project_Id,fn) {
    var query = Data_ProjectModel.findOne({_id:project_Id},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 自增 UV值
 * @param project_Id [Object_Id (required)]
 * @param fn [Function (required)]
 */
function incUV(project_Id,fn) {
    var query = Data_ProjectModel.findOneAndUpdate({_id:project_Id},{$inc:{UV:1}},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 自增 视频播放量 play_count
 * @param project_Id  [Object_Id (required)]
 * @param fn  [Function (required)]
 */
function incPlay_Count(project_Id,fn) {
    var query =Data_ProjectModel.findOneAndUpdate({_id:project_Id},{$inc:{play_count:1}},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 删除一个项目数据Data_Project文档
 * @param project_Id  [Object_Id (required)]
 * @param fn [Function (required)]
 */
function deleteData_Project(project_Id,fn) {
    var query =Data_ProjectModel.findOneAndRemove({_id:project_Id},function (err, doc) {
        fn(err,doc);
    });
};

