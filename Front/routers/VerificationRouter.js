/**
 * Created by zhaoxuebin on 2017/4/20.
 */
var express = require('express');
var jwt = require('jwt-simple');
var _User = require('../combined_models/User');
var STATUSCODE = require('../statuscode');
// var fs = require('fs');
var generateVerifyImg = require('../graphic_code').generateVerifyImg;
var User = new _User();
var VerificationRouter = express.Router();

module.exports = VerificationRouter;

VerificationRouter.use(function (req, res, next) {
    var email = req.query.email;
    var token =  req.query.token;
    if(!email||!token)
        return res.json({status:STATUSCODE.EMAIL_FAIL_VERIFY});
    try{
        var user_Id = jwt.decode(token, 'smartvideo');
        // return res.json({email:email,id:user_Id});
        User.getById(user_Id, function (err, doc) {
            if (err)
                return res.json({status: STATUSCODE.EMAIL_FAIL_VERIFY});
            if (!doc)
                return res.json({status: STATUSCODE.EMAIL_FAIL_VERIFY});
            if (email == doc.email)
                User.verifyEmail(doc._id, function (err, doc) {
                    if (err)
                        return res.json({status: STATUSCODE.EMAIL_FAIL_VERIFY});
                    if(doc)
                    {
                        return res.json({status: STATUSCODE.SUCCESS});
                    }


                    return res.json({status:STATUSCODE.EMAIL_FAIL_VERIFY});
                });
        });
    }
    catch(err) {
        return res.json({status:STATUSCODE.EMAIL_FAIL_VERIFY});
    }




});
// VerificationRouter.get('/getImg',function (req,res,next) {
//     var verify =generateVerifyImg();
//     var dataBuffer = new Buffer(verify.img,'base64');
//     res.setHeader('content-type', 'image/png');
//     var token = jwt.encode({numbers:verify.code},'smartvideo');
//     // res.headers['x-access-token']=token;
//
//     // console.log(req.headers['x-access-token']);
//     res.end(dataBuffer);
//   });

// VerificationRouter.get('/upcode',function (req, res, next) {
//     var token = req.headers['x-access-token'];
//     console.log(token);
//
//     var detoken =jwt.decode(token,'smartvideo');
//     console.log(detoken.numbers);
//     res.end();
// })