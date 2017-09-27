/**
 * Created by zhaoxuebin on 2017/1/15.
 */
var express = require('express');
var fs = require('fs');
var path = require('path');
var STATUSCODE = require('../statuscode');
var _Project = require('../combined_models/Project');
var _Element = require('../combined_models/Element');

var Project = new _Project();
var Element = new _Element();

var API = express.Router();

API.get('/getProjectAttributes/:project_Id',function (req,res,next) {
    var project_Id = req.params.project_Id;
    if(!project_Id)
        return res.json({status:STATUSCODE.NO_PROJECT_ID});
    Project.getAllElements(project_Id,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        if(!doc)
            return  res.json({status:STATUSCODE.NO_PROJECT_EXISTANCE});
//  图片路径修改
        for(var elem  in doc){
            if(doc[elem].images.length==0)
                doc[elem].images.push('image/'+'default.png');
            else{
                doc[elem].images[0]=('image/'+doc[elem]._id+'_'+doc[elem].images[0]);
            }
        }
        res.json({status:STATUSCODE.SUCCESS,result:doc});
    });

});

API.get('/getElementAttributes/:element_Id',function (req, res, next) {
    var element_Id = req.params.element_Id;

    Element.getById(element_Id,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        if(!doc)
            return res.json({status:STATUSCODE.NO_ELEMENT_ID});
        doc.project_Id_items =null ;
        doc.updated =null ;
        doc.created =null;
        doc.project_Id_item =null;
        return res.json({status:STATUSCODE.SUCCESS,result:doc});
    });
});

API.get('/getDataVote/:element_Id',function (req, res, next) {
    var  element_Id =req.params.element_Id;
    Element.getDataVote(element_Id,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        if(!doc)
            return res.json({status:STATUSCODE.NO_ELEMENT_ID});
        return res.json({status:STATUSCODE.SUCCESS,result:doc});
    });
});

API.post('/vote/:element_Id/:index',function (req, res, next) {
    var element_Id = req.params.element_Id;
    var index =req.params.index;

    console.log(element_Id);
    console.log(index);
    Element.vote(element_Id,index,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS,result:doc});
    });
});

API.post('/uploadUserAction/:element_Id/:kind',function (req,res,next) {
    var element_Id = req.params.element_Id;
    var kind = req.params.kind;
    Element.uploadUserAction(element_Id,kind,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS});
    });
});

API.post('/uploadElementShow/:element_Id',function (req, res, next) {
    var element_Id = req.params.element_Id;
    Element.incShow_Count(element_Id,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS});
    }) ;
});

API.post('/uploadVideoPlay/:project_Id',function (req, res, next) {
    var project_Id = req.params.project_Id;
    Project.incPlay_Count(project_Id,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS});
    });
});

API.post('/uploadFavourite/:element_Id',function (req, res, next) {
    var element_Id = req.params.element_Id;
    Element.incFavourite(element_Id,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS});
    });
});

API.get('/getFavourite/:element_Id',function (req,res,next) {
    var element_Id =req.params.element_Id;
    Element.getFavourite(element_Id,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        if(!doc)
            return res.json({status:STATUSCODE.NO_ELEMENT_ID});
        doc._id=null;
        return  res.json({status:STATUSCODE.SUCCESS,result:doc});
    });
});



module.exports=API;