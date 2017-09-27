/**
 * Created by zhaoxuebin on 2016/12/28.
 */
var ProjectModel = require('../schema/Schema.js').ProjectModel;
module.exports = _Project;

function _Project() {
    _Project.prototype.create = create;
    _Project.prototype.getByUser = getByUser;
    _Project.prototype.getById = getById;
    _Project.prototype.deleteById = deleteById;
    _Project.prototype.deleteByIds=deleteByIds;
    _Project.prototype.updateDescription = updateDescription;
    _Project.prototype.deleteByUser = deleteByUser;
    _Project.prototype.addElement = addElement;
    _Project.prototype.updateName = updateName;
    _Project.prototype.removeElement = removeElement;
    _Project.prototype.incPlay_Count = incPlay_Count;
    _Project.prototype.getPlay_Count = getPlay_Count;
    _Project.prototype.clearPlay_Count = clearPlay_Count;
}

//新建一个项目
function create(name, user_Id, description, element_Id_items, fn) {
    var date = new Date();
    ProjectModel.create({
        name: name,
        user_Id: user_Id,
        created: date,
        updated: date,
        description: description,
        element_Id_items: element_Id_items
    }, function (err, doc) {
        fn(err, doc);
    });
}

//获取一个用户的所有项目，根据用户Id
function getByUser(user_Id, fn) {
    ProjectModel.find({user_Id: user_Id}, function (err, docs) {
        fn(err, docs);
    });
}

//通过id获取一个项目
function getById(project_Id, fn) {
    ProjectModel.findOne({_id: project_Id}, function (err, doc) {
        fn(err, doc);
    });
}


//删除一个项目，通过id
function deleteById(project_Id, fn) {
    ProjectModel.findOneAndRemove({_id: project_Id}, function (err, doc) {
        fn(err, doc);
    });
}

function deleteByIds(project_Ids,fn) {
    ProjectModel.remove({_id:{$in:project_Ids}},function (err, doc) {
       fn(err,doc);
    });
}

//删除多个项目，通过user_Id
function deleteByUser(user_Id, fn) {
    var query = ProjectModel.remove();
    query.where('user_Id', user_Id);
    query.exec(function (err, doc) {
        fn(err, doc);
    });
}

//更新项目的备注信息
function updateDescription(project_Id, description, fn) {
    ProjectModel.findOneAndUpdate({_id: project_Id}, {
        $set: {
            description: description,
            updated: new Date()
        }
    }, function (err, doc) {
        fn(err, doc);
    });
}

//更新项目名称
function updateName(project_Id, name, fn) {
    ProjectModel.findOneAndUpdate({_id: project_Id}, {$set: {name: name, update: new Date()}}, function (err, doc) {
        fn(err, doc);
    });
}

//添加element引用
function addElement(project_Id, element_name, element_Id, fn) {
    ProjectModel.findOneAndUpdate({_id: project_Id}, {
        $push: {element_Id_items: {name: element_name, element_Id: element_Id}},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

//删除element引用
function removeElement(project_Id, element_Id, fn) {
    ProjectModel.findOneAndUpdate({_id: project_Id}, {
        $pull: {element_Id_items: {element_Id: element_Id}},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

//增加项目播放量
function incPlay_Count(project_Id, fn) {
    ProjectModel.findOneAndUpdate({_id: project_Id}, {$inc: {play_count: 1}}, function (err, doc) {
        fn(err, doc);
    });
}

function getPlay_Count(project_Id,fn) {
    ProjectModel.findOne({_id:project_Id},'play_count',function (err, doc) {
        fn(err,doc);
    });
}
// 清零项目播放量
function clearPlay_Count(project_Id, fn) {
    ProjectModel.findOneAndUpdate({_id: project_Id}, {play_count: 0}, function (err, doc) {
        fn(err, doc);
    });
}