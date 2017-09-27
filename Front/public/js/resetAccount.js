/**
 * Created by zhangyaqiang on 2017/4/26.
 */
var app = angular.module('App', []);

var pre_url = 'http://www.smartvideo.tech:3000/';

app.controller('resetAccount', ['$scope', '$http', function ($scope, $http) {
	$scope.password = '';
	$scope.pwd_confirm = '';
	$scope.reset_error = false;
	$scope.error_content = '';
	$scope.reset_sended = false;
	$scope.cancel_error = function () {
		$scope.reset_error = false;
	};
	$scope.reset_submit = function () {
		if ($scope.password == ''){
			$scope.reset_error = true;
			$scope.error_content = '密码不能为空';
		}
		else if($scope.password.length < 6){
			$scope.reset_error = true;
			$scope.error_content = '密码长度不能小于6位';
		}
		else if($scope.password != $scope.pwd_confirm){
			$scope.reset_error = true;
			$scope.error_content = '两次密码不一致';
		}
		else {
			$http({method: 'POST', url: pre_url+'user/login', data: $scope.password})
				.then(function success(response) {
					console.log(response.data);
					if (response.data.status == 0){

						//修改成功
						$scope.reset_sended = ture;
					}
				},function error() {
					$scope.reset_error = true;
					$scope.error_content = '链接错误';
				})
		}
	};
	
}]);