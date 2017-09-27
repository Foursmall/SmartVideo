/**
 * Created by zhaoxuebin on 2017/1/14.
 */
var express = require('express');
var _Project = require('../combined_models/Project');
var _User = require('../combined_models/User');

var jwt =require('jwt-simple');
var STATUSCODE = require('../statuscode');
var Project = new _Project();
var User =new _User();
var ProjectRouter = express.Router();
/**
 * 进入此路由的所有请求必须是合法用户（已经验证过的，并且本地有个cookies-session）
 */
ProjectRouter.use(function (req, res, next) {
    var token = req.headers['x-access-token'];
    if(token) {
        try{
            var decode =jwt.decode(token,'smartvideo');
            User.getById(decode.user_Id,function (err, doc) {
                if (err)
                    return res.json({status: STATUSCODE.DATABASE_ERROR});
                if (!doc)
                    return  res.json({status:STATUSCODE.NO_USER_EXISTANCE });
                // console.log(req.body);
                req.body.user_Id =doc._id;
                next();
            });
        }
        catch (err){
            return res.json({status:STATUSCODE.FAIL_AUTH,msg:' 认证失败'});
        }
    }
    else
        return res.json({status:STATUSCODE.FAIL_AUTH,msg:' 认证失败'});
});

ProjectRouter.get('/getProjects', function (req, res, next) {
    var user_Id = req.body.user_Id;
    Project.getProjectsByUser(user_Id, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        var result = [];
        for(var i =0;i<doc.length;i++){
            result[i] ={project_id:doc[i]._id,project_name:doc[i].name,created:doc[i].created}
        }
        res.json({status: STATUSCODE.SUCCESS, result: result});

    });
});


ProjectRouter.post('/getAllElements',function (req, res, next) {
   var project_Id = req.body.project_Id;
    Project.getAllElements(project_Id,function (err,doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS,result:doc});
    });
});


ProjectRouter.post('/create', function (req, res, next) {
    if (!req.body.project_name) {
        return res.json({status: STATUSCODE.NO_PROJECT_NAME});
    }
    var project_name = req.body.project_name;
    var description = req.body.description;
    var user_Id =req.body.user_Id;
    // console.log('project_name',project_name);
    // console.log('des',description);
    // console.log('user_Id',user_Id);

    Project.create(project_name, description, user_Id, function (err, doc) {
        if (err)
            res.json({status: STATUSCODE.DATABASE_ERROR});
        res.json({status: STATUSCODE.SUCCESS,result:doc});
    });
});


ProjectRouter.use(function (req, res, next) {
    if (!req.body.project_Id) {
        return res.json({status: STATUSCODE.NO_PROJECT_ID});
    }
    Project.getById(req.body.project_Id, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        if (!doc)
            return res.json({status: STATUSCODE.NO_PROJECT_EXISTANCE});
        next();
    });
});


ProjectRouter.post('/delete', function (req, res, next) {
    var project_Id = req.body.project_Id;
    Project.deleteById(project_Id, function (err, doc) {
        if (err)
            res.json({status: STATUSCODE.DATABASE_ERROR});
        res.json({status: STATUSCODE.SUCCESS});
    });
});




ProjectRouter.post('/updateName', function (req, res, next) {
    if (!req.body.project_name)
        return res.json({status: STATUSCODE.NO_PROJECT_NAME});
    var project_Id = req.body.project_Id;
    var project_name = req.body.project_name;
    Project.updateName(project_Id, project_name, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        res.json({status: STATUSCODE.SUCCESS});
    });
});

ProjectRouter.post('/getAttributes', function (req, res, next) {
    var project_Id = req.body.project_Id;
    Project.getById(project_Id, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        res.json({status: STATUSCODE.SUCCESS, result: doc});
    });
});


ProjectRouter.post('/incPlay', function (req, res, next) {
    var project_Id = req.body.project_Id;
    Project.incPlay_Count(project_Id, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
       return  res.json({status: STATUSCODE.SUCCESS});
    });
});

ProjectRouter.post('/clearPlay', function (req, res, next) {
    var project_Id = req.body.project_Id;
    Project.clearPlay_Count(project_Id, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        return res.json({status: STATUSCODE.SUCCESS});
    });
});


module.exports = ProjectRouter;