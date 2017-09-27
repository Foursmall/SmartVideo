/**
 * Created by Jasmine on 009 2016-12-9.
 */
var count=0;
var divnum=0;
var divtime=0;
var divinfo=0;
var flag1=0;

var options={
    video_id : options0.video_id,//视频ID
    tag_showtime : options0.tag_showtime,//标签出现时间
    tag_lastime : 4,//标签持续时间
    opensite : options0.opensite ,//打开的链接
    tag_txt:"click",//标签应该显示的内容
    tag_top:options0.tag_top,
    tag_left:options0.tag_left,//标签位置
    tag_size:options0.tag_size,
    tag_color:options0.tag_color,
    shadow_top:"120",
    shadow_left:"120",
    shadow_height:"540",
    shadow_width:"740", //半透明遮罩层位置和大小 需要与视频播放器位置大小同步
    inform_top:"12",
    inform_left:"12",
    inform_height:"70",
    inform_width:"80",//弹出信息位置 大小 需要与内容和播放器位置大小同步
    inform_txt:options0.inform_txt,//信息层显示的商品简介 不超过50个字
    inform_name:options0.inform_name,//标题
    inform_txt1:"READ MORE",//信息层点进链接按钮内容
    inform_txt0:"CLOSE",//信息层关闭按钮内容
    tag_img_src:options0.tag_img_src,
    inform_img_src:options0.inform_img_src
};
var vid = document.getElementById(options.video_id);
// 向 video 元素添加 ontimeupdate 事件，然后再当前播放位置发生改变时执行函数
vid.ontimeupdate=function(){tagtime_judge(this)};// Cannot set property 'ontimeupdate' of null???

var video_top=$("#"+options.video_id).offset().top;//获取视频的top属性
var video_left=$("#"+options.video_id).offset().left;//获取视频的left属性
var video_width=$("#"+options.video_id).width();//获取视频的宽度属性
var video_height=$("#"+options.video_id).height();//获取视频的高度属性

//遮罩层位置大小赋值
options.shadow_top=video_top;
options.shadow_left=video_left;
options.shadow_width=video_width;
options.shadow_height=video_height;

var tag=document.createElement("div");//创建div节点，然后设置其属性 标签
var shadow=document.createElement("div");//遮罩层
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
tag.style.color=options.tag_color;
tag.className = "glyphicon glyphicon-record";
tag.onclick = function () {ShowOverlay(shadow,inform)};
tag.style.fontSize = options.tag_size+"px";


//定义遮罩层的样式
shadow.style.top=options.shadow_top+"px";
shadow.style.left=options.shadow_left+"px";
shadow.style.width=options.shadow_width+"px";
shadow.style.height=options.shadow_height+"px";
shadow.style.position="absolute";
shadow.style.visibility="hidden";
shadow.style.zIndex=1;
shadow.style.border="2px solid #a1a1a1";
shadow.style.background="rgba(0,0,0,0.5)";//定义背景的颜色
shadow.onclick = function () {CloseOverlay(shadow,inform)};

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
inform_button2.onclick=function(){CloseOverlay(shadow,inform)};
inform_button2.className="btn btn-primary col-md-1.1 col-md-offset-5.45 col-xs-1.1 col-xs-offset-5.45 col-sm-1.1 col-sm-offset-5.45 col-lg-1.1 col-lg-offset-5.45";
inform_button2.style.marginTop="2%";
// inform_button2.style.marginLeft="10%";

var tag_img = document.createElement("img");//点击显示浮层的按钮
tag_img.onclick=function(){ShowOverlay(shadow,inform)};
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


shadow.appendChild(inform);//信息层放在遮罩层

// tag.appendChild(tag_img);//图片放在标签上

document.getElementsByTagName("body")[0].appendChild(shadow);
document.getElementsByTagName("body")[0].appendChild(tag);

//esc关闭
function ESCclose(event){
    if(event.keyCode == 27){
        CloseOverlay(shadow,inform);
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

