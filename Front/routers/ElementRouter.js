/**
 * Created by zhaoxuebin on 2017/1/15.
 */
var express = require('express');
var jwt  =require('jwt-simple');
var fs = require('fs');
var path = require('path');
var STATUSCODE = require('../statuscode');
var _Element = require('../combined_models/Element');
var _Project = require('../combined_models/Project');
var _User = require('../combined_models/User');
var ElementRouter = express.Router();
var Element = new _Element();
var Project = new _Project();
var User = new _User();

ElementRouter.use(function (req,res,next) {
    var token = req.headers['x-access-token'];
    if(token) {
        try{
            var decode =jwt.decode(token,'smartvideo');
            User.getById(decode.user_Id,function (err, doc) {
                if (err)
                    return res.json({status: STATUSCODE.DATABASE_ERROR});
                if (!doc)
                    return  res.json({status:STATUSCODE.NO_USER_EXISTANCE });
                req.body.user_Id =doc._id;

                next();
            });
        }
        catch (err){
            console.log(err);
            return res.json({status:STATUSCODE.FAIL_AUTH,msg:' 认证失败'});
        }
    }
    else
        return res.json({status:STATUSCODE.FAIL_AUTH,msg:' 认证失败'});

});

ElementRouter.post('/create',function (req,res,next) {


    console.log('body',req.body);

    var elemObj = req.body.properties;
    var project_Id = req.body.project_Id;

    console.log('elementObj'+elemObj);
    console.log('project_Id'+project_Id);

    var project_name ;

    if(!elemObj.name)
        return  res.json({status:STATUSCODE.NO_ELEMENT_NAME});
    if(!elemObj.kind)
        return  res.json({status:STATUSCODE.NO_ELEMENT_KIND});

    Project.getById(project_Id,function (err, doc) {
        if(err){
            console.log(err);
            return  res.json({status:STATUSCODE.DATABASE_ERROR});
        }

        if(!doc)
            return  res.json({status:STATUSCODE.NO_PROJECT_EXISTANCE});
        project_name = doc.name;
        Element.create(elemObj,project_Id,project_name,function (err, doc) {
            if(err)
            {
                console.log(err);
                return  res.json({status:STATUSCODE.DATABASE_ERROR});
            }

            return  res.json({status: STATUSCODE.SUCCESS, result: doc});
        });
    });

});



ElementRouter.use(function (req,res,next) {
    // console.log(req.body)
    console.log(req.body.element_Id);
    if(!req.body.element_Id)
        return res.json({status:STATUSCODE.NO_ELEMENT_EXISTANCE});

    Element.getById(req.body.element_Id,function (err, doc) {
        if(err)
            return  res.json({status:STATUSCODE.DATABASE_ERROR});
        if(!doc)
            return  res.json({status:STATUSCODE.NO_ELEMENT_ID});
        next();
    });
});




ElementRouter.post('/getAttributes',function (req,res,next) {
    var element_Id =req.body.element_Id;
    Element.getById(element_Id,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS,result:doc});
    });
});

ElementRouter.post('/addTitles',function (req,res,next) {
    if(!req.body.titles)
        return  res.json({status:STATUSCODE.NO_ELEMENT_TITLES});
    var titles = req.body.titles;
    var element_Id = req.body.element_Id;
    Element.addTitles(element_Id,titles,function (err, doc) {
        if(err)  return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/updateTitles',function (req,res,next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    if(!req.body.titles)
        return  res.json({status:STATUSCODE.NO_ELEMENT_TITLES});
    var element_Id =req.body.element_Id;
    var indexs =req.body.indexs;
    var titles =req.body.titles;
    Element.updateTitles(element_Id,indexs,titles,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/removeTitles',function (req, res, next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    var element_Id = req.body.element_Id;
    var indexs = req.body.indexs;
    Element.removeTitles(element_Id,indexs,function (err,doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/addImages',function (req,res,next) {
    if(!req.body.images)
        return  res.json({status:STATUSCODE.NO_ELEMENT_IMAGES});
    var images = req.body.images;
    var element_Id = req.body.element_Id;
    Element.addImages(element_Id,images,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/updateImage',function (req,res,next) {
    console.log(req.body.index);
    if(!req.body.index&&req.body.index!=0 )
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEX});
    if(!req.body.image)
        return  res.json({status:STATUSCODE.NO_ELEMENT_IMAGE});
    var element_Id =req.body.element_Id;
    var index =req.body.index;
    var image =req.body.image;
    Element.updateImage(element_Id,index,image,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS});
    })
});

ElementRouter.post('/removeImages',function (req, res, next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    var element_Id = req.body.element_Id;
    var indexs = req.body.indexs;
    Element.removeImages(element_Id,indexs,function (err,doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/addColors',function (req,res,next) {
    if(!req.body.colors)
        return  res.json({status:STATUSCODE.NO_ELEMENT_COLORS});
    var colors = req.body.colors;
    var element_Id = req.body.element_Id;
    Element.addColors(element_Id,colors,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/updateColors',function (req,res,next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    if(!req.body.colors)
        return  res.json({status:STATUSCODE.NO_ELEMENT_COLORS});
    var element_Id =req.body.element_Id;
    var indexs =req.body.indexs;
    var colors =req.body.colors;
    Element.updateColors(element_Id,indexs,colors,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/removeColors',function (req, res, next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    var element_Id = req.body.element_Id;
    var indexs = req.body.indexs;
    ElementController.removeColors(element_Id,indexs,function (err,doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/addTimes',function (req,res,next) {
    if(!req.body.times)
        return  res.json({status:STATUSCODE.NO_ELEMENT_TIMES});
    var times = req.body.times;
    var element_Id = req.body.element_Id;

    Element.addTimes(element_Id,times,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/updateTimes',function (req,res,next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    if(!req.body.times)
        return  res.json({status:STATUSCODE.NO_ELEMENT_TIMES});
    var element_Id =req.body.element_Id;
    var indexs =req.body.indexs;
    var times =req.body.times;
    Element.updateTimes(element_Id,indexs,times,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/removeTimes',function (req, res, next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    var element_Id = req.body.element_Id;
    var indexs = req.body.indexs;
    Element.removeTimes(element_Id,indexs,function (err,doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/addLinks',function (req,res,next) {
    if(!req.body.links)
        return  res.json({status:STATUSCODE.NO_ELEMENT_LINKS});
    var links = req.body.links;
    var element_Id = req.body.element_Id;
    Element.addLinks(element_Id,links,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/updateLinks',function (req,res,next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    if(!req.body.links)
        return  res.json({status:STATUSCODE.NO_ELEMENT_LINKS});
    var element_Id =req.body.element_Id;
    var indexs =req.body.indexs;
    var links =req.body.links;
    // console.log(links);
    Element.updateLinks(element_Id,indexs,links,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/removeLinks',function (req, res, next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    var element_Id = req.body.element_Id;
    var indexs = req.body.indexs;
    Element.removeLinks(element_Id,indexs,function (err,doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/addSizes',function (req,res,next) {
    if(!req.body.sizes)
        return  res.json({status:STATUSCODE.NO_ELEMENT_SIZES});
    var sizes = req.body.sizes;
    var element_Id = req.body.element_Id;
    Element.addSizes(element_Id,sizes,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/updateSizes',function (req,res,next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    if(!req.body.sizes)
        return  res.json({status:STATUSCODE.NO_ELEMENT_SIZES});
    var element_Id =req.body.element_Id;
    var indexs =req.body.indexs;
    var sizes =req.body.sizes;
    Element.updateSizes(element_Id,indexs,sizes,function (err, doc) {
        if(err)  return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/removeSizes',function (req, res, next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    var element_Id = req.body.element_Id;
    var indexs = req.body.indexs;
    Element.removeSizes(element_Id,indexs,function (err,doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/addPositions',function (req,res,next) {
    if(!req.body.positions)
        return  res.json({status:STATUSCODE.NO_ELEMENT_POSITIONS});
    var positions = req.body.positions;
    var element_Id = req.body.element_Id;
    Element.addPositions(element_Id,positions,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/updatePositions',function (req,res,next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    if(!req.body.positions)
        return  res.json({status:STATUSCODE.NO_ELEMENT_POSITIONS});
    var element_Id =req.body.element_Id;
    var indexs =req.body.indexs;
    var positions =req.body.positions;
    Element.updatePositions(element_Id,indexs,positions,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        return  res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/removePositions',function (req, res, next) {
    if(!req.body.indexs)
        return res.json({status:STATUSCODE.NO_ELEMENT_INDEXS});
    var element_Id = req.body.element_Id;
    var indexs = req.body.indexs;
    Element.removePositions(element_Id,indexs,function (err,doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});




ElementRouter.post('/voteClear',function (req,res,next) {
    var element_Id =req.body.element_Id;
    Element.voteClear(element_Id,function (err, doc) {
        if(err)
            return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/updateVoteNum',function (req,res,next) {
    if(!req.body.num)
        return res.json({status:STATUSCODE.NO_VOTE_NUM});
    var num = req.body.num;
    console.log('num = ' + num);
    var element_Id = req.body.element_Id;
    Element.updateVoteNum(element_Id,num,function (err, doc) {
        if(err)  return  res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS,result:doc._id});
    });
});

ElementRouter.post('/getDataVote',function (req,res,next) {
   var element_Id =req.body.element_Id;
    Element.getDataVote(element_Id,function (err, doc) {
        if(err)  return  res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS,result:doc});
    })
});

ElementRouter.post('/clearFavourite',function (req,res,next) {
    var element_Id =req.body.element_Id;
    Element.clearFavourite(element_Id,function (err, doc) {
        if(err)  return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    })
});

ElementRouter.post('/getFavourite',function (req, res, next) {
    var element_Id = req.body.element_Id;
    Element.getFavourite(element_Id,function (err, doc) {
        if(err)  return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS,result:doc});
    });
});

ElementRouter.post('/getShow_Count',function (req,res,next) {
    var element_Id = req.body.element_Id;
    Element.getShow_Count(element_Id,function (err, doc) {
        if(err)  return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS,result:doc});
    });
});

ElementRouter.post('/clearShow_Count',function (req, res, next) {
    var element_Id = req.body.element_Id;
    Element.clearShow_Count(element_Id,function (err, doc) {
        if(err)  return res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});


ElementRouter.post('/delete',function (req,res,next) {

    var element_Id= req.body.element_Id;
    var images=[];
    Element.getById(element_Id,function (err, doc) {
        images=  doc.images;
        Element.deleteById(element_Id,function (err, doc) {
            if(err)
                return  res.json({status:STATUSCODE.DATABASE_ERROR});
            res.json ({status:STATUSCODE.SUCCESS});
            if(images.length!=0){
                var image_name =  element_Id+'_'+images[0];
                var image_path = path.resolve(__dirname,'../image_db',image_name);
                fs.unlinkSync(image_path);
            }
        });
    })

});

ElementRouter.post('/updateName',function (req,res,next) {
    if(!req.body.name)
        return  res.json({status:STATUSCODE.NO_ELEMENT_NAME});
    var element_Id = req.body.element_Id;
    var name = req.body.name;
    Element.updateName(element_Id,name,function (err, doc) {
        if(err)  return  res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});

ElementRouter.post('/updateDescription',function (req,res,next) {
    if(!req.body.description)
        return  res.json({status:STATUSCODE.NO_ELEMENT_DESCRIPTION});
    var element_Id = req.body.element_Id;
    var description = req.body.description;
    Element.updateDescription(element_Id,description,function (err, doc) {
        if(err)  return  res.json({status:STATUSCODE.DATABASE_ERROR});
        res.json({status:STATUSCODE.SUCCESS});
    });
});



module.exports =ElementRouter;

