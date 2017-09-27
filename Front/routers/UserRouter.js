/**
 * Created by zhaoxuebin on 2017/1/3.
 */
var express = require('express');
var _User = require('../combined_models/User');
var STATUSCODE = require('../statuscode');
var sendMail = require('../verification').sendMailforVerify;
var sendEmailforUpdatePassword = require('../verification').sendEmailforUpdatePassword;
var sendSMS = require('../verification').sendSMS;
var jwt = require('jwt-simple');

var User = new _User();

var UserRouter = express.Router();


UserRouter.post('/registerByemail', function (req, res, next) {
    // if (!req.body.username) {
    //     return res.json({status: STATUSCODE.NO_NAME, msg: 'username field is empty'});
    // }
    if (!req.body.email) {
        // email 格式验证模块后期在此处加入
        //
        //
        return res.json({status: STATUSCODE.NO_EMAIL, msg: 'email field is empty'});
    }

    if (!req.body.password) {
        return res.json({status: STATUSCODE.NO_PASSWORD, msg: 'password field  is empty'});
    }
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    User.getByEmail(email, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        if (doc && doc.email_verify == true)
            return res.json({status: STATUSCODE.EMAIL_REGISTERED});
        if (doc && doc.email_verify == false)
            return res.json({status: STATUSCODE.EMAIL_NO_VERIFY});
        User.createByEmail(username, password, email, function (err, doc) {
            if (err)
                return res.json({status: STATUSCODE.DATABASE_ERROR});
            //发送邮件给email地址,email内容有email地址+加密的user_Id
            var token = jwt.encode(doc._id, 'smartvideo');
            sendMail(email, token, function (err, doc) {
                if (err)
                    return res.json({status: STATUSCODE.REGISTER_FAIL});
                return res.json({status: STATUSCODE.SUCCESS});
            });

        });
    });
});

//
UserRouter.post('/sendSMS', function (req, res, next) {
    var phone = req.body.phone;
    if (!phone) {
        return res.json({status: STATUSCODE.NO_PHONE_EXISTANCE});
    }
    User.getByPhone(phone, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        if (doc)
            return res.json({status: STATUSCODE.PHONE_REGISTERED});
        sendSMS(phone, function (status, response) {
            console.log(response);
            if (status == true) {
                var token = jwt.encode({verifycode: response, phone: phone}, 'smartvideo');
                return res.json({status: STATUSCODE.SUCCESS, token: token});
            }
            if (response.code == 22)
                return res.json({status: STATUSCODE.SMS_NUMBER_OUT3});
            if (response.code == 2)
                return res.json({status: STATUSCODE.SMS_NUMBER_FORMAT_ERROR});
            return res.json({status: STATUSCODE.SMS_FAIL_SEND});
        });

    });
});

UserRouter.post('/registerByphone', function (req, res, next) {
    // if (!req.body.username) {
    //     return res.json({status: STATUSCODE.NO_NAME, msg: 'username field is empty'});
    // }

    if (!req.body.phone) {
        // email 格式验证模块后期在此处加入
        //
        //
        return res.json({status: STATUSCODE.NO_PHONE, msg: 'phone field is empty'});
    }
    if (!req.body.password) {
        return res.json({status: STATUSCODE.NO_PASSWORD, msg: 'password field  is empty'});
    }
    if (!req.body.verify_code) {
        return res.json({status: STATUSCODE.NO_VERIFYCODE_EXISTANCE});
    }
    var token = req.headers['x-access-token'];
    if (!token) {
        return res.json({status: STATUSCODE.SMS_FAIL_VERIFYCODE});
    }
    var username = req.body.username;
    var phone = req.body.phone;
    var password = req.body.password;
    var verifycode = req.body.verify_code;
    try {
        var decode = jwt.decode(token, 'smartvideo');
        // console.log(decode);
        if (phone != decode.phone || verifycode != decode.verifycode) {
            return res.json({status: STATUSCODE.SMS_FAIL_VERIFYCODE});
        }
    } catch (err) {
        return res.json({status: STATUSCODE.SMS_FAIL_VERIFYCODE});
    }

    User.getByPhone(phone, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        if (doc)
            return res.json({status: STATUSCODE.PHONE_REGISTERED});
        User.createByPhone(username, password, phone, function (err, doc) {
            if (err)
                return res.json({status: STATUSCODE.DATABASE_ERROR});
            User.verifyPhone(doc._id, function (err, doc) {
            });
            var token = jwt.encode({user_Id: doc._id}, 'smartvideo');
            return res.json({status: STATUSCODE.SUCCESS, token: token});
        });
    });
});

UserRouter.post('/login', function (req, res, next) {
    if (!req.body.username) {
        return res.json({status: STATUSCODE.NO_EMAILORPHONE});
    }
    if (!req.body.password) {
        return res.json({status: STATUSCODE.NO_PASSWORD});
    }
    var phoneORemail = req.body.username;
    var password = req.body.password;


    //此处判断phoneORemail是邮箱还是手机号，根据@符号的存在是否，来觉得login步骤
    if (phoneORemail.indexOf('@') >= 0)
        User.getByEmail(phoneORemail, function (err, doc) {
            if (err)
                return res.json({status: STATUSCODE.DATABASE_ERROR});
            if (!doc)
                return res.json({status: STATUSCODE.EMAIL_NO_REGISTERED});
            if (doc.email_verify == false)
                return res.json({status: STATUSCODE.EMAIL_NO_VERIFY});
            if (doc.password == password) {
                var token = jwt.encode({user_Id: doc._id}, 'smartvideo');
                return res.json({status: STATUSCODE.SUCCESS, token: token});
            } else {
                return res.json({status: STATUSCODE.INVALID_PASSWORD});
            }
        });

    else
        User.getByPhone(phoneORemail, function (err, doc) {
            if (err)
                return res.json({status: STATUSCODE.DATABASE_ERROR});
            if (!doc)
                return res.json({status: STATUSCODE.PHONE_NO_REGISTERED});
            if (doc.phone_verify == false)
                return res.json({status: STATUSCODE.PHONE_NO_VERIFY});
            if (doc.password == password) {
                var token = jwt.encode({user_Id: doc._id}, 'smartvideo');
                return res.json({status: STATUSCODE.SUCCESS, token: token});
            } else {
                return res.json({status: STATUSCODE.INVALID_PASSWORD});
            }
        });

});

// 发送邮件
UserRouter.post('/getPasswordByEmail', function (req, res, next) {
    var email = req.body.email;
    // console.log(email);
    if (!email)
        return res.json({status: STATUSCODE.NO_EMAIL});
    User.getByEmail(email, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        if (!doc)
            return res.json({status: STATUSCODE.EMAIL_NO_REGISTERED});
        var token = jwt.encode(doc._id, 'smartvideo');
        sendEmailforUpdatePassword(email, token, function (err, doc) {
            if (err)
                return res.json({status: STATUSCODE.DATABASE_ERROR});
            return res.json({status: STATUSCODE.SUCCESS});
        });
    });

});

//密码修改页面
UserRouter.get('/updatePasswordByEmail', function (req, res, next) {
    var email = req.query.email;
    var token = req.query.token;
    // console.log(email);
    // console.log(token);
    if (!email || !token)
        return res.json({status: STATUSCODE.FAIL_AUTH});
    try {
        var user_Id = jwt.decode(token, 'smartvideo');
        // console.log(user_Id);
    } catch (err) {
        console.log(err);
        return res.json({status: STATUSCODE.FAIL_AUTH});
    }
    // console.log(user_Id);
    User.getById(user_Id, function (err, doc) {
        // console.log(err);
        // console.log(doc);
        console.log(email);
        console.log(doc.email)
        if (!doc||doc.email != email)
            return res.json({status: STATUSCODE.FAIL_AUTH});
        // 返回带认证token的密码界面
        // return res.json({status:123});
        // return res.sendfile('reset.html');
    });
});
//
//

UserRouter.post('/resetPassword_email',function (req, res, next) {
    var token = req.headers['x-access-token'];
    var new_pwd = req.body.password;
    try {
        var user_Id = jwt.decode(token, 'smartvideo');
    }catch (err)
    {
        return res.json({status:STATUSCODE.FAIL_AUTH});
    }
    User.updatePassword(user_Id,new_pwd,function (err,doc) {
        return res.json({status:STATUSCODE.SUCCESS});
    });
});

UserRouter.post('/upadatePassword_sendSMS', function (req, res, next) {
    var phone = req.body.phone;
    if(!phone)
        return res.json({status:STATUSCODE.NO_PHONE});
    User.getByPhone(phone,function (err,doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        if(!doc)
            return res.json({status:STATUSCODE.NO_PHONE_EXISTANCE});
        if(doc.phone_verify==false)
            return res.json({status:STATUSCODE.PHONE_NO_VERIFY});
        sendSMS(phone,function (status,response) {
            // if(status==false){
            //     console.log(doc);
            //     return res.json({status:STATUSCODE.SMS_FAIL_SEND});
            // }
            // var token = jwt.encode({phone:phone,verify_code:doc}, 'smartvideo');
            // return res.json({status:STATUSCODE.SMS_FAIL_SEND,token:token});
            console.log(status);
            console.log(response);
            if(status==true){
                var token = jwt.encode({verify_code: response, phone: phone}, 'smartvideo');
                return res.json({status: STATUSCODE.SUCCESS, token: token});
            }
            if (response.code == 22)
                return res.json({status: STATUSCODE.SMS_NUMBER_OUT3});
            if (response.code == 2)
                return res.json({status: STATUSCODE.SMS_NUMBER_FORMAT_ERROR});
            return res.json({status: STATUSCODE.SMS_FAIL_SEND});
        });
    });
});

UserRouter.post('/resetPassword_phone',function (req, res, next) {
    var new_password =req.body.password;
    var verifycode =req.body.verify_code;
    if(!verifycode)
        return res.json({status:STATUSCODE.NO_VERIFYCODE});
    if(!new_password)
        return res.json({status:STATUSCODE.NO_PASSWORD});
    var token = req.headers['x-access-token'];
    if(!token)
        return res.json({status:STATUSCODE.FAIL_AUTH});
    try{
        token = jwt.decode(token,'smartvideo');
        var token_verifycode =token.verify_code;
        var token_phone =token.phone;
    }
    catch (err){
        console.log(err);
        return res.json({status:STATUSCODE.FAIL_AUTH});
    }
    if(token_verifycode!=verifycode)
        return res.json({status:STATUSCODE.SMS_FAIL_VERIFYCODE});
    User.getByPhone(token_phone,function (err, doc) {
       User.updatePassword(doc._id,new_password,function (err,doc) {
           token =jwt.encode({user_Id: doc._id}, 'smartvideo');
           return res.json({status:STATUSCODE.SUCCESS,token:token});
       }) ;
    });


});


UserRouter.use(function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (token) {
        try {
            var decode = jwt.decode(token, 'smartvideo');
            User.getById(decode.user_Id, function (err, doc) {
                if (err)
                    return res.json({status: STATUSCODE.DATABASE_ERROR});
                if (!doc)
                    return res.json({status: STATUSCODE.NO_USER_EXISTANCE});
                req.body.user_Id = doc._id;
                next();
            });
        }
        catch (err) {
            return res.json({status: STATUSCODE.FAIL_AUTH, msg: ' 认证失败'});
        }
    }
    else
        return res.json({status: STATUSCODE.FAIL_AUTH, msg: ' 认证失败'});

});

UserRouter.get('/logout', function (req, res, next) {
    req.headers['x-access-token'] = null;
    res.json({status: STATUSCODE.SUCCESS, msg: 'you have logouted ,session has deleted '});
});

UserRouter.post('/updatePassword', function (req, res, next) {
    var user_Id = req.body.user_Id;
    var password = req.body.password;
    User.updatePassword(user_Id, password, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        return res.json({status: STATUSCODE.SUCCESS});
    });
});

UserRouter.post('/updateName', function (req, res, next) {
    var user_Id = req.body.user_Id;
    var name = req.body.name;
    User.updateName(user_Id, name, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        return res.json({status: STATUSCODE.SUCCESS});
    });
});

UserRouter.post('/delete', function (req, res, next) {
    var user_Id = req.body.user_Id;
    User.deleteById(user_Id, function (err, doc) {
        if (err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        req.session = null;
        return res.json({status: STATUSCODE.SUCCESS});
    });
});




module.exports = UserRouter;