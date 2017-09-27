/**
 * Created by zhaoxuebin on 2016/12/9.
 */
var ProjectModel = require("../schema/Schema.js").ProjectModel;

exports.Project= Project;

function Project() {
    if(typeof this.newProject == "undefined"){
        Project.prototype.newProject =newProject;
    }
    if(typeof this.getProjectsByUserId == "undefined"){
        Project.prototype.getProjectsByUserId =getProjectsByUserId;
    }
    if(typeof this.addProjectToUser == "undefined"){
        Project.prototype.addProjectToUser =addProjectToUser;
    }
    if(typeof this.deleteProject == "undefined"){
        Project.prototype.deleteProject =deleteProject;
    }
};

/**
 *  新建一个project ，必须指定project的拥有者信息
 * @param name [String (required)]  project名称
 * @param user_Id [ObjectId (required)] 此project拥有者user
 * @param element_ids [[ObjectId] (optional)] 此project 拥有的互动元素Id集合
 * @param fn
 */
function newProject(name,user_Id,element_Ids,fn) {
    var query = ProjectModel.create({
        name:name,
        user_Id:user_Id,
        time:Date.now(),
        element_Id:element_Ids
    },function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 获取project ，通过user_Id
 * @param user_Id [String (required)]
 * @param fn     [Function (required)]
 */
function getProjectsByUserId(user_Id, fn) {
     var query = ProjectModel.find({user_Id:user_Id},function (err, doc) {
         fn(err,doc);
     });
};

/**
 * 设置项目的拥有者
 * @param project_Id [Object_Id (required)]
 * @param user_Id   [Object_Id (required)]
 * @param fn  [Function  (required)]
 */
function addProjectToUser(project_Id,user_Id,fn) {
    var query = ProjectModel.findOneAndUpdate({_id:project_Id},{$set:{user_Id:user_Id}},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 删除一个project ,通过 _id
 * @param project_Id
 * @param fn
 */
function deleteProject(project_Id,fn) {
    var query =ProjectModel.findOneAndRemove({_id:project_Id},function (err, doc) {
        fn(err,doc);
    });
};


