/**
 * Created by zhaoxuebin on 2017/3/6.
 */
var express = require('express');
var fs = require('fs');
var path = require('path');
var _Element = require('../combined_models/Element');
var Element  = new _Element();

var STATUSCODE = require('../statuscode');
var ImageRouter = express.Router();

ImageRouter.use(function (req, res, next) {
    // var token = req.headers['x-access-token'];
    // if(token) {
    //     try{
    //         var decode =jwt.decode(token,'123');
    //         User.getById(decode.user_Id,function (err, doc) {
    //             if (err)
    //                 return res.json({status: STATUSCODE.DATABASE_ERROR});
    //             if (!doc)
    //                 return  res.json({status:STATUSCODE.NO_USER_EXISTANCE });
    //             req.body.user_Id =doc._id;
    //             next();
    //         });
    //     }
    //     catch (err){
    //         console.log(err);
    //         return res.json({status:STATUSCODE.FAIL_AUTH,msg:' 认证失败'});
    //     }
    // }
    // else
    //     return res.json({status:STATUSCODE.FAIL_AUTH,msg:' 认证失败'});
    next();
});

//
// ImageRouter.get('/upload', function (req, res, next) {
//     res.render('images/upload.ejs', {title: 'Images upload'});
// });

ImageRouter.post('/upload', function (req, res, next) {

    // console.log('upload');

    var element_Id = req.body.element_Id;
    var temp_path = req.files.file.path;

    if(!temp_path){
        return  res.json({status:STATUSCODE.SUCCESS,result:"no image , use default image"});
    }
    if(!element_Id)
    {
        return res.json({status:STATUSCODE.NO_ELEMENT_ID});
    }

    Element.getById(element_Id,function (err,doc) {
        if(err)
            return res.json({status: STATUSCODE.DATABASE_ERROR});
        if(!doc)
            return res.json({status:STATUSCODE.NO_ELEMENT_EXISTANCE});
        var image_name = doc.name+'.'+temp_path.split('.')[1];
        Element.addImages(element_Id,[image_name],function (err, doc) {
            if(err)
                return res.json({status: STATUSCODE.DATABASE_ERROR});
            var image_path = path.resolve(__dirname,'../image_db',element_Id+'_'+image_name);
            fs.rename(temp_path,image_path,function (err) {
                if(err)
                    return next(err);
                res.json({status:STATUSCODE.SUCCESS});

            });
        });

    })






});

ImageRouter.get('/photo/:id/download', function (req, res, next) {

});

module.exports = ImageRouter;