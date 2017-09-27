/**
 * Created by zhaoxuebin on 2016/12/31.
 */
require('../../db')();
var _Element = require('../../combined_models/Element');
var Element = new _Element();

var elemObj = {
    name: 'element_1',
    kind: 1,
    description: 'description_1',
    titles: ['title_1.1', 'title_1.2'],
    images: [],
    colors: [],
    times: [1, 2],
    links: [],
    texts: [],
    sizes: [{w: 1, h: 1}, {w: 2, h: 2}],
    positions: [{t: 1, l: 2, w: 1, h: 1}],
};
var project_name = 'video_1';
var project_Id = '586884aeccfcdc539ef2a4f6';

Element.getByProject('58ba6c8cd66220325f796465',function (err, doc) {

})

// Element.createByEmail(elemObj,project_Id,project_name,function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// Element.deleteById('58b8088b31a25bb0ed3df37b',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// Element.deleteByIds(['58b835a249d9e1d877aa42f4','58b83640d58bd3d919f75d49'],function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });


// Element.getFavourite('58b8380db273dadaecfd96fa',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// Element.incFavourite('58b8380db273dadaecfd96fa',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });