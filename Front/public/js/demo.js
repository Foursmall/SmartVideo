/**
 * Created by Jasmine on 009 2016-12-9.
 */
var count=0;
var divnum=0;
var divtime=0;
var divinfo=0;
var flag1=0;

// var $scope = angular.element(document.getElementById("topic_controller")).scope();
// //var appElement = document.querySelector('[ng-controller=topic_controller]');//获得绑定controllerdom节点
// //var $scope = angular.element(appElement).scope(); //获得$scope对象console.log($scope);
// console.log($scope.elementInfo.link);

var options={
    video_id : "topic_vote_video",//视频ID
    tag_showtime : 2,//标签出现时间
    tag_lastime : 4,//标签持续时间
    opensite : "suae.html" ,//打开的链接
    tag_txt:"click",//标签应该显示的内容s
    tag_top:"300",
    tag_left:"550",//标签位置
    shawdow_top:"120",
    shawdow_left:"120",
    shawdow_height:"540",
    shawdow_width:"740", //半透明遮罩层位置和大小 需要与视频播放器位置大小同步
    inform_top:"12",
    inform_left:"12",
    inform_height:"70",
    inform_width:"80",//弹出信息位置 大小 需要与内容和播放器位置大小同步
    inform_txt:"原名朴秀爱，1980年7月25日出生于出生韩国首尔，韩国女演员。1999年KBS电视剧《学校2》出道。2009年凭《郎在远方》获第46届韩国电影大钟奖最佳女主角；2010年凭借《深夜的FM》获第31届韩国青龙奖最佳女主角；",//信息层显示的商品简介 不超过50个字
    inform_name:"秀爱",//标题
    inform_txt1:"READ MORE",//信息层点进链接按钮内容
    inform_txt0:"CLOSE",//信息层关闭按钮内容
    tag_img_src:"pedia.png",
    inform_img_src:"pedia1.jpg"
};

var vid = document.getElementById(options.video_id);
// 向 video 元素添加 ontimeupdate 事件，然后再当前播放位置发生改变时执行函数
vid.ontimeupdate=function(){tagtime_judge(this)};// Cannot set property 'ontimeupdate' of null???

var video_top=$("#"+options.video_id).offset().top;//获取视频的top属性
var video_left=$("#"+options.video_id).offset().left;//获取视频的left属性
var video_width=$("#"+options.video_id).width();//获取视频的宽度属性
var video_height=$("#"+options.video_id).height();//获取视频的高度属性

//遮罩层位置大小赋值
options.shawdow_top=video_top;
options.shawdow_left=video_left;
options.shawdow_width=video_width;
options.shawdow_height=video_height;

var tag=document.createElement("div");//创建div节点，然后设置其属性 标签
var shawdow=document.createElement("div");//遮罩层
var inform_name=document.createElement("h1");//信息层名称
var inform_summary=document.createElement("p");//信息层简介
var inform=document.createElement("div");//信息层
divnum=tag;

//定义标签样式
tag.style.top=options.tag_top+"px";
tag.style.left=options.tag_left+"px";//标签出现位置
// tag.style.width="50px";
// tag.style.height="50px";
tag.style.position="absolute";
tag.style.visibility="hidden";
tag.style.zIndex=1;
tag.style.color="#e06b9c";
tag.className = "glyphicon glyphicon-record";
tag.onclick = function () {ShowOverlay(shawdow,inform)};
tag.style.fontSize = "25px";


//定义遮罩层的样式
shawdow.style.top=options.shawdow_top+"px";
shawdow.style.left=options.shawdow_left+"px";
shawdow.style.width=options.shawdow_width+"px";
shawdow.style.height=options.shawdow_height+"px";
shawdow.style.position="absolute";
shawdow.style.visibility="hidden";
shawdow.style.zIndex=1;
shawdow.style.border="2px solid #a1a1a1";
shawdow.style.background="rgba(0,0,0,0.5)";//定义背景的颜色
shawdow.onclick = function () {CloseOverlay(shawdow,inform)};

//定义信息层的样式  信息层为遮罩层的子层
inform.style.top=options.inform_top+"%";
inform.style.left=options.inform_left+"%";
inform.style.width=options.inform_width+"%";
inform.style.height=options.inform_height+"%";
inform.style.position="relative";
inform.style.visibility="hidden";
inform.style.background="#fff";
inform.style.background="rgba(0,0,0,0.5)";
inform.className="img-rounded";

var inform_button1=document.createElement("button");//确认按钮
inform_button1.onclick=function(){OpenSite()};
inform_button1.className="btn btn-primary col-md-5 col-md-pull-5 col-sm-5 col-sm-pull-5 col-xs-5 col-xs-pull-5 col-lg-5 col-lg-pull-5";
inform_button1.style.marginTop="5%";
inform_button1.style.marginLeft="2%";

var inform_button2=document.createElement("button");//取消按钮
inform_button2.onclick=function(){CloseOverlay(shawdow,inform)};
inform_button2.className="btn btn-primary col-md-1.1 col-md-offset-5.45 col-xs-1.1 col-xs-offset-5.45 col-sm-1.1 col-sm-offset-5.45 col-lg-1.1 col-lg-offset-5.45";
inform_button2.style.marginTop="2%";
// inform_button2.style.marginLeft="10%";

var tag_img = document.createElement("img");//点击显示浮层的按钮
tag_img.onclick=function(){ShowOverlay(shawdow,inform)};
tag_img.setAttribute('src',options.tag_img_src);
tag_img.setAttribute('width','30px');
tag_img.setAttribute('height','30px');//固定大小标签
tag_img.className="img-circle";


var inform_img1 = document.createElement('img');
inform_img1.className = "col-md-5 col-md-push-6 col-sm-5 col-sm-push-6 col-xs-5 col-xs-push-6 col-lg-5 col-lg-push-6";
inform_img1.setAttribute('src',options.inform_img_src);
// inform_img1.setAttribute('width',"45%");
inform_img1.setAttribute('height',"70%");
inform_img1.onclick=function(){OpenSite()};//点击图片
inform_img1.style.marginLeft="5%";
inform_img1.style.marginTop="12%";
// inform_img1.style.float="right";

inform_name.className = "col-md-5";
inform_name.style.marginTop= "12%";
inform_name.style.color="white";
inform_summary.className = "col-md-6 col-md-pull-5 col-sm-6 col-sm-pull-5 col-xs-6 col-xs-pull-5 col-lg-6 col-lg-pull-5";//文字部分位置
inform_summary.style.marginTop= "5%";
inform_summary.style.color="white";

var NAME = document.createElement("div");
NAME.className = "col-md-6 col-md-pull-5";
var inform_favourite = document.createElement("a");
var heart = document.createElement("span");
heart.className = "glyphicon glyphicon-heart";
heart.style.fontSize = "20px";
heart.style.marginTop="15%";
NAME.appendChild(inform_name);
NAME.appendChild(inform_favourite);
inform_favourite.appendChild(heart);

tag_img.innerHTML=options.tag_txt;
inform_name.innerHTML = options.inform_name;
inform_summary.innerHTML=options.inform_txt;
inform_button1.innerHTML=options.inform_txt1;
inform_button2.innerHTML=options.inform_txt0;

inform.appendChild(inform_button2);//关闭
inform.appendChild(inform_img1);
inform.appendChild(NAME);
inform.appendChild(inform_summary);//文字部分放在信息层上
inform.appendChild(inform_button1);


shawdow.appendChild(inform);//信息层放在遮罩层

// tag.appendChild(tag_img);//图片放在标签上

document.getElementsByTagName("body")[0].appendChild(shawdow);
document.getElementsByTagName("body")[0].appendChild(tag);

//esc关闭
function ESCclose(event){
    if(event.keyCode == 27){
        CloseOverlay(shawdow,inform);
    }
}

//按下标签 视频暂停 弹出信息层
function ShowOverlay(elem1,elem2)
{
    if(!vid.paused){vid.pause();}//视频暂停
    elem1.style.visibility="visible";
    elem2.style.visibility="visible";
    flag1=1;
}

//信息层关闭 视频开始
function CloseOverlay(elem1,elem2)
{
    if(vid.paused) {vid.play();}//视频播放
    elem1.style.visibility="hidden";
    elem2.style.visibility="hidden";
    flag1=0;
}

function OpenSite()
{
    window.open(options.opensite);//点击确定打开的链接
}

//视频播放时触发的函数
function tagtime_judge(event)
{
    if(event.currentTime>=options.tag_showtime&&(event.currentTime-options.tag_lastime)<=options.tag_showtime&&flag1==0)
    {
        divnum.style.visibility="visible";
    }
    else
    {
        divnum.style.visibility="hidden";
        // if(flag1){
        // 	document.onkeypress = function(){ESCclose(event)};
        // }
    }
}

