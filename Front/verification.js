/**
 * Created by zhaoxuebin on 2017/4/21.
 */
var nodemailer = require('nodemailer');
var https = require('https');
var qs = require('querystring');

var mailTransport = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
    auth: {
        user: '1207883008@qq.com',
        pass: 'glbvwlhmurggjjjf'
    },
});


function sendMailforVerify(email, token, fn) {
    var mailOptions = {};
    mailOptions.from = '"SmartVideo" <1207883008@qq.com>'; // sender address;
    mailOptions.to = email;
    mailOptions.subject = 'Email Verification '; // Subject line
    mailOptions.text = ' ';
    var address = 'http://www.smartvideo.tech:3000/verification?email=' + email + '&&token=' + token;
    mailOptions.html = '<b>请您点击链接进行邮箱验证：<b><br>' +
        '<a href="' + address + '">' + address + ' <a>';
    mailTransport.sendMail(mailOptions, function (err, doc) {
        if (err) {
            console.log('Fail to send mail :');
            console.log(err);
        }
        else
            console.log('Successfully send mail to %s for verification !', email);
        fn(err, doc);
    });
}

function sendEmailforUpdatePassword(email, token, fn) {
    var mailOptions ={};
    mailOptions.from = '"SmartVideo" <1207883008@qq.com>'; // sender address;
    mailOptions.to = email;
    mailOptions.subject = 'SmartVideo密码重置 '; // Subject line
    mailOptions.text = ' ';
    var address = 'http://www.smartvideo.tech:3000/user/updatePasswordByEmail?email='+email+'&&token='+token;
    mailOptions.html = '<b>请您点击链接进行邮箱登陆密码重置：<b><br>' +
        '<a href="' + address + '">' + address + ' <a>';
    mailTransport.sendMail(mailOptions, function (err, doc) {
        if (err) {
            console.log('Fail to send mail :');
            console.log(err);
        }
        else
            console.log('Successfully send mail to %s for updatepassword!', email);
        fn(err, doc);
    });
}

// test
// sendMailforVerify('1207883008@qq.com','asdffweqfwef',function (err, doc) {
//     console.log(err);
//     console.log(doc);
// });


var apikey = 'a6681465431b43d4178ce5fee2e8d4e4';

var sms_host = 'sms.yunpian.com';
var sms_url = '/v2/sms/single_send.json';
var verifycode ;
//  true  false
// doc: 成功时：verifycode，失败时，详细信息
function sendSMS(phone, fn) {
    verifycode =random4Digts();
    var text = '【智视科技】您的验证码是' + verifycode + '。如非本人操作，请忽略本短信';
    var post_data = {
        'apikey': apikey,
        'mobile': phone,
        'text': text,
    };//这是需要提交的数据
    var content = qs.stringify(post_data);
    post(sms_url, content, sms_host, function (err, doc) {
        fn(err, doc);
        // console.log(err);
        // console.log(doc);
    });
}

// test
//

// sendSMS('13011828686', function (status, doc) {
//     console.log(status);
//     console.log(doc);
// });

function post(uri, content, host, fn) {
    var options = {
        hostname: host,
        port: 443,
        path: uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    var req = https.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            // console.log('BODY: ' + chunk);
            var res =JSON.parse(chunk);
            // console.log(code);
            if (res.code == 0) {  //注意
                fn(true, verifycode); // 成功时，doc ：手机号码
            } else {
                fn(false, res) ; // 失败时 ，doc：失败详情
            }
        });
    });
    //console.log(content);
    req.write(content);
    req.end();
}

function random4Digts() {
    var context = '';
    for (var i = 0; i < 4; i++) {
        context += Math.floor(Math.random() * 100 / 10);
    }
    return context;
}

// var res= random4Digts();
// console.log(res);

exports.sendMailforVerify = sendMailforVerify;
exports.sendEmailforUpdatePassword=sendEmailforUpdatePassword;
exports.sendSMS = sendSMS;