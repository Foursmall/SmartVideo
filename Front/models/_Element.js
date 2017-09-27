/**
 * Created by zhaoxuebin on 2016/12/28.
 */
var ElementModel = require('../schema/Schema.js').ElementModel;
module.exports = Element;

function Element() {
    Element.prototype.create = create;
    Element.prototype.deleteById = deleteById;
    Element.prototype.deleteByIds = deleteByIds;
    Element.prototype.getById = getById;
    Element.prototype.getByProject =getByProject;
    Element.prototype.incShow_Count = incShow_Count;
    Element.prototype.getShow_Count = getShow_Count;
    Element.prototype.setShow_Count = setShow_Count;
    Element.prototype.getFavourite = getFavourite;
    Element.prototype.incFavourite = incFavourite;
    Element.prototype.setFavourite = setFavourite;
    Element.prototype.updateName = updateName;
    Element.prototype.updateDescription = updateDescription;
    Element.prototype.addTitle = addTitle;
    Element.prototype.addTitles = addTitles;
    Element.prototype.updateTitles = updateTitles;
    Element.prototype.removeTitles = removeTitles;
    Element.prototype.addImage = addImage;
    Element.prototype.addImages = addImages;
    Element.prototype.updateImage = updateImage;
    Element.prototype.removeImages = removeImages;
    Element.prototype.addColor = addColor;
    Element.prototype.addColors = addColors;
    Element.prototype.updateColors = updateColors;
    Element.prototype.removeColors = removeColors;
    Element.prototype.addTime = addTime;
    Element.prototype.addTimes = addTimes;
    Element.prototype.updateTimes = updateTimes;
    Element.prototype.removeTimes = removeTimes;
    Element.prototype.addLink = addLink;
    Element.prototype.addLinks = addLinks;
    Element.prototype.updateLinks = updateLinks;
    Element.prototype.removeLinks = removeLinks;
    Element.prototype.addSize = addSize;
    Element.prototype.addSizes = addSizes;
    Element.prototype.updateSizes = updateSizes;
    Element.prototype.removeSizes = removeSizes;
    Element.prototype.addPosition = addPosition;
    Element.prototype.addPositions = addPositions;
    Element.prototype.updatePositions = updatePositions;
    Element.prototype.removePositions = removePositions;
    Element.prototype.setProject = setProject;
}

//新建一个互动元素
function create(name, kind, description, project_Id_item, titles, images, colors, times, links, sizes, positions, texts, fn) {
    var date = new Date();
    ElementModel.create({
        name: name,
        kind: kind,
        favourite: 0,
        show_count: 0,
        description: description,
        project_Id_item: project_Id_item,
        titles: titles,
        images: images,
        colors: colors,
        times: times,
        links: links,
        sizes: sizes,
        positions: positions,
        texts: texts,
        created: date,
        updated: date
    }, function (err, doc) {
        fn(err, doc);
    });
}

//获取一个互动元素
function getById(element_Id, fn) {
    ElementModel.findOne({_id: element_Id}, function (err, doc) {
        fn(err, doc);
    });
}

function getByProject(project_Id,fn) {
    ElementModel.find({"project_Id_item.project_Id":project_Id},'_id name kind texts positions sizes  links times colors images titles description ',function (err, doc) {
        fn(err,doc);
    });
}


//删除一个互动元素，根据id
function deleteById(element_Id, fn) {
    ElementModel.findOneAndRemove({_id: element_Id}, function (err, doc) {
        fn(err, doc);
    });
}

//删除多个互动元素，根据id集合
function deleteByIds(element_Ids, fn) {
    ElementModel.remove({_id: {$in: element_Ids}}, function (err, doc) {
        fn(err, doc);
    });
}


//增加互动元素显示数量
function incShow_Count(element_Id, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {$inc: {show_count: 1}}, function (err, doc) {
        fn(err, doc);
    });
}

//设置互动元素显示数量
function setShow_Count(element_Id, show_count, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {$set: {show_count: show_count}}, function (err, doc) {
        fn(err, doc);
    });
}

//获取互动元素显示数量
function getShow_Count(element_Id, fn) {
    ElementModel.findOne({_id: element_Id}, 'show_count', function (err, doc) {
        fn(err, doc);
    });
}

//获取点赞数量
function getFavourite(element_Id, fn) {
    var query = ElementModel.findOne({_id: element_Id});
    query.select({favourite: 1, _id: 0});
    query.exec(function (err, doc) {
        fn(err, doc)
    });
}

//增加点赞数量
function incFavourite(element_Id, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {$inc: {favourite: 1}}, function (err, doc) {
        fn(err, doc);
    });
}

//设置点赞数量
function setFavourite(element_Id, count, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {$set: {favourite: count}}, function (err, doc) {
        fn(err, doc);
    });
}

//更新互动元素名称
function updateName(element_Id, name, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {$set: {name: name, updated: new Date()}}, function (err, doc) {
        fn(err, doc);
    });
}

//更新互动元素描述
function updateDescription(element_Id, description, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $set: {
            description: description,
            updated: new Date()
        }
    }, function (err, doc) {
        fn(err, doc);
    });
}

//插入一个title
function addTitle(element_Id, title, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {titles: title},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

//插入多个title
function addTitles(element_Id, titles, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {titles: {$each: titles}},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

//更新titles集合中第index个数组元素，index从0开始,indexs是index集合
function updateTitles(element_Id, indexs, titles, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var i = 0; i < indexs.length; i++) {
            doc.titles[indexs[i]] = titles[i];
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('titles');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

//删除titles中指定index的数据
function removeTitles(element_Id, indexs, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var j = 0; j < indexs.length; j++) {
            indexs[j] -= j;
        }
        for (var i in  indexs) {
            doc.titles.splice(indexs[i], 1);
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('titles');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function addImage(element_Id, image, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {images: image},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function addImages(element_Id, images, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {images: {$each: images}},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function updateImage(element_Id, index, image, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        doc.images[index] = image;
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('images');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function removeImages(element_Id, indexs, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var j = 0; j < indexs.length; j++) {
            indexs[j] -= j;
        }
        for (var i in  indexs) {
            doc.images.splice(indexs[i], 1);
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('images');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function addColor(element_Id, color, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {colors: color},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function addColors(element_Id, colors, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {colors: {$each: colors}},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function updateColors(element_Id, indexs, colors, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var i = 0; i < indexs.length; i++) {
            doc.colors[indexs[i]] = colors[i];
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('colors');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function removeColors(element_Id, indexs, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var j = 0; j < indexs.length; j++) {
            indexs[j] -= j;
        }
        for (var i in  indexs) {
            doc.colors.splice(indexs[i], 1);
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('colors');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function addTime(element_Id, time, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {times: time},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function addTimes(element_Id, times, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {times: {$each: times}},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function updateTimes(element_Id, indexs, times, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var i = 0; i < indexs.length; i++) {
            doc.times[indexs[i]] = times[i];
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('times');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function removeTimes(element_Id, indexs, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var j = 0; j < indexs.length; j++) {
            indexs[j] -= j;
        }
        for (var i in  indexs) {
            doc.times.splice(indexs[i], 1);
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('times');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function addLink(element_Id, link, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {links: link},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function addLinks(element_Id, links, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {links: {$each: links}},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function updateLinks(element_Id, indexs, links, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var i = 0; i < indexs.length; i++) {
            doc.links[indexs[i]] = links[i];
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('links');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function removeLinks(element_Id, indexs, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var j = 0; j < indexs.length; j++) {
            indexs[j] -= j;
        }
        for (var i in  indexs) {
            doc.links.splice(indexs[i], 1);
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('links');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function addSize(element_Id, size, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {sizes: size},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function addSizes(element_Id, sizes, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {sizes: {$each: sizes}},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function updateSizes(element_Id, indexs, sizes, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var i = 0; i < indexs.length; i++) {
            doc.sizes[indexs[i]] = sizes[i];
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('sizes');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function removeSizes(element_Id, indexs, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var j = 0; j < indexs.length; j++) {
            indexs[j] -= j;
        }
        for (var i in indexs) {
            doc.sizes.splice(indexs[i], 1);
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('sizes');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function addPosition(element_Id, position, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {positions: position},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function addPositions(element_Id, positions, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id}, {
        $push: {positions: {$each: positions}},
        $set: {updated: new Date()}
    }, function (err, doc) {
        fn(err, doc);
    });
}

function updatePositions(element_Id, indexs, positions, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var i = 0; i < indexs.length; i++) {
            doc.positions[indexs[i]] = positions[i];
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('positions');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function removePositions(element_Id, indexs, fn) {
    var query = ElementModel.findOne().where('_id', element_Id);
    query.exec(function (err, doc) {
        for (var j = 0; j < indexs.length; j++) {
            indexs[j] -= j;
        }
        for (var i in indexs) {
            doc.positions.splice(indexs[i], 1);
        }
        doc.updated = new Date();
        doc.markModified('updated');
        doc.markModified('positions');
        doc.save(function (err, doc) {
            fn(err, doc);
        });
    });
}

function setProject(element_Id, project_name, project_Id, fn) {
    ElementModel.findOneAndUpdate({_id: element_Id},
        {$set: {project_Id_item: {name: project_name, project_Id: project_Id}}},
        function (err, doc) {
            fn(err, doc);
        });
}



