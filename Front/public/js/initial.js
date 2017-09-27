/**
 * Created by zhangyaqiang on 2017/1/11.
 */
var app = angular.module('video++', []);

app.controller('topic_controller', function ($scope, fileReader) {
    // $scope.video_url = 'video/sample.mp4';
    $scope.video_url = 'video/sample.mp4';
    $scope.url = '';
    $scope.seturl = function () {
        $scope.video_url = $scope.url;
    }

    //用户信息
    $scope.user = null;

    //登录信息
    $scope.login = {account:"", pwd:""};

    //注册信息
    $scope.register = {account:"", pwd:"", pwd_confirm:""};

    //投票信息
    $scope.elementInfo = {title:'who?', options:['me', 'you'],  pic:"images/james.jpeg",
                        link:'www.baidu.com', start_time:'', finish_time:'', left:'', top:'',
                        current_time:'', video_id:'', color: "0"}

    //热点信息
    $scope.hot_points = []
    //投票问题增减
    $scope.delete_option = function (index) {
        $scope.elementInfo.options.splice(index,1)
    }
    $scope.add_option = function (vote) {
        $scope.elementInfo.options.push("answer")
    }
    //改变广告图片
    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
                $scope.elementInfo.pic = result;
            });
    };

    //热点列表
    $scope.js_documents = ['demo.js', 'demo1.js'];
    //添加热点
    $scope.add_hotpoint = function (mouseEvent) {
        var video = angular.element(mouseEvent.toElement);
        video[0].pause();
        $scope.elementInfo.current_time = video[0].currentTime;
        if (!mouseEvent){
            mouseEvent = window.event;
        }

        if (mouseEvent.pageX || mouseEvent.pageY){
            $scope.elementInfo.left = mouseEvent.pageX;
            $scope.elementInfo.top = mouseEvent.pageY;
        }
        else if (mouseEvent.clientX || mouseEvent.clientY){
            $scope.elementInfo.left = mouseEvent.clientX + document.body.scrollLeft +
                document.documentElement.scrollLeft;
            $scope.elementInfo.top = mouseEvent.clientY + document.body.scrollTop +
                document.documentElement.scrollTop;
        }

        // if (mouseEvent.target){
        //     var offEl = mouseEvent.target;
        //     var offX = 0;
        //     var offY = 0;
        //     if (typeof(offEl.offsetParent) != "undefined"){
        //         while (offEl){
        //             offX += offEl.offsetLeft;
        //             offY += offEl.offsetTop;
        //             offEl = offEl.offsetParent;
        //         }
        //     }
        //     else{
        //         offX = offEl.left;
        //         offY = offEl.top;
        //     }
        //
        //     $scope.elementInfo.left -= offX;
        //     $scope.elementInfo.top -= offY;
        // }
    }
    //在热点队列中加热点
    $scope.add_point = function () {
        $scope.hot_points.push($scope.elementInfo);
    }
})

app.directive('videoControl',function () {
    return {
        restrict : 'A',
        controller : 'topic_controller',
        link : function (scope, element, attrs, topic_controller) {
            scope.elementInfo.video_id = attrs.id;
        }
    }
})

app.directive('videoCustomer', function () {
    return {
        restrict : 'AE',
        template :
            // '<script>\
            //     var options0={\
            //     video_id : {{elementInfo.video_id}},\
            //     tag_top : {{elementInfo.left}},\
            //     tag_left : {{elementInfo.top}},\
            //     tag_color : "#e06b9c",\
            //     tag_size : "25",\
            //     tag_img_src : {{elementInfo.pic}},\
            //     inform_img_src : "pedia1.jpg",\
            //     inform_txt : "25日出生于出生韩国首尔，韩国女演员。1999年KBS电视剧《学校2》出道。2009年凭《郎在远方》获第46届韩国电影大钟奖最佳女主角；2010年凭借《深夜的FM》获第31届韩国青龙奖最佳女主角；",\
            //     inform_name : "秀爱",\
            //     tag_showtime : "1",\
            //     opensite : "{{elementInfo.link}}\
            // };\
            // </script>\
            '<script src="js/demo.js">'
    }
})

app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, ngModel) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function(event){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                    //附件预览
                    scope.file = (event.srcElement || event.target).files[0];
                    scope.getFile();
                });
            }
        };
    }]);

app.factory('fileReader', ["$q", "$log", function($q, $log){
        var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            return reader;
        };

        var readAsDataURL = function (file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);
            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };
    }]);
