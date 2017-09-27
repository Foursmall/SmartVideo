/**
 * Created by zhaoxuebin on 2016/12/7.
 */
var UserModel = require("../schema/Schema.js").UserModel;

exports.User= User;

function User() {
    if(typeof this.addUser == "undefined"){
        User.prototype.addUser =addUser;
    }
    if(typeof this.getUserByName == "undefined"){
        User.prototype.getUserByName =getUserByName;
    }
    if(typeof this.getUserByEmail == "undefined"){
        User.prototype.getUserByEmail =getUserByEmail;
    }
    if(typeof this.nameExist == "undefined"){
        User.prototype.nameExist =nameExist;
    }
    if(typeof this.emailExist == "undefined"){
        User.prototype.emailExist =emailExist;
    }
    if(typeof this.reSetPwdByUserName == "undefined"){
        User.prototype.reSetPwdByUserName =reSetPwdByUserName;
    }
    if(typeof this.reSetPwdByUserEmail == "undefined"){
        User.prototype.reSetPwdByUserEmail =reSetPwdByUserEmail;
    }
    if(typeof this.addProjectsByUserName == "undefined"){
        User.prototype.addProjectsByUserName =addProjectsByUserName;
    }
    if(typeof this.addProjectsByUserEmail == "undefined"){
        User.prototype.addProjectsByUserEmail =addProjectsByUserEmail;
    }
    if(typeof this.removeProjectsByUserName == "undefined"){
        User.prototype.removeProjectsByUserName =removeProjectsByUserName;
    }
    if(typeof this.removeProjectsByUserEmail == "undefined"){
        User.prototype.removeProjectsByUserEmail =removeProjectsByUserEmail;
    }
    if(typeof this.deleteUserByName == "undefined"){
        User.prototype.deleteUserByName =deleteUserByName;
    }
    if(typeof this.deleteUserByEmail == "undefined"){
        User.prototype.deleteUserByEmail =deleteUserByEmail;
    }

};


/**
 * 添加新用户，调用此函数之前先验证name 和 email的唯一性
 * @param name   [String (required)] 用户名
 * @param pwd    [String (required)] 密码
 * @param email  [String (required)] 注册邮箱
 * @param project_Ids  [ [ObjectId]  （optional)]  项目Id集合
 * @param fn  [Function (required)]
 */
function addUser (name,pwd,email,project_Ids,fn) {
    var query =UserModel.create({
            name: name,
            pwd: pwd,
            email:email,
            project_Id:  project_Ids
    },function (err,doc) {
       fn(err,doc);

    });
};

/**
 * 通过name获取一个用户的所有信息
 * @param name [String (required)]
 * @param fn   [function (required)]
 */
function getUserByName(name  ,fn) {
    var query =UserModel.findOne({name:name},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 通过email获取一个用户的所有信息
 * @param email [String (required)]
 * @param fn    [Function (required) ]
 */
function getUserByEmail(email ,fn) {
    var query = UserModel.findOne({email:email},function (err, doc) {
        fn(err,doc);
    });
}

/**
 * 用于验证用户name 唯一性
 * @param name  [String (required)]用户名
 * @param fn    [Function (required)] data 中存储Bool值
 */
function nameExist(name ,fn) {
    var query =UserModel.findOne({name:name},function (err, doc) {
        if(err)
            return fn(err,null);
        if(doc)
            return fn(null,true);
        fn(null,false);
    });
};

/**
 *用于验证用户email 唯一性
 * @param email [String (required)] 邮箱
 * @param fn [Function  (required)] data 中存储Bool值
 */
function emailExist(email ,fn) {
    var query =UserModel.findOne({email:email},function (err, doc) {
        if(err)
            return fn(err,null);
        if(doc)
            return fn(null,true);
        fn(null,false);
    });
};

/**
 * 根据name更新密码
 * @param name [String (required)]
 * @param newpwd [String (required)]
 * @param fn  [Function  (required)]
 */
function reSetPwdByUserName(name ,newpwd,fn) {
    var query = UserModel.findOneAndUpdate({name:name},{$set:{pwd:newpwd}},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 根据email更新密码
 * @param email [String (required)]
 * @param newpwd [String (required)]
 * @param fn  [Function (required)]
 */
function reSetPwdByUserEmail(email,newpwd,fn) {
    var query = UserModel.findOneAndUpdate({email:email},{$set:{pwd:newpwd}},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 添加project集合 到user中
 * @param name [String (required)]
 * @param projectIds [[ObjectId] (required)]
 * @param fn [Function (required)]
 */
function addProjectsByUserName(name, project_Ids , fn) {
    var query = UserModel.findOneAndUpdate({name:name},{$push:{project_Id:{$each:project_Ids}}},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 添加project集合 到user中
 * @param email [String (required)]
 * @param projectId  [[ObjectId] (required)]
 * @param fn  [Function (required)]
 */
function addProjectsByUserEmail(email, project_Ids, fn) {
    var query = UserModel.findOneAndUpdate({email:email},{$push:{project_Id:{$each:project_Ids}}},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 删除project集合，从user中
 * @param name [String (required)]
 * @param projectId [[ObjectId] (required)]
 * @param fn [Function (required)]
 */
function removeProjectsByUserName(name, project_Ids, fn) {
    var query = UserModel.findOneAndUpdate({name:name},{$pullAll:{project_Id:project_Ids}},function (err, doc) {
        fn(err,doc);
    });
}

/**
 * 删除project集合，从user中
 * @param name [String (required)]
 * @param projectId [[ObjectId] (required)]
 * @param fn [Function (required)]
 */
function removeProjectsByUserEmail(email, project_Ids, fn) {
    var query = UserModel.findOneAndUpdate({email:email},{$pullAll:{project_Id:project_Ids}},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 删除一个用户，通过name
 * @param name [String (required)]
 * @param fn   [Function (required)]
 */
function deleteUserByName(name,fn) {
    var query = UserModel.remove({name:name},function (err, doc) {
        fn(err,doc);
    });
};

/**
 * 删除一个用户，通过email
 * @param name [String (required)]
 * @param fn   [Function (required)]
 */
function deleteUserByEmail(email,fn) {
    var query = UserModel.findOneAndRemove({email:email},function (err, doc) {
        fn(err,doc);
    });
};

