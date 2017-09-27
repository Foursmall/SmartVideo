/**
 * Created by zhaoxuebin on 2017/4/19.
 */
var https = require('https');
var qs =require('querystring');

var apikey = 'a6681465431b43d4178ce5fee2e8d4e4';  //开发者授权APIKEY
var mobile = '';          // 手机号码
var sms_host = 'https://sms.yunpian.com/v2/sms/single_send.json';  // 第三方服务器

