/**
 * Created by zhangyaqiang on 2017/4/26.
 */
var app = angular.module('App', []);

var pre_url = 'http://www.smartvideo.tech:3000/';

app.controller('emailConfirm', ['$scope', '$http', '$interval', '$location', function ($scope, $http, $interval, $location) {
	$scope.left_time = 5;
	var countdown = function () {
		timePromise = $interval(function(){
			$scope.left_time -= 1;
			if($scope.left_time == 0){
				window.location = pre_url;
			}
		}, 1000, 100);
		return timePromise;
	};
	countdown();
}]);