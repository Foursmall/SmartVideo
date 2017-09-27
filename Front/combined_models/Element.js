/**
 * Created by zhaoxuebin on 2016/12/31.
 */

var async = require('async');
var _Element_ = require('../models/_Element');
var _Element_Action_ = require('../models/_Element_Action');
var _Vote_ = require('../models/_Vote');
var _Project_ = require('../models/_Project');

var _Element = new _Element_();
var _Element_Action = new _Element_Action_();
var _Vote = new _Vote_();
var _Project = new _Project_();

module.exports = Element;

function Element() {
    Element.prototype.create = create;
    Element.prototype.deleteById = deleteById;
    Element.prototype.deleteByIds = deleteByIds;
    Element.prototype.getById = getById;
    Element.prototype.getByProject = getByProject;
    Element.prototype.updateName = updateName;
    Element.prototype.updateDescription = updateDescription;
    Element.prototype.addTitles = addTitles;
    Element.prototype.updateTitles = updateTitles;
    Element.prototype.removeTitles = removeTitles;
    Element.prototype.addImages = addImages;
    Element.prototype.updateImage = updateImage;
    Element.prototype.removeImages = removeImages;
    Element.prototype.addColors = addColors;
    Element.prototype.updateColors = updateColors;
    Element.prototype.removeColors = removeColors;
    Element.prototype.addTimes = addTimes;
    Element.prototype.updateTimes = updateTimes;
    Element.prototype.removeTimes = removeTimes;
    Element.prototype.addLinks = addLinks;
    Element.prototype.updateLinks = updateLinks;
    Element.prototype.removeLinks = removeLinks;
    Element.prototype.addSizes = addSizes;
    Element.prototype.updateSizes = updateSizes;
    Element.prototype.removeSizes = removeSizes;
    Element.prototype.addPositions = addPositions;
    Element.prototype.updatePositions = updatePositions;
    Element.prototype.removePositions = removePositions;
    Element.prototype.incShow_Count = incShow_Count;
    Element.prototype.getShow_Count = getShow_Count;
    Element.prototype.clearShow_Count = clearShow_Count;
    Element.prototype.getFavourite = getFavourite;
    Element.prototype.incFavourite = incFavourite;
    Element.prototype.clearFavourite = clearFavourite;
    Element.prototype.vote = vote;
    Element.prototype.updateVoteNum = updateVoteNum;
    Element.prototype.voteClear = voteClear;
    Element.prototype.getDataVote = getDataVote;
    Element.prototype.uploadUserAction = uploadUserAction;
}

function uploadUserAction(element_Id, kind, fn) {
    _Element_Action.incCountByKind(element_Id, kind, function (err, doc) {
        fn(err, doc);
    });
}

function create(elemObj, project_Id, project_name, fn) {
    _Element.create(elemObj.name, elemObj.kind, elemObj.description, {name: project_name, project_Id: project_Id},
        elemObj.titles, elemObj.images, elemObj.colors, elemObj.times, elemObj.links, elemObj.sizes,
        elemObj.positions, elemObj.texts, function (err, doc) {
            if (err)  return fn(err, doc);
            var element_Id = doc._id;
            var element_name = doc.name;
            var kind = doc.kind;
            _Element_Action.create(element_Id, function (err, doc) {
                if (err)  return fn(err, doc);
                _Project.addElement(project_Id, element_name, element_Id, function (err, doc) {
                    if (err)  return fn(err, doc);
                    if (kind == 1)
                        _Vote.create(element_Id, 0, function (err, doc) {
                            if (err)  fn(err, null);
                            else    fn(null, element_Id);
                        });
                    else  return fn(err, element_Id)
                });
            });
        });
};



function deleteById(element_Id, fn) {
    _Element.deleteById(element_Id, function (err, doc) {
        if (err)  return fn(err, doc);
        var project_Id = doc.project_Id_item.project_Id;
        _Project.removeElement(project_Id, element_Id, function (err, doc) {
            if (err) return fn(err, doc);
            _Element_Action.deleteById(element_Id, function (err, doc) {
                if (err)  return fn(err, doc);
                _Vote.deleteById(element_Id, function (err, doc) {
                    if (err)  fn(err, null);
                    else fn(null, element_Id);
                });
            });
        });
    });
}

function deleteByIds(element_Ids, fn) {
    var count = 0;
    async.whilst(
        function () {
            return count < element_Ids.length;
        },
        function (callback) {
            console.log(element_Ids[count]);
            deleteById(element_Ids[count], function (err, doc) {
                if (err) return fn(err, doc);
                count++;
                callback();
            });
        },
        function (err) {
            fn(err, count);
        }
    )
}

function getById(element_Id, fn) {
    _Element.getById(element_Id, function (err, doc) {
        fn(err, doc);
    });
}

function getByProject(project_Id,fn) {
    _Element.getByProject(project_Id,function (err,doc) {
        fn(err,doc);
    });
}



function updateName(element_Id, name, fn) {
    _Element.updateName(element_Id, name, function (err, doc) {
        fn(err, doc);
    });
}

function updateDescription(element_Id, description, fn) {
    _Element.updateDescription(element_Id, description, function (err, doc) {
        fn(err, doc);
    });
}

function addTitles(element_Id, titles, fn) {
    _Element.addTitles(element_Id, titles, function (err, doc) {
        fn(err, doc);
    });
}

function updateTitles(element_Id, indexs, titles, fn) {
    _Element.updateTitles(element_Id, indexs, titles, function (err, doc) {
        fn(err, doc);
    });
}

function removeTitles(element_Id, indexs, fn) {
    _Element.removeTitles(element_Id, indexs, function (err, doc) {
        fn(err, doc);
    });
}

function addImages(element_Id, images, fn) {
    _Element.addImages(element_Id, images, function (err, doc) {
        fn(err, doc);
    });
}

function updateImage(element_Id, index, image, fn) {
    _Element.updateImage(element_Id, index, image, function (err, doc) {
        fn(err, doc);
    });
}

function removeImages(element_Id, indexs, fn) {
    _Element.removeImages(element_Id, indexs, function (err, doc) {
        fn(err, doc);
    });
}

function addColors(element_Id, colors, fn) {
    _Element.addColors(element_Id, colors, function (err, doc) {
        fn(err, doc);
    });
}

function updateColors(element_Id, indexs, colors, fn) {
    _Element.updateColors(element_Id, indexs, colors, function (err, doc) {
        fn(err, doc);
    });
}

function removeColors(element_Id, indexs, fn) {
    _Element.removeColors(element_Id, indexs, function (err, doc) {
        fn(err, doc);
    });
}

function addTimes(element_Id, times, fn) {
    _Element.addTimes(element_Id, times, function (err, doc) {
        fn(err, doc);
    });
}

function updateTimes(element_Id, indexs, times, fn) {
    _Element.updateTimes(element_Id, indexs, times, function (err, doc) {
        fn(err, doc);
    });
}

function removeTimes(element_Id, indexs, fn) {
    _Element.removeTimes(element_Id, indexs, function (err, doc) {
        fn(err, doc);
    });
}

function addLinks(element_Id, links, fn) {
    _Element.addLinks(element_Id, links, function (err, doc) {
        fn(err, doc);
    });
}

function updateLinks(element_Id,indexs,links,fn) {
    _Element.updateLinks(element_Id,indexs,links,function (err, doc) {
        fn(err,doc);
    });
}

function removeLinks(element_Id, indexs, fn) {
    _Element.removeLinks(element_Id, indexs, function (err, doc) {
        fn(err, doc);
    });
}

function addSizes(element_Id, sizes, fn) {
    _Element.addSizes(element_Id, sizes, function (err, doc) {
        fn(err, doc);
    });
}

function updateSizes(element_Id,indexs,sizes,fn) {
    _Element.updateSizes(element_Id,indexs,sizes,function (err, doc) {
        fn(err,doc);
    });
}

function removeSizes(element_Id, indexs, fn) {
    _Element.removeSizes(element_Id, indexs, function (err, doc) {
        fn(err, doc);
    });
}

function addPositions(element_Id, positions, fn) {
    _Element.addPositions(element_Id, positions, function (err, doc) {
        fn(err, doc);
    });
}

function updatePositions(element_Id,indexs,positions,fn) {
    _Element.updatePositions(element_Id,indexs,positions,function (err, doc) {
        fn(err,doc);
    });
}

function removePositions(element_Id, indexs, fn) {
    _Element.removePositions(element_Id, indexs, function (err, doc) {
        fn(err, doc);
    });
}

function incShow_Count(element_Id, fn) {
    _Element.incShow_Count(element_Id, function (err, doc) {
        fn(err, doc);
    });
}

function getShow_Count(element_Id, fn) {
    _Element.getShow_Count(element_Id, function (err, doc) {
        fn(err, doc);
    });
}

function clearShow_Count(element_Id, fn) {
    _Element.setShow_Count(element_Id, 0, function (err, doc) {
        fn(err, doc);
    });
}

function getFavourite(element_Id, fn) {
    _Element.getFavourite(element_Id, function (err, doc) {
        fn(err, doc);
    });
}

function incFavourite(element_Id, fn) {
    _Element.incFavourite(element_Id, function (err, doc) {
        fn(err, doc);
    });
}

function clearFavourite(element_Id, fn) {
    _Element.setFavourite(element_Id,0,function (err, doc) {
        fn(err,doc);
    });
}

function vote(element_Id, index, fn) {
    _Vote.incCountByIndex(element_Id, index, function (err, doc) {
        fn(err, doc);
    });
}

function updateVoteNum(element_Id, num, fn) {
    _Vote.updateNum(element_Id, num, function (err, doc) {
        fn(err, doc);
    });
}

function voteClear(element_Id, fn) {
    _Vote.clear(element_Id, function (err, doc) {
        fn(err, doc);
    });
}

function getDataVote(element_Id, fn) {
    _Vote.getById(element_Id, function (err, doc) {
        fn(err, doc);
    });
}








