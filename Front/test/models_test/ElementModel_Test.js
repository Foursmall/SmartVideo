/**
 * Created by zhaoxuebin on 2016/12/29.
 */
require('../../db')();
var ElementModel = require('../../models/_Element');
var element = new ElementModel();

var name = 'element_1',
    kind = 1,
    description ='description_1',
    project_Id_items = {name: 'project_1', project_Id: '58ba6c8cd66220325f796465'},
    titles =[],
    images =[],
    colors =[],
    times =[],
    links =[],
    sizes= [{w:1,h:1},{h:2,w:2},{w:3,h:3}],
    positions =[{w:1,h:1,t:1,l:1}],
    texts =[];

// element.create('element_2', kind, 'description_1', project_Id_items, titles, images, colors, times, links, sizes, positions, texts, function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });


element.getByProject('58ba6c8cd66220325f796465',function (err, doc) {
    console.log(doc);
    console.log(err);
})

// element.deleteById('58b7d07360f70679c150f815',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.deleteByIds(['58b7d14457d4427aa6f4d100','58b7d10048a2367a536bd9e2'],function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.getById('5864b5a287eeecbca0236978',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.incShow_Count('58b7d2032e64b07b70eff2f8',function (err,doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.setShow_Count('58b7d2032e64b07b70eff2f8',8,function (err,doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.getShow_Count('58b7d2032e64b07b70eff2f8',function (err,doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.updateName('58b7d2032e64b07b70eff2f8','element_1',function (err,doc) {
//     console.log(err);
//     console.log(doc);
// });


// element.getFavourite('58b7d2032e64b07b70eff2f8',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.incFavourite('58b7d2032e64b07b70eff2f8',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });
// element.addTitle('58b7d2032e64b07b70eff2f8', 'title_1.2', function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.addTitles('58b7d2032e64b07b70eff2f8', ['title_1.3', 'title_1.4'], function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.updateTitles('58b7d2032e64b07b70eff2f8',[6],['Title_6'],function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.removeTitles('58b7d2032e64b07b70eff2f8',[3,4,5,6],function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.addSize('5864fc7615ce5e002374add2',{w:6,h:6},function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.addSizes('5864fc7615ce5e002374add2',[{w:4,h:4},{w:5,h:5}],function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.updateSizes('5864fc7615ce5e002374add2', 0, {w: 0, h: 0}, function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.removeSizes('5864fc7615ce5e002374add2', [0,1], function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// element.setProject('58b7d2032e64b07b70eff2f8','new_project1','586884aeccfcdc539ef2a4f7',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

