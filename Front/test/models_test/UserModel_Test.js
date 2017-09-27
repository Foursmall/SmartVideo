/**
 * Created by zhaoxuebin on 2016/12/28.
 */
require('../../db')();
var _User = require('../../models/_User');
var User = new _User();

var name = 'foursmall',
    password = '123',
    email = '1207883008@qq.com',
    project_Id_items = [];


// User.create(name, password, email, function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// User.getByemail('1207883008@qq.com',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// User.updatePassword('58b52ae34f434aa9f89f4793','123',function (err,doc) {
//     console.log(err);
//     console.log(doc);
// });

// User.updateName('58b52ae34f434aa9f89f4793','foursmall',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

// var project_Ids_item= {name:'video2',project_Id:'5863ac5810e0ee471bf95252'};
// User.addProject('58b52ae34f434aa9f89f4793',project_Ids_item,function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });
//
// User.removeProject('58b52ae34f434aa9f89f4793','5863ac5810e0ee471bf95252',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });

User.getProjectsByUser('58b52ae34f434aa9f89f4793',function (err, doc) {
    console.log(err);
    // console.log(doc);
    var project_Ids =[];
    for (var i =0;i<doc.project_Id_items.length;i++){
        project_Ids[i]=doc.project_Id_items[i].project_Id;
    }
    console.log(project_Ids);

});