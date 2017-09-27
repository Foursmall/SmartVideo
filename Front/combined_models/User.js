/**
 * Created by zhaoxuebin on 2016/12/31.
 */
var _User_ = require('../models/_User');
var C_Project_ = require('../combined_models/Project');

var _User = new _User_();
var C_Project = new C_Project_();

module.exports = User;

function User() {
    User.prototype.createByEmail = createByEmail;
    User.prototype.createByPhone = createByPhone;
    User.prototype.getByPhone = getByPhone;
    User.prototype.getByEmail = getByEmail;
    User.prototype.getById = getById;
    User.prototype.deleteById = deleteById;
    User.prototype.updateName = updateName;
    User.prototype.updatePassword = updatePassword;
    User.prototype.setEmail = setEmail;
    User.prototype.setPhone = setPhone;

    User.prototype.verifyPhone = verifyPhone;
    User.prototype.verifyEmail = verifyEmail;
    User.prototype.saveCode = saveCode;
    User.prototype.getCode = getCode;
}

function verifyPhone(user_Id,fn) {
    _User.verifyPhone(user_Id,function (err, doc) {
        fn(err,doc);
    });
}

function verifyEmail(user_Id,fn) {
    _User.verifyEmail(user_Id,function (err,doc) {
        fn(err,doc);
    });
}

function saveCode(user_Id,code,fn) {
    _User.saveCode(user_Id,code,function (err, doc) {
        fn(err,doc);
    });
}

function getCode(user_Id,fn) {
    _User.getCode(user_Id,function (err,doc) {
        fn(err,doc);
    });
}



function createByEmail(name, password, email, fn) {
    _User.createByEmail(name, password, email, function (err, doc) {
        fn(err, doc);
    });
}

function createByPhone(name, password, phone, fn) {
    _User.createByPhone(name, password, phone, function (err, doc) {
        fn(err, doc);
    });
}

function setEmail(user_Id, email, fn) {
    _User.setEmail(user_Id, email, function (err, doc) {
        fn(err, doc);
    });
}

function setPhone(user_Id, phone, fn) {
    _User.setPhone(user_Id, phone, function (err, doc) {
        fn(err, doc);
    });
}

function getByPhone(phone, fn) {
    _User.getByPhone(phone, function (err, doc) {
        fn(err, doc);
    });
}

function getByEmail(email, fn) {
    _User.getByemail(email, function (err, doc) {
        fn(err, doc);
    });
}

function getById(user_Id, fn) {
    _User.getById(user_Id, function (err, doc) {
        fn(err, doc);
    });
}

function deleteById(user_Id, fn) {
    _User.deleteById(user_Id, function (err, doc) {
        if (err)  fn(err, doc);
        var project_Ids = [];
        for (var i = 0; i < doc.project_Id_items.length; i++) {
            project_Ids.push(doc.project_Id_items[i].project_Id);
        }
        C_Project.deleteByIds(project_Ids, function (err, doc) {
            fn(err, doc);
        });
    });
}

function updateName(user_Id, name, fn) {
    _User.updateName(user_Id, name, function (err, doc) {
        fn(err, doc);
    });
}

function updatePassword(user_Id, password, fn) {
    _User.updatePassword(user_Id, password, function (err, doc) {
        fn(err, doc);
    });
}

