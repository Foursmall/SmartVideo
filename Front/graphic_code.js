/**
 * Created by zhaoxuebin on 2017/4/19.
 */
var http = require('http');
var captchapng = require('captchapng');
var fs = require('fs');

exports.generateVerifyImg=generateVerifyImg;

function generateVerifyImg() {
    var _verify = {
        code: '',
        img: ''
    };
    // 生成四位数字和字母的数字作为验证码
    var numbers = '0123456789';
    var length = 4;
    var randomcode = '';
    for (var i = 0; i < length; i++) {
        randomcode += numbers[parseInt(Math.random() * 1000) % numbers.length];
    }
    _verify.code = randomcode;

    // 输出图片
    var p = new captchapng(100,40,parseInt(randomcode)); // width,height,numeric captcha
    p.color(255, 255, 255, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();

    _verify.img = img;
    return _verify;
}

// var VerifyRouter=generateVerifyImg();
// var dataBuffer = new Buffer(VerifyRouter.img, 'base64');
// fs.writeFile("code.png", dataBuffer, function(err) {
//     if(err){
//         console.log(err);
//     }else{
//         console.log("ok");
//     }
// });