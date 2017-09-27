/**
 * Created by zhaoxuebin on 2016/12/29.
 */
require('../../db')();
var VoteModel = require('../../models/_Vote');
var vote = new VoteModel();

// vote.create('58b7d2032e64b07b70eff2f8',4,function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// vote.deleteById('58b7d2032e64b07b70eff2f8',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// vote.getById('58b7d2032e64b07b70eff2f8',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// vote.updateNum('58b7d2032e64b07b70eff2f8',5,function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// vote.clear('58b7d2032e64b07b70eff2f8', function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// vote.incCountByIndex('58b7d2032e64b07b70eff2f8',5,function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });