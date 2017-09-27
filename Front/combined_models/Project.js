/**
 * Created by zhaoxuebin on 2016/12/31.
 */
var async = require('async');
var _Project_ = require('../models/_Project');
var _User_ = require('../models/_User');
var C_Element_ = require('../combined_models/Element');

var _Project = new _Project_();
var _User = new _User_();
var C_Element = new C_Element_();

module.exports = Project;

function Project() {
    Project.prototype.create = create;
    Project.prototype.getById = getById;
    Project.prototype.getAllElements = getAllElements;
    Project.prototype.getPlay_Count = getPlay_Count;
    Project.prototype.incPlay_Count = incPlay_Count;
    Project.prototype.clearPlay_Count = clearPlay_Count;
    Project.prototype.deleteById = deleteById;
    Project.prototype.deleteByIds = deleteByIds;
    Project.prototype.getProjectsByUser = getProjectsByUser;
    Project.prototype.updateName = updateName;

}

function create(project_name, description, user_Id, fn) {
    _Project.create(project_name, user_Id, description, [], function (err, doc_project) {
        if(err)
            return fn(err,doc_project);
        _User.addProject(user_Id,{project_Id:doc_project._id,name:project_name},function (err, doc) {
            fn(err,doc_project);
        })

    });
}

function getAllElements(project_Id,fn) {
    C_Element.getByProject(project_Id,function (err, doc) {
        fn(err,doc);
    })
}

function deleteById(project_Id, fn) {
    _Project.deleteById(project_Id, function (err, doc) {
        if (err)  return fn(err, doc);
        var user_Id = doc.user_Id;
        var element_Ids = [];
        for (var i = 0; i < doc.element_Id_items.length; i++) {
            element_Ids.push(doc.element_Id_items[i].element_Id);
        }
        _User.removeProject(user_Id, project_Id, function (err, doc) {
            if (err)
                return fn(err, doc);
            C_Element.deleteByIds(element_Ids, function (err, doc) {
                return fn(err, doc);
            });
        })
    })
}

function deleteByIds(project_Ids,fn) {
    var count =0;
    async.whilst(
        function () {
            return count < project_Ids.length;
        },
        function (callback) {
            deleteById(project_Ids[count],function (err, doc) {
                if(err) return fn(err,doc);
                count++;
                callback();
            });
        },
        function (err) {
            fn(err,count);
        }
    )
}

function getById(project_Id, fn) {
    _Project.getById(project_Id, function (err, doc) {
        fn(err, doc);
    });
}

function getPlay_Count(project_Id, fn) {
    _Project.getPlay_Count(project_Id, function (err, doc) {
        fn(err, doc);
    });
}

function incPlay_Count(project_Id, fn) {
    _Project.incPlay_Count(project_Id, function (err, doc) {
        fn(err, doc);
    });
}


function clearPlay_Count(project_Id, fn) {
    _Project.clearPlay_Count(project_Id, function (err, doc) {
        if (err) return fn(true, err);
        fn(false);
    });
}

function getProjectsByUser(user_Id, fn) {
    _Project.getByUser(user_Id, function (err, doc) {
        fn(err, doc);
    });
}

function updateName(project_Id, name, fn) {
    _Project.updateName(project_Id, name, function (err, doc) {
        fn(err, doc);
    });
}