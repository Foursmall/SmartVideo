/**
 * Created by zhaoxuebin on 2017/3/17.
 */

var fs = require('fs');
var path = require('path');
// 获取本机IPV4
// var os = require('os');
// var IPv4,hostName;
// hostName=os.hostname();
// for(var i=0;i<os.networkInterfaces().en0.length;i++){
//     if(os.networkInterfaces().en0[i].family=='IPv4'){
//         IPv4=os.networkInterfaces().en0[i].address;
//     }
// }
// console.log('----------local IP: '+IPv4);
// console.log('----------local host: '+hostName);

var str;
var IPv4 = '10.108.103.117';
var image_name ;
var pre_url = 'http://'+IPv4+':3000/image/'+image_name;

var image_db = path.resolve(__dirname,'/image_db','123');

console.log(image_db);
console.log(__dirname);

//element_Id :  元素id
//image_name :  数据库中图片名字
function getURL(element_Id,image_name ,fn) {
    var image_addr =path.resolve(image_db,element_Id+'_'+image_name);
    console.log(image_addr);
    fs.exists(image_addr,function (exist) {
        if(exist)
            return fn(true);
        else
            return fn(false);
    })
}
//
// getURL('58c8fb12e95ee9ae4d00aa56','heheh.jpg',function (exist) {
//     console.log(exist);
// });

// console.log(__dirname);
