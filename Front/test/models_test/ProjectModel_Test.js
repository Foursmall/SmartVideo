/**
 * Created by zhaoxuebin on 2016/12/28.
 */
require('../../db')();
var ProjectModel = require('../../models/_Project');
var project = new ProjectModel();

project.create('project_1','5863dae7f9dff87399e13044','description_1',[],function (err, doc) {
    console.log(err);
    console.log(doc);
});

// project.getByUser('5863dae7f9dff87399e13044',function (err, docs) {
//     console.log(err);
//     console.log(docs);
// });

// project.getById('586479fe42884284718ba06c',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// project.setUser('586479fe42884284718ba06c','5863dae7f9dff87399e13044',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// project.updateDescription('586479fe42884284718ba06c','description_1',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });
// project.updateName('5864a5e45a1807ace21c2b5a','video_1',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// project.deleteByUser('5863dae7f9dff87399e13044',function (err, results) {
//     console.log(err);
//     console.log(results);
// });

// project.addElement('58b7fcecc5d8c3a520b94200','element_1','5868adabcd203e7968f5e2ab',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// project.removeElement('58b7fcecc5d8c3a520b94200','5868adabcd203e7968f5e2ab',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// project.incPlay_Count('58b7fcb27e3b84a4d8082ecf',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });