/**
 * Created by zhangyaqiang on 2017/3/15.
 */
var app = angular.module('App', ['angular-popups']);

var pre_url ='http://www.smartvideo.tech:3000/';
app.controller('Controller', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
    $rootScope.pre_url = pre_url;
    $scope.name = 'zuq';
    $scope.elementInfo = [];
    $scope.time = ''
    var video_id = document.getElementById($scope.video_Id);
    video_id.ontimeupdate=function(){tagtime_judge(this)};
    function tagtime_judge(event)
    {
        $scope.time = event.currentTime;
        $scope.$digest();
    }

    $http({method: 'GET', url: pre_url+'api/getProjectAttributes/'+$scope.project_id})
        .then(function success(response) {
            //获取所有项目信息
            console.log(response.data);
            for (ele in response.data.result){
                ele = response.data.result[ele];
                //分类
                switch(ele.kind) {
                    case 1:
                        var temp = {_id: '' , kind: '',title:'', options:[], color: '', video_id: '', current_time: '', pic: '',
                            start_time:'', end_time: '', link: '', left :'', top: '', voted: false, answer: -1, sta_info: []};
                        // temp.project_id = $scope.current_project.project_id;
                        temp._Id = ele._id;
                        temp.kind = 1;
                        temp.title = ele.titles[0];
                        temp.color = ele.colors[0];
                        // temp.video_id =
                        temp.current_time = Number(ele.times[0]);
                        temp.pic = pre_url+ele.images[0];
                        temp.link = ele.links[0];
                        temp.left = ele.positions[0].l;
                        temp.top = ele.positions[0].t;
                        temp.options = ele.texts;
                        temp.start_time = ele.times[1];
                        temp.end_time = ele.times[2];
                        var element = $.extend(true, {}, temp);
                        $scope.elementInfo.push(element);
                        break;
                    case 2:
                        var temp = {_Id: '' , kind: '',title:'', pic: '', link: '', positions: [], times: [], name: ''};
                        // temp.project_id = $scope.current_project.project_id;
                        temp._Id = ele._id;
                        temp.kind = 2;
                        temp.title = ele.titles[0];
                        // temp.video_id =
                        temp.name = ele.name;
                        temp.pic = pre_url+ele.images[0];
                        temp.link = ele.links[0];
                        temp.positions = ele.positions;
                        for(t in ele.times){
                            ele.times[t] = Number(ele.times[t]);
                        }
                        temp.times = ele.times;
                        var element = $.extend(true, {}, temp);
                        $scope.elementInfo.push(element);
                        break;
                    case 3:
                        var temp = {_Id: '' , kind: '',title:'', pic: '', link: '', color:'', positions: [], times: [], name: '', description: '', show: false};
                        temp._Id = ele._id;
                        temp.kind = 3;
                        temp.title = ele.titles[0];
                        temp.description = ele.description;
                        temp.name = ele.name;
                        temp.pic = pre_url+ele.images[0];
                        temp.link = ele.links[0];
                        temp.color = ele.colors[0];
                        temp.positions = ele.positions;
                        for(t in ele.times){
                            ele.times[t] = Number(ele.times[t]);
                        }
                        temp.times = ele.times;
                        var element = $.extend(true, {}, temp);
                        $scope.elementInfo.push(element);
                        break;
                }
            }
        },function error() {
            console.log('error');
        });
    console.log($scope.elementInfo);
    $scope.player = {top: 0, left: getElementLeft(video_id), width: video_id.offsetWidth, height: video_id.offsetHeight}

    function getElementLeft(element){
        var actualLeft = element.offsetLeft;
        var current = element.offsetParent;
        while (current !== null){
            actualLeft += current.offsetLeft;
            current = current.offsetParent;
        }
        return actualLeft;
    }
    function getElementTop(element){
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }

    $scope.video_pause = function (id) {
        console.log(id);
        video_id.pause();
        console.log('pause');
        for(ele in $scope.elementInfo){
            if($scope.elementInfo[ele]._Id == id){
                break;
            }
        }
        console.log(ele);
        $scope.elementInfo[ele].show =true;
        console.log($scope.elementInfo[ele]);
    }

    $scope.video_start = function (id) {
        video_id.play();
        for(ele in $scope.elementInfo){
            if($scope.elementInfo[ele]._Id == id){
                break;
            }
        }
        $scope.elementInfo[ele].show = false;
    }

    $scope.vote = function (id) {
        for (ele in $scope.elementInfo){
            if($scope.elementInfo[ele]._Id == id){
                break;
            }
        }
        console.log(id);
        url = pre_url+'api/vote/' + id + '/' + $scope.elementInfo[ele].answer;
        $http({method:'POST', url: url})
            .then(function success(response) {
                console.log(response.data);
                var num = response.data.result.num;
                console.log(num);
                for(var i=0;i<num ;i++){
                    console.log(i);
                    $scope.elementInfo[ele].sta_info.push(response.data.result.data[i].count);
                    console.log(response.data.result.data[i].count);
                }
                $scope.elementInfo[ele].voted = true;
                $scope.elementInfo[ele].sta_info[$scope.elementInfo[ele].answer] += 1;
            },function error() {

            })
    }
}]);

app.directive('interElement', function () {
    return {
        template:'<div vote-element></div>\
                <div photo-element></div>\
                <div ad-element></div>'
    }
});

app.directive('voteElement', function () {
    return {
        // templateUrl: 'view/vote.html'
        template:'<div class="preview-box" ng-repeat="element in elementInfo" style="position: absolute;left: {{element.left}}px;top: {{element.top}}px;z-index: 100" ng-if="time>=element.current_time&&time<=element.current_time+5&&element.kind == 1">\
        <div class="time pull-right">{{element.current_time+5-time | number:0}} s</div>\
    <div class="style-preview style-{{element.color}}">\
        <div style="background-image: url({{element.pic}})" class="banner"></div>\
        <div class="drop">\
        <div class="question" ng-bind="element.title"></div>\
        <div class="options" ng-if="!element.voted" >\
        <!-- ngRepeat: option in editDg.qoptions -->\
    <div ng-repeat="option in element.options track by $index" class="option ng-scope" style="">\
        <label>\
        <input type="radio" name="option" ng-model="element.answer" value={{$index}}>\
    <span class="ng-binding">{{option}}</span>\
    </label>\
    </div>\
    <!-- end ngRepeat: option in editDg.qoptions -->\
    </div>\
    <div class="result" ng-if="element.voted" >\
        <form class="form-horizontal" ng-repeat="option in element.options track by $index">\
        <!--<div class="form-horizontal" ng-if="element.voted" ng-repeat="option in element.options track by $index">-->\
        <div class="form-group">\
        <p class="col-sm-5">{{option}}</p>\
    <label class="col-sm-7">共计 {{element.sta_info[$index]}} 票</label>\
    <!--<div class="col-sm-10 progress">-->\
        <!--<div class="progress-bar progress-bar-success" role="progressbar"-->\
    <!--aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"-->\
    <!--style="width: {{element.sta_info[index]}}%;">-->\
        <!--</div>-->\
        <!--</div>-->\
        </div>\
        </form>\
        </div>\
        <!--投票成功-->\
        <!--<div class="vote-btn" ng-if="element.voted">投票成功</div>-->\
        <div class="vote-btn" ng-if="!element.voted">\
        <button class="btn btn-sm" ng-click="vote(element._Id)">投票</button>\
        </div>\
        </div>\
        </div>\
        </div>\
        '
    }
});

app.directive('photoElement', function () {
    return {
        // templateUrl: 'view/cloud_photo.html'
        template:'<div ng-repeat="element in elementInfo" ng-if="element.kind == 2" style="z-index: 10;">\
        <div ng-repeat="t in element.times track by $index" ng-show="time>=t&&time<=t+3" style="top: {{element.positions[$index].t}}px;left: {{element.positions[$index].l}}px;z-index: 100;position: absolute;">\
        <a href="http://{{element.link}}/" target="_blank">\
        <label class="pull-right" style="color: #ffFFFF">{{t+3-time | number:0}} s</label>\
         <img src="{{element.pic}}" style="width: 100px;height: 100px;border-radius: 3px">\
        </a>\
        </div>\
        </div>\
        '
    }
});

app.directive('adElement', function () {
    return {
        // templateUrl: 'view/ad_photo.html'
        // templateUrl: $sce.trustAsResourceUrl(pre_url+'views/ad_photo.html ')
        template:'<div ng-repeat="element in elementInfo" ng-if="element.kind == 3" style="z-index: 10;">\
        <div ng-repeat="t in element.times track by $index" ng-show="time>t&&time<t+3" style="top: {{element.positions[$index].t}}px;left: {{element.positions[$index].l}}px;z-index: 100;position: absolute;">\
        <a href="#{{element.name}}" ng-click="video_pause(element._Id)" style="z-index: 5;text-decoration: none">\
        <!--点击-->\
        <img src="{{pre_url}}images/dot.png" class="dot">\
        <div class="dot_name">{{element.name}}</div>\
    </a>\
    </div>\
    </div>\
    <div class="ad" id="{{element.name}}" ng-repeat="element in elementInfo" ng-if="element.kind == 3&&element.show" tabindex="-1" style="top: 0px;left: opx;width: {{player.width}}px;height: {{player.height}}px;">\
        <div class="ad img-round style-{{element.color}} container-fluid">\
        <div class="row" style="height: 10%">\
        <button class="pull-right btn vote-btn" ng-click="video_start(element._Id)">X</button>\
        </div>\
        <div class="row" style="height: 75%">\
        <div class="col-sm-7" style="height: 100%;">\
        <div class="row" style="position: absolute;height:30%;top:15%;width: 100%">\
        <div class="col-sm-offset-2">\
        <h1 style="color: white;width: 30%;position: fixed;" maxlength="10">{{element.title}}</h1>\
    </div>\
    </div>\
    <div class="row" style="position: relative;height:50%;top:45%;width: 100%">\
        <div class="col-sm-offset-2">\
        <p style="color: white;width: 23%;height: 13%;position: fixed;overflow-y: auto">{{element.description}}</p>\
    </div>\
    </div>\
    </div>\
    <div class="col-sm-5" style="height: 100%;">\
        <img src="{{element.pic}}" style="position:absolute;top:10%;left:10%;width: 80%;height: 80%;">\
        </div>\
        </div>\
        <div class="row" style="height: 15%;">\
        <a class="btn btn-primary" href="http://{{element.link}}/" target="_blank" style="width: 24%;left:38%;position: absolute;">READ MORE</a>\
    </div>\
    </div>\
    </div>\
    '
    }
});

