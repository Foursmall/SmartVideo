/**
 * Created by zhaoxuebin on 2016/12/28.
 */
var UserModel = require("../schema/Schema.js").UserModel;

module.exports = _User;

function _User() {
    _User.prototype.createByEmail = createByEmail;
    _User.prototype.createByPhone = createByPhone;
    _User.prototype.getByemail = getByEmail;
    _User.prototype.getById = getById;
    _User.prototype.setEmail = setEmail;
    _User.prototype.setPhone = setPhone;
    _User.prototype.verifyPhone = verifyPhone;
    _User.prototype.verifyEmail = verifyEmail;
    _User.prototype.saveCode = saveCode;
    _User.prototype.getCode = getCode;

    _User.prototype.updatePassword = updatePassword;
    _User.prototype.updateName = updateName;
    _User.prototype.addProject = addProject;
    _User.prototype.removeProject = removeProject;
    _User.prototype.deleteById = deleteById;
    _User.prototype.getProjectsByUser = getProjects;
    _User.prototype.getByPhone = getByPhone;


}

//新建一个用户，根据email号码
function createByEmail(name, password, email, fn) {
    UserModel.create({
        name: name,
        password: password,
        email: email,
        created: new Date(),
        project_Id_items: [],
    }, function (err, doc) {
        fn(err, doc);
    });
}

//新建一个用户，根据phone号码
function createByPhone (name,password,phone,fn) {
    UserModel.create({
        name:name,
        password:password,
        phone:phone,
        created:new Date(),
        project_Id_items: []
    },function (err, doc) {
        fn(err,doc);
    });
}

// 手机号码注册时候，补充email
function setEmail(user_Id,email,fn) {
    UserModel.findOneAndUpdate({_id: user_Id}, {$set: {email: email}}, function (err, doc) {
        fn(err, doc);
    });
}

// email注册的时候，补充手机号
function setPhone(user_Id,phone,fn) {
    UserModel.findOneAndUpdate({_id: user_Id}, {$set: {phone: phone}}, function (err, doc) {
        fn(err, doc);
    });
}

//删除一个用户，根据Id
function deleteById(user_Id, fn) {
    UserModel.findOneAndRemove({_id: user_Id}, function (err, doc) {
        fn(err, doc);
    });
}

//根据email获取用户信息,以确认email的唯一性
function getByEmail(email, fn) {
    UserModel.findOne({email: email}, function (err, doc) {
        fn(err, doc);
    });
}

//根据phone获取用户信息，以确认phone的唯一性
function getByPhone(phone,fn) {
    UserModel.findOne({phone:phone},function (err,doc) {
       fn(err,doc);
    });
}
//根据用户Id，获取用户信息
function getById(user_Id, fn) {
    UserModel.findOne({_id: user_Id}, function (err, doc) {
        fn(err, doc);
    });
}

//更新用户密码
function updatePassword(user_Id, password, fn) {
    UserModel.findOneAndUpdate({_id: user_Id}, {$set: {password: password}}, function (err, doc) {
        fn(err, doc);
    });
}

//更新用户名
function updateName(user_Id, name, fn) {
    UserModel.findOneAndUpdate({_id: user_Id}, {$set: {name: name}}, function (err, doc) {
        fn(err, doc);
    });
}

//添加项目引用集合
// function addProjects(user_Id, project_Id_items, fn) {
//     _User.findOneAndUpdate({_id: user_Id}, {$push: {project_Id_items: {$each: project_Id_items}}}, function (err, doc) {
//         fn(err, doc);
//     });
// }

//添加项目引用集合
function addProject(user_Id, project_Id_item, fn) {
    UserModel.findOneAndUpdate({_id: user_Id}, {$push: {project_Id_items: project_Id_item}}, function (err, doc) {
        fn(err, doc);
    });
}

//移除项目引用
function removeProject(user_Id, project_Id, fn) {
    UserModel.findOneAndUpdate({_id: user_Id},
        {$pull: {project_Id_items: {project_Id: project_Id}}},
        function (err, doc) {
            fn(err, doc);
        });
}

//获取用户的项目列表
function getProjects(user_Id, fn) {
    UserModel.findOne({_id: user_Id}, 'project_Id_items', function (err, doc) {
        fn(err, doc);
    });
}

// 将手机验证状态改成true
function verifyPhone(user_Id,fn) {
    UserModel.findOneAndUpdate({_id: user_Id}, {$set: {phone_verify: true}}, function (err, doc) {
        fn(err, doc);
    });
}

function verifyEmail(user_Id,fn) {
    UserModel.findOneAndUpdate({_id: user_Id}, {$set: {email_verify: true}}, function (err, doc) {
        fn(err, doc);
    });
}

function saveCode(user_Id,code,fn) {
    UserModel.findOneAndUpdate({_id: user_Id}, {$set: {verify_code: code}}, function (err, doc) {
        fn(err, doc);
    });
}

function getCode(user_Id,fn) {
    UserModel.findOne({_id: user_Id}, 'verify_code', function (err, doc) {
        fn(err, doc);
    });
}