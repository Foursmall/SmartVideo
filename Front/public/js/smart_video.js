/**
 * Created by zhangyaqiang on 2017/1/11.
 */
var app = angular.module('App', ['angular-popups', 'ngFileUpload', 'angular-slidezilla', 'ui.bootstrap']);

var deafult_project = {project_name: 'Test', project_id: 000001};

var pre_url =PRE_URL;
//总体控制器
app.controller('MyController', ['$scope', '$rootScope', '$http', 'fileReader', function ($scope, $rootScope, $http, fileReader) {
	$rootScope.sta = 'Index';
	$rootScope.showIndex = function () {
		$rootScope.sta = 'Index';
	};
	$rootScope.showConsole = function () {
		if ($scope.projects.length != 0 && $rootScope.User != null){
			$rootScope.sta = 'Console';
		}
		else if ($rootScope.User != null){
			$rootScope.sta = 'Projects';
		}
		else{
			$rootScope.sta = 'Login';
		}
	};
	$rootScope.showLogin = function () {
		$rootScope.sta = 'Login';
	};
	$rootScope.showRegister = function () {
		$rootScope.sta = 'Register';
	};
	$rootScope.showProjects = function () {
		$rootScope.sta = 'Projects';
	};
	$rootScope.showFindPwd = function () {
		$rootScope.sta = 'FindPwd';
	};
	$rootScope.User = null;
	$rootScope.isAuthenticated = false;
	$rootScope.token = '';
	//项目信息 [{'project_id': xxx, 'project_name': xxx}, {'project_id': xxx, 'project_name': xxx}]
	$scope.projects = [];
	$scope.elementInfo = [];
	//当前项目
	$scope.current_project = {project_name: 'Test', project_id: 000001};
	$scope.getproject = function () {
		$http({method: 'GET', url: pre_url+'project/getProjects', data: '',
				headers: {'x-access-token': $rootScope.token}})
			.then(function success(response) {
				console.log(response.data);
				$scope.projects = response.data.result;
				for (pro in $scope.projects) {
					pro.created = Date.parse(pro.created);
				}
				if ($scope.projects.length == 0) {
					$scope.current_project = {};
				}else {
					$scope.current_project = $scope.projects[0];
					$scope.project_info();
				}
			},function error(data, status, headers, config) {
				consolfae.log('error');
			});
	};
	$scope.change_project = function (project) {
		$scope.current_project = project;
		$scope.elementInfo = [];
		//切换项目时刷新数据
		$scope.project_info();
	};
	//获取项目信息
	$scope.project_info = function () {
		$http({method: 'GET', url: pre_url+'api/getProjectAttributes/'+$scope.current_project.project_id,
				headers: {'x-access-token': $rootScope.token}})
			.then(function success(response) {
				console.log(111,response.data);
				//获取所有项目信息
				for (ele in response.data.result){
					e = response.data.result[ele];
					//分类
					switch(e.kind) {
						case 1:
							var temp = {_Id: '' , kind: '',title:'', options:[], color: '', video_id: '', current_time: '', pic: '',
								start_time:'', end_time: '', link: '', left :'', top: '', voted: false, answer: -1, sta_info: [],dur_time:[]};
							temp._Id = e._id;
							temp.kind = '话题投票';
							temp.title = e.titles[0];
							temp.color = e.colors[0];
							temp.name = e.name;
							temp.current_time = Number(e.times[0]);
							temp.pic = pre_url+e.images[0];
							temp.link = e.links[0];
							temp.left = e.positions[0].l;
							temp.top = e.positions[0].t;
							temp.options = e.texts;
							temp.start_time = e.times[1];
							temp.end_time = e.times[2];
							temp.dur_time = e.sizes[0];
							var element = $.extend(true, {}, temp);
							$scope.elementInfo.push(element);
							break;
						case 2:
							var temp = {_Id: '' , kind: '',title:'', pic: '', link: '', positions: [], times: [], name: ''};
							temp._Id = e._id;
							temp.kind = '云图云窗';
							temp.title = e.titles[0];
							temp.name = e.name;
							temp.pic = pre_url+e.images[0];
							temp.link = e.links[0];
							temp.positions = e.positions;
							for(t in e.times){
								e.times[t] = Number(e.times[t]);
							}
							temp.times = e.times;
							var element = $.extend(true, {}, temp);
							$scope.elementInfo.push(element);
							break;
						case 3:
							var temp = {_Id: '' , kind: '',title:'', pic: '', link: '', color:'', positions: [], times: [], name: '', description: '', show: false};
							temp._Id = e._id;
							temp.kind = '广告云窗';
							temp.title = e.titles[0];
							temp.description = e.description;
							temp.name = e.name;
							temp.pic = pre_url+e.images[0];
							temp.link = e.links[0];
							temp.color = Number(e.colors[0]);
							temp.positions = e.positions;
							for(t in e.times){
								e.times[t] = Number(e.times[t]);
							}
							temp.times = e.times;
							var element = $.extend(true, {}, temp);
							$scope.elementInfo.push(element);
							break;
					}
				}
			},function error() {
				console.log('error');
			})
	};

	$scope.element_info = function () {
		var data = $scope.current_project.project_id;
		$http({method: 'POST', url: pre_url+'project/getAttributes', data: $scope.current_project})
			.then(function success(response) {
				console.log('elementAdmin');
				$scope.elements = response.data;
			},function error() {
				console.log('error');
			})
	};
	$scope.logout = function () {
		$http({method: 'GET', url: pre_url+'user/logout',
			headers: {'Content-Type': 'application/left-www-form-urlencoded',
				'x-access-token': $rootScope.token}})
			.then(function success(response,data, status, headers, config) {
				if (response.data.status == 0){
					$rootScope.User = null;
					$rootScope.isAuthenticated = false;
					$scope.loginerror = false;
					$scope.projects = [];
					//登出项目清空
					$scope.current_project = {};
					$rootScope.token = '';
					console.log('logout');
					$rootScope.sta = 'Index';
				}
			},function error(data, status, headers, config) {
				console.log('logout error!');
			})
	};

	//创建新项目
	$scope.new_project = {project_name: '', project_id: '', description: ''};
	$scope.create_success_1 = true;
	$scope.create_project = function () {
		// temp = {project_name: $scope.new_project.project_name};
		// var p = $.extend(true, {}, temp);
		// $scope.projects.push(p);
		$http({method: 'POST', url: pre_url+'project/create',
			data: {project_name: $scope.new_project.project_name, description: $scope.new_project.description},
			headers:{'x-access-token': $rootScope.token}})
			.then(function success(response) {
				console.log(response.data);
				temp = {project_name: $scope.new_project.project_name, project_id: response.data.result._id,created:Date.parse(response.data.result.created)};
				var p = $.extend(true, {}, temp);
				$scope.projects.push(p);
				$scope.change_project(p);
				// $scope.change_project({project_name: $scope.new_project.project_name, project_id: response.data.result._Id});
			},function error() {
				console.log('create error');
			})
	};
	//
	$scope.player;

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
	function pausecomp(millis)
	{
		var date = new Date();
		var curDate = null;
		do { curDate = new Date(); }
		while(curDate-date < millis);
	}


	$scope.player_info = function () {
		setTimeout(function(){
			var video_id = document.getElementById('ad_photo_video');
			$scope.player = {top: getElementTop(video_id), left: getElementLeft(video_id), width: video_id.offsetWidth, height: video_id.offsetHeight}
		}, 300);
		var video_id = document.getElementById('ad_photo_video');
		console.log(getElementTop(video_id));
		console.log(getElementLeft(video_id));
		console.log(video_id.videoWidth);
		console.log(video_id.videoHeight);
		window.onresize = function () {
			$scope.player = {top: getElementTop(video_id), left: getElementLeft(video_id), width: video_id.offsetWidth, height: video_id.offsetHeight}
			console.log($scope.player);
		}
	}
}]);

//项目预览
app.controller('projectPreview', ['$scope', function ($scope) {
	function randomData(num) {
		return Math.round(Math.random()*num);
	};
	$scope.play_count = randomData(10000);
	$scope.hot_expose = randomData(1000);
	$scope.hot_click = randomData(1000);
	$scope.link_expose = randomData(1000);
	$scope.month_play_count = randomData(1000);
	$scope.sum_play_count = randomData(10000);
	$scope.sum_hot_click = randomData(10000);
	$scope.link_click = randomData(1000);
	
	$scope.page = 1;
	$scope.pre_page = function () {
		$scope.page = $scope.page-1;
	};
	$scope.next_page = function () {
		$scope.page = $scope.page + 1;
	};
	$scope.page1 = [
		{num: 1,name:'北京',sum: randomData(10000), width: 40},
		{num: 2,name:'天津',sum: randomData(7500), width: 30},
		{num: 3,name:'河北',sum: randomData(5000), width: 20},
		{num: 4,name:'山东',sum: randomData(12500), width: 10},
		{num: 5,name:'内蒙',sum: 0, width: 0},
		{num: 6,name:'辽宁',sum: 0, width: 0},
		{num: 7,name:'吉林',sum: 0, width: 0},
		{num: 8,name:'黑龙江',sum: 0, width: 0},
		{num: 9,name:'上海',sum: 0, width: 0},
		{num: 10,name:'江苏',sum: 0, width: 0}
		];
	$scope.page2 = [
		{num: 11,name:'浙江',sum: 0, width: 0},
		{num: 12,name:'安徽',sum: 0, width: 0},
		{num: 13,name:'福建',sum: 0, width: 0},
		{num: 14,name:'江西',sum: 0, width: 0},
		{num: 15,name:'河南',sum: 0, width: 0},
		{num: 16,name:'湖南',sum: 0, width: 0},
		{num: 17,name:'湖北',sum: 0, width: 0},
		{num: 18,name:'广东',sum: 0, width: 0},
		{num: 19,name:'广西',sum: 0, width: 0},
		{num: 20,name:'山西',sum: 0, width: 0}
	];
	$scope.page3 = [
		{num: 21,name:'海南',sum: 0, width: 0},
		{num: 22,name:'重庆',sum: 0, width: 0},
		{num: 23,name:'四川',sum: 0, width: 0},
		{num: 24,name:'贵州',sum: 0, width: 0},
		{num: 25,name:'云南',sum: 0, width: 0},
		{num: 26,name:'西藏',sum: 0, width: 0},
		{num: 27,name:'陕西',sum: 0, width: 0},
		{num: 28,name:'甘肃',sum: 0, width: 0},
		{num: 29,name:'青海',sum: 0, width: 0},
		{num: 30,name:'宁夏',sum: 0, width: 0}
	];
	$scope.page4 = [
		{num: 31,name:'新疆',sum: 0, width: 0},
		{num: 32,name:'台湾',sum: 0, width: 0},
	];
}]);

//栏目统计
app.controller('columnSta', ['$scope', function ($scope) {
	function randomData(num) {
		return Math.round(Math.random()*num);
	};
	$scope.play_count = randomData(10000);
	$scope.hot_expose = randomData(1000);
	$scope.hot_click = randomData(1000);
	$scope.link_expose = randomData(1000);
	$scope.month_play_count = randomData(1000);
	$scope.sum_play_count = randomData(10000);
	$scope.sum_hot_click = randomData(10000);
	$scope.link_click = randomData(1000);

	$scope.page = 1;
	$scope.pre_page = function () {
		$scope.page = $scope.page-1;
	};
	$scope.next_page = function () {
		$scope.page = $scope.page + 1;
	};
	$scope.page1 = [
		{num: 1,name:'北京',sum: randomData(10000), width: 40},
		{num: 2,name:'天津',sum: randomData(7500), width: 30},
		{num: 3,name:'河北',sum: randomData(5000), width: 20},
		{num: 4,name:'山东',sum: randomData(12500), width: 10},
		{num: 5,name:'内蒙',sum: 0, width: 0},
		{num: 6,name:'辽宁',sum: 0, width: 0},
		{num: 7,name:'吉林',sum: 0, width: 0},
		{num: 8,name:'黑龙江',sum: 0, width: 0},
		{num: 9,name:'上海',sum: 0, width: 0},
		{num: 10,name:'江苏',sum: 0, width: 0}
	];
	$scope.page2 = [
		{num: 11,name:'浙江',sum: 0, width: 0},
		{num: 12,name:'安徽',sum: 0, width: 0},
		{num: 13,name:'福建',sum: 0, width: 0},
		{num: 14,name:'江西',sum: 0, width: 0},
		{num: 15,name:'河南',sum: 0, width: 0},
		{num: 16,name:'湖南',sum: 0, width: 0},
		{num: 17,name:'湖北',sum: 0, width: 0},
		{num: 18,name:'广东',sum: 0, width: 0},
		{num: 19,name:'广西',sum: 0, width: 0},
		{num: 20,name:'山西',sum: 0, width: 0}
	];
	$scope.page3 = [
		{num: 21,name:'海南',sum: 0, width: 0},
		{num: 22,name:'重庆',sum: 0, width: 0},
		{num: 23,name:'四川',sum: 0, width: 0},
		{num: 24,name:'贵州',sum: 0, width: 0},
		{num: 25,name:'云南',sum: 0, width: 0},
		{num: 26,name:'西藏',sum: 0, width: 0},
		{num: 27,name:'陕西',sum: 0, width: 0},
		{num: 28,name:'甘肃',sum: 0, width: 0},
		{num: 29,name:'青海',sum: 0, width: 0},
		{num: 30,name:'宁夏',sum: 0, width: 0}
	];
	$scope.page4 = [
		{num: 31,name:'新疆',sum: 0, width: 0},
		{num: 32,name:'台湾',sum: 0, width: 0},
	];
}]);
//登录模块
app.controller('Login', ['$scope', '$rootScope', '$http', '$window', function ($scope, $rootScope, $http, $window) {
	$scope.user = {username: "", password: "", phone: ""};
	$scope.login_error = false;
	$scope.welclome = '';
	$scope.message = '';
	$scope.loginWay = 'em';
	$scope.error_content = '';
	$scope.cancel_error = function () {
		$scope.login_error = false;
	};
	$scope.change_em = function () {
		$scope.loginWay = 'em';
	};
	$scope.change_phone = function () {
		$scope.loginWay = 'phone';
	};

	//原始方法
	$scope.submit = function () {
		$http({method: 'POST', url: pre_url+'user/login', data: $scope.user,
			headers: {'x-access-token': $rootScope.token}})
			.then(function success(response,data, status, headers, config) {
				console.log(response.data);
				if (response.data.status == 0){
					$rootScope.User = $scope.user.username;
					$rootScope.isAuthenticated = true;
					$rootScope.token = response.data.token;
					$scope.getproject();
					console.log('登录成功');
					$rootScope.sta = 'Index';
				}
				else if(response.data.status == 9){
					$scope.login_error = true;
					$scope.error_content = '账号未注册';
				}
				else if(response.data.status == 8.1){
					$scope.login_error = true;
					$scope.error_content = '邮箱未验证';
				}
				else if(response.data.status == 6){
					$scope.login_error =true;
					$scope.error_content = '密码错误';
				}
			},function error(data, status, headers, config) {
				$scope.login_error = true;
				$scope.error_content = '链接错误';
			})
	};
}]);

//注册模块
app.controller('Register', ['$scope', '$rootScope', '$http', '$window', '$interval', function ($scope, $rootScope, $http, $window, $interval) {
	$scope.em_register = {email: '', password:''};
	$scope.phone_register = {phone: '', password: ''};
	$scope.pwd_confirm = '';
	$scope.register_error = false;
	$scope.em_method = true;
	$scope.em_sended = false;
	$scope.pwd_inconsistent = true;
	$scope.error_content = '';

	//图片验证码
	$scope.code_verify = '';
	$scope.code = '';
	$scope.createCode = function () {
		$scope.code = '';
		var codeLength = 6; //验证码的长度
		var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
			'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
			'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
		for (var i = 0; i < codeLength; i++)
		{
			var charNum = Math.floor(Math.random() * 52);
			$scope.code += codeChars[charNum];
		}
	};




	$scope.cancel_error = function () {
		if($scope.register_error == true){
			$scope.createCode();
		}
		$scope.register_error = false;
	};
	$scope.change_phone = function () {
		$scope.em_method = false;
		$scope.createCode();
	};
	$scope.change_em = function () {
		$scope.em_method = true;
	};
	//倒计时
	$scope.left_time = 5;
	var countdown = function () {
		timePromise = $interval(function(){
			$scope.left_time -= 1;
			if($scope.left_time == 0){
				$scope.showLogin();
			}
		}, 1000, 100);
		return timePromise;
	};

	function emailCheck(emailAddr)
	{
		if((emailAddr == null) || (emailAddr.length < 2)) return false ;
		// 需出现'@',且不在首字符.
		var aPos = emailAddr.indexOf("@" ,1) ;
		if(aPos < 0)
		{
			return false ;
		}
		// '@'后出现'.',且不紧跟其后.
		if(emailAddr.indexOf("." ,aPos+2) < 0)
		{
			return false ;
		}
		return true ;
	}

	$scope.em_submit = function () {
		if($scope.em_register.email == ''){
			console.log(22);
			$scope.register_error = true;
			$scope.error_content = '邮箱不能为空';
		}
		else if(!emailCheck($scope.em_register.email)){
			$scope.register_error = true;
			$scope.error_content = '邮箱格式错误';
		}
		else if ($scope.em_register.password != $scope.pwd_confirm){
			$scope.register_error = true;
			$scope.error_content = '密码不一致';
		}
		else if($scope.em_register.password.length < 6){
			$scope.register_error = true;
			$scope.error_content = '密码最短6位';
		}
		else{
			console.log('register');
			console.log($scope.em_register);
			$scope.left_time = 5;
			$http({method: 'POST', url: pre_url+'user/registerByemail', data:$scope.em_register,
				headers: {'x-access-token': $rootScope.token}})
				.then(function success(response) {
					console.log(response.data);
					if (response.data.status == 0 ||response.data.status == 7){
						$scope.em_sended = true;
						countdown();
					}
					else if(response.data.status == 8){
						$scope.register_error = true;
						$scope.error_content = '邮箱已注册';
					}
					else if(response.data.status == 8.1){
						$scope.register_error = true;
						$scope.error_content = '邮箱已注册未验证';
					}
					else{
						$scope.register_error = true;
						$scope.error_content = '连接错误';
					}
				},function error() {
					$scope.register_error = true;
					$scope.error_content = '邮箱已存在';
				})
		}
	};


	//短信验证码
	$scope.sm_error = false;
	$scope.sm_code = '';
	$scope.sm_error_time = 60;
	$scope.sm_error_content = '';

	var sm_countdown = function () {
		Promise = $interval(function(){
			$scope.sm_error_time -= 1;
			if($scope.sm_error_time == 0){
				$scope.sm_error = false;
			}
		}, 1000, 100);
		return Promise;
	};
	$scope.send_sm = function () {
			$http({method: 'POST', url: pre_url+'user/sendSMS', data:{phone: $scope.phone_register.phone}})
				.then(function success(response) {
					console.log(response.data);
					if (response.data.status == 0){
						$scope.sm_error = true;
						$scope.sm_error_content = '已发送';
						$scope.sm_error_time = 60;
						sm_countdown();
						$scope.token = response.data.token;
					}
					else if(response.data.status == 10.1){
						$scope.sm_error = true;
						$scope.sm_error_content = '手机已注册';
						$scope.sm_error_time = 60;
						sm_countdown();
					}
					else if(response.data.status == 11.1){
						$scope.sm_error = true;
						$scope.sm_error_content = '号码不存在';
						$scope.sm_error_time = 60;
						sm_countdown();
					}
					else if(response.data.status == 11.2){
						$scope.sm_error = true;
						$scope.sm_error_content = '手机号码为空';
						$scope.sm_error_time = 60;
						sm_countdown();
					}
					else if(response.data.status == 11.5){
						$scope.sm_error = true;
						$scope.sm_error_content = '一小时内只能验证三次';
						$scope.sm_error_time = 60;
						sm_countdown();
					}
					else if(response.data.status == 11.7){
						$scope.sm_error = true;
						$scope.sm_error_content = '号码格式错误';
						$scope.sm_error_time = 60;
						sm_countdown();
					}
					// else if(response.data.status == )
				},function error() {
					$scope.sm_error = true;
					$scope.sm_error_content = '连接错误';
					console.log('send error');
				});

	};
	$scope.phone_submit = function () {
		if($scope.phone_register.phone == ''){
			$scope.register_error = true;
			$scope.error_content = '手机号不能为空';
		}
		else if($scope.phone_register.phone.length != 11){
			console.log($scope.phone_register.phone.length);
			$scope.register_error = true;
			$scope.error_content = '手机号码位数不对';
		}
		else if($scope.code_verify != $scope.code){
			$scope.register_error = true;
			$scope.error_content = '图片验证码错误';
		}
		else{
			$scope.left_time = 5;
			$http({method: 'POST', url: pre_url+'user/registerByphone', data:{phone: $scope.phone_register.phone, password:$scope.phone_register.password, verify_code:$scope.sm_code},
				headers: {'x-access-token': $scope.token}})
				.then(function success(response) {
					console.log(response.data);
					if (response.data.status == 0){
						$rootScope.User = $scope.phone_register.phone;
						$rootScope.isAuthenticated = true;
						$rootScope.token = response.data.token;
						$scope.getproject();
						$rootScope.sta = 'Index';
					}
					else if(response.data.status == 10.1){
						$scope.register_error = true;
						$scope.error_content = '手机号码已注册';
					}
					else if(response.data.status == 11.3){
						$scope.register_error = true;
						$scope.error_content = '验证码错误';
					}

				},function error() {
					$scope.register_error = true;
					$scope.error_content = '连接错误';
				})
		}
	}
}]);

//找回密码
app.controller('FindPwd', ['$scope', '$rootScope', '$http', '$interval' ,function ($scope, $rootScope, $http, $interval) {
	$scope.email = '';
	$scope.find_error = false;
	$scope.disabled = '';
	$scope.left_time = 60;
	$scope.email_back = true;
	$scope.error_content = '';

	var countdown = function () {
		Promise = $interval(function(){
			$scope.left_time -= 1;
			if($scope.left_time == 0){
				$scope.timeout = false;
				$scope.disabled = '';
			}
		}, 1000, 100);
		return Promise;
	};

	$scope.cancel_error = function () {
		$scope.find_error = false;
		$scope.phone_find_error = false;
	};
	
	$scope.phone_find = function () {
		$scope.email_back = false;
	};

	$scope.email_find = function () {
		$scope.email_back = true;
	};

	$scope.findback_submit = function () {
		if ($scope.email == ''){
			$scope.find_error = true;
			$scope.error_content = '邮箱不能为空'
		}
		else {
			$http({method: 'POST', url: pre_url+'user/getPasswordByEmail', data:{email:$scope.email}})
				.then(function success(response) {
					console.log(response.data);
					if (response.data.status == 0){
						$scope.left_time = 60;
						$scope.disabled = 'disabled';
						countdown();
					}
					else if(response.data.status == 9){
						$scope.find_error = true;
						$scope.error_content = '邮箱还未注册';
					}
				},function error() {
					$scope.find_error = true;
					$scope.error_content = '连接错误';
				})
		}
	};

	var sm_countdown = function () {
		Promise = $interval(function(){
			$scope.sm_error_time -= 1;
			if($scope.sm_error_time == 0){
				$scope.sm_error = false;
			}
		}, 1000, 100);
		return Promise;
	};


	$scope.phone = '';
	$scope.sm_code = '';
	$scope.sm_error = '';
	$scope.token = '';
	$scope.sm_error_time = '';
	$scope.send_sm = function () {
		$http({method: 'POST', url: pre_url+'user/upadatePassword_sendSMS', data:{phone: $scope.phone}})
			.then(function success(response) {
				console.log(response.data);
				if (response.data.status == 0){
					$scope.sm_error = true;
					$scope.sm_error_content = '已发送';
					$scope.sm_error_time = 60;
					sm_countdown();
					$scope.token = response.data.token;
				}
				else if(response.data.status == 15){
					$scope.sm_error = true;
					$scope.sm_error_content = '一小时内不得超过三次';
					$scope.sm_error_time = 60;
					sm_countdown();
				}
				else if(response.data.status == 3.1){
					$scope.sm_error = true;
					$scope.sm_error_content = '手机号码有误';
					$scope.sm_error_time = 60;
					sm_countdown();
				}
				else if(response.data.status == 11.2){
					$scope.sm_error = true;
					$scope.sm_error_content = '账号未注册';
					$scope.sm_error_time = 60;
					sm_countdown();
				}
			},function error() {
				$scope.sm_error = true;
				$scope.sm_error_content = '连接错误';
				console.log('send error');
			});
	};

	var find_countdown = function () {
		Promise = $interval(function(){
			$scope.left_time -= 1;
			if($scope.left_time == 0){
				$scope.showIndex();
			}
		}, 1000, 100);
		return Promise;
	};
	$scope.find_success = false;
	$scope.password = '';
	$scope.pwd_confirm = '';
	$scope.phone_find_error =false;
	$scope.phone_error_content = '';
	$scope.phonefind_submit = function () {
		if($scope.password != $scope.pwd_confirm){
			$scope.phone_find_error = true;
			$scope.phone_error_content = '密码不一致';
		}
		else if($scope.password.length < 6){
			$scope.phone_find_error = true;
			$scope.phone_error_content = '密码不能少于6位'
		}
		else if($scope.phone.length != 11){
			$scope.phone_find_error = true;
			$scope.phone_error_content = '手机号码格式不对'
		}
		else{

			$http({method: 'POST', url: pre_url+'user/resetPassword_phone', data:{phone: $scope.phone, password:$scope.password, verify_code:$scope.sm_code},
				headers: {'x-access-token': $scope.token}})
				.then(function success(response) {
					console.log(response.data);
					if (response.data.status == 0){
						$rootScope.User = $scope.phone;
						$rootScope.isAuthenticated = true;
						$rootScope.token = response.data.token;
						$scope.getproject();
						$scope.find_success = true;
						$scope.left_time = 5;
						find_countdown();
					}
					else if(response.data.status == 11.3){
						$scope.phone_find_error = true;
						$scope.phone_error_content = '验证码错误';
					}
					else if(response.data.status == 15){
						$scope.phone_find_error = true;
						$scope.phone_error_content = '密码更改失败';
					}
					else if(response.data.status == 16){
						$scope.phone_find_error = true;
						$scope.phone_error_content = '用户不存在';
					}
					else{
						$scope.phone_find_error = true;
						$scope.phone_error_content = '密码更改失败';
					}
				},function error() {
					$scope.register_error = true;
					$scope.error_content = '连接错误';
				})
		}
	}
}]);

//用户信息模块
app.controller('UserInfo', ['$scope', 'rootScope', '$http'], function ($scope, $rootScope, $http) {

});

//数据统计
app.controller('dataSta', ['$scope', '$rootScope', '$http', function ($scope, $rootScope) {
	function randomData(num) {
		return Math.round(Math.random()*num);
	};
	$scope.play_count = randomData(10000);
	$scope.hot_expose = randomData(1000);
	$scope.hot_click = randomData(1000);
	$scope.link_expose = randomData(1000);
	$scope.month_play_count = randomData(1000);
	$scope.link_click = randomData(1000);
	$scope.hot_change = randomData(100);
	$scope.link_click_rate = randomData(100);
	$scope.data_inter = randomData(1000);
}]);

//元素管理
app.controller('elementAdmin', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	
	$scope.data = {pic: '/images/banner.png'};
	$scope.delete = function (id) {
		for (ele in $scope.elementInfo){
			if($scope.elementInfo[ele]._Id == id){
				// var index = i;
				break;
			}
		}
		$http({method:'POST', url: pre_url+'element/delete', data: {element_Id: id},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success(response) {
				$scope.elementInfo.splice(ele,1);
			},function error() {

			})
	}
	
}]);

//话题投票模块
app.controller('topicVote', ['$scope', '$rootScope', '$http', 'fileReader', 'Upload',function ($scope, $rootScope, $http, fileReader, Upload) {
	$scope.video_url = 'video/sample.mp4';
	$scope.url = '';
	$scope.dur_time = 5;
	$scope.seturl = function () {
		$scope.video_url = $scope.url;
	};
	$scope.default_pic = 'images/banner/banner_1.png';
	$scope.pic_name = '';
	$scope.pic_file = null;
	$scope.current_pattern = {_Id: '' , kind: 1,title:'who?', options:['me', 'you'], name: '', color: '0', video_id: '1', current_time: '', pic: 'images/banner/banner_1.png',
		start_time: 0, end_time: 0, link: 'www.baidu.com', left :300, top: 300, voted: false, answer: -1, sta_info: [],dur_time:5};

	//按钮是否显示
	$scope.btn_show = false;

	//投票问题增减
	$scope.delete_option = function (index) {
		$scope.current_pattern.options.splice(index,1)
	};
	$scope.add_option = function (vote) {
		$scope.current_pattern.options.push("answer")
	};

	//计算位置
	$scope.add_hotpoint = function (mouseEvent) {
		var video = angular.element(mouseEvent.toElement);
		video[0].pause();
		var width = video[0].width;
		var height = video[0].height;
		$scope.current_pattern.current_time = video[0].currentTime;
		if (!mouseEvent){
			mouseEvent = window.event;
		}

		if (mouseEvent.pageX || mouseEvent.pageY){
			$scope.current_pattern.left = mouseEvent.pageX;
			$scope.current_pattern.top = mouseEvent.pageY;
		}
		else if (mouseEvent.clientX || mouseEvent.clientY){
			$scope.current_pattern.left = mouseEvent.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			$scope.current_pattern.top = mouseEvent.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
		}

		if (mouseEvent.target){
		    var offEl = mouseEvent.target;
		    var offX = 0;
		    var offY = 0;
		    if (typeof(offEl.offsetParent) != "undefined"){
		        while (offEl){
		            offX += offEl.offsetLeft;
		            offY += offEl.offsetTop;
		            offEl = offEl.offsetParent;
		        }
		    }
		    else{
		        offX = offEl.left;
		        offY = offEl.top;
		    }

		    $scope.current_pattern.left -= offX;
		    $scope.current_pattern.top -= offY;
		}
	};

	//更新banner图片
	$scope.getFile = function () {
		fileReader.readAsDataUrl($scope.file, $scope)
			.then(function (result) {
				$scope.current_pattern.pic = result;
			})
	};

	//获取播放器播放信息
	var video_id = document.getElementById('topic_vote_video');
	video_id.ontimeupdate=function(){tagtime_judge(this)};
	function tagtime_judge(event)
	{
		$scope.time = event.currentTime;
		$scope.$digest();
	}

	//确认添加元素
	$scope.add_element =function () {
		$scope.current_pattern.dur_time = $scope.dur_time;
		var p = $.extend(true, {}, $scope.current_pattern);
		temp = {colors: [],images: [], kind: '', links: [], name: [],
			positions: [], texts: [], times: [], titles: [], _id: '',show_count:''};
		temp.colors.push($scope.current_pattern.color);
		// if ($scope.pic_file != null){
		// 	temp.images.push($scope.current_pattern.name);
		// }
		temp.kind = $scope.current_pattern.kind;
		temp.links.push($scope.current_pattern.link);
		temp.positions.push({t: $scope.current_pattern.top,l: $scope.current_pattern.left,w: 0, h: 0});
		temp.texts = $scope.current_pattern.options;
		temp.times.push($scope.current_pattern.current_time);
		temp.times.push($scope.current_pattern.start_time);
		temp.times.push($scope.current_pattern.end_time);
		temp.name = $scope.current_pattern.name;
		temp.show_count = $scope.dur_time;
		temp.titles.push($scope.current_pattern.title);
		console.log(temp);
		all = {properties: temp, project_Id: $scope.current_project.project_id};
		$http({method:'POST', url:pre_url+'element/create', data:all,
			headers:{'x-access-token': $rootScope.token}})
			.then(function success(response) {
				console.log(response.data);
				temp._Id = response.data.result;
				p._Id = response.data.result;
				//发送选项数目
				len = $scope.current_pattern.options.length;
				$http({method: 'POST', url: pre_url+'element/updateVoteNum', data: {element_Id:response.data.result, num: len},
						headers: {'x-access-token': $rootScope.token}})
					.then(function success(response) {

					},function error() {

					});
				//上传图片
				if ($scope.pic_file != null){
					$scope.upload(response.data.result, $scope.pic_file, $scope.current_pattern.name);
				}
		},function error() {
				console.log('创建元素失败')
		});

		p.kind = '话题投票';

		$scope.elementInfo.push(p);
	};
	$scope.upload = function (_Id, file, name) {
		Upload.upload({url:pre_url+'image/upload',
			data:{element_Id: _Id, file_name: name, file: file}
		}).success(function (response) {

		}).error(function () {

		})
	};
}]);

//投票操作
app.controller('Vote', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

	$scope.vote = function (id) {
		for (ele in $scope.elementInfo){
			if($scope.elementInfo[ele]._Id == id){
				break;
			}
		}
		url = pre_url+'api/vote/' + id + '/' + $scope.elementInfo[ele].answer;
		$http({method:'POST', url: url})
			.then(function success(response) {
				var num = response.data.result.num;
				for(var i=0;i<num ;i++){
					$scope.elementInfo[ele].sta_info.push(response.data.result.data[i].count);
				}
				$scope.elementInfo[ele].voted = true;
				$scope.elementInfo[ele].sta_info[$scope.elementInfo[ele].answer] += 1;
			},function error() {

			})
	}
}]);

//项目管理模块
app.controller('ProjectManager',['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {
	$scope.gotoProjectPage = function (project) {
		console.log('goto');
		$scope.change_project(project);
		$rootScope.sta = 'Console';
	};
	
	//删除项目
	$scope.del_project;
	$scope.delete_project = function (event, id) {
		console.log('delete')
		for (p in $scope.projects) {
			if ($scope.projects[p].project_id == id) {
				$scope.del_project = p;
				break;
			}
		}
	};
	
	$scope.confirm_delete = function () {
		$http({method: 'POST', url: pre_url+'project/delete',
			data: {project_Id: $scope.projects[$scope.del_project].project_id},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success(response) {
				$scope.projects.splice(p, 1);
				if ($scope.projects.length == 0) {
					$scope.current_project = {};
				}else {
					$scope.current_project = $scope.projects[0];
					$scope.project_info();
				}
				$scope.change_project($scope.projects[0]);
			},function error() {
				
			})
	};
	
	//修改项目
	$scope.ed_project;
	$scope.ed_name = '';
	$scope.edit_project = function (event, id) {
		console.log('edit');
		$scope.ed_project = id;
		for (p in $scope.projects) {
			if ($scope.projects[p].project_id == id) {
				$scope.ed_project = p;
				break;
			}
		}
	};
	
	$scope.confirm_edit = function () {
		$http({method: 'POST', url: pre_url+'project/updateName',
			data: {project_Id: $scope.projects[$scope.ed_project].project_id,project_name:$scope.ed_name},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success(response) {
				console.log('edit success');
				$scope.projects[$scope.ed_project].project_name = $scope.ed_name;
			},function error() {
				console.log('edit error');
			})
	}
}]);

//云图
app.controller('cloudPicture', ['$scope', '$rootScope', 'fileReader', '$http', 'Upload', function ($scope, $rootScope, fileReader, $http, Upload) {
	$scope.video_url = 'video/sample.mp4';
	$scope.url = '';
	$scope.seturl = function () {
		$scope.video_url = $scope.url;
	};
	$scope.pic_file = null;
	$scope.new_element = {element_Id: '', kind: 2, name: '', pic:'', title: '', link: '', start_time: '', end_time: '', times: [], positions: [],dur_time:5};
	$scope.current_element_Id = false;
	$scope.dur_time = 5;
	$scope.position = {t: '', l: '', w: 0, h: 0};
	$scope.time = '';
	$scope.getFile = function () {
		fileReader.readAsDataUrl($scope.file, $scope)
			.then(function (result) {
				$scope.new_element.pic = result;
			})
	};

	//获取播放器播放信息
	var video_id = document.getElementById('cloud_photo_video');
	video_id.ontimeupdate=function(){tagtime_judge(this)};
	function tagtime_judge(event)
	{
		$scope.time = event.currentTime;
		$scope.$digest();
	}

	//创建新元素
	$scope.create_element = function () {
		if ($scope.pic_file == ''){
			window.alert('请先选择图片!');
		}
		else {
			$scope.new_element.dur_time = $scope.dur_time;
			var p = $.extend(true, {}, $scope.new_element);
			temp = {colors: [],images: [], kind: '', links: [], name: [],
			positions: [], sizes: [], texts: [], times: [], titles: [], _id: '',show_count: 0};
			temp.kind = $scope.new_element.kind;
			temp.links.push($scope.new_element.link);
			temp.name = $scope.new_element.name;
			temp.show_count = $scope.dur_time;
			all = {properties: temp, project_Id: $scope.current_project.project_id};

			$http({method: 'POST', url: pre_url+'element/create', data: all,
					headers: {'x-access-token': $rootScope.token}})
				.then(function success(response) {
					p._Id = response.data.result;
					upload(response.data.result, $scope.pic_file, $scope.new_element.name);
				},function error() {
					console.log('create cloud photo error')
				});
			p.kind = '云图云窗';
			$scope.elementInfo.push(p);
		}
	};

	//编辑元素信息
	$scope.edit_element = function (id) {
		for (ele in $scope.elementInfo){
			if ($scope.elementInfo[ele]._Id == id){
				break;
			}
		}
		$http({method: 'POST', url: pre_url+'element/updateName',
			data:{element_Id: $scope.elementInfo[ele], name: $scope.elementInfo[ele].name},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success() {
				console.log('update name');
			},function error() {

			});
		$http({method: 'POST', url: pre_url+'element/updateLinks',
			data:{element_Id: $scope.elementInfo[ele], index: [0], links: [$scope.elementInfo[ele].link()]},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success() {
				console.log('update link');
			},function error() {

			});
		$http({method: 'POST', url: pre_url+'element/updateTitles',
			data:{element_Id: $scope.elementInfo[ele], indexs:[0], titles: [$scope.elementInfo[ele].title]},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success() {
				console.log('update title');
			},function error() {

			});
	}
	
	//上传文件
	upload = function (_Id, file, name) {
		Upload.upload({url:pre_url+'image/upload',
			data:{element_Id: _Id, file_name: name, file: file},
		}).success(function () {

		}).error(function () {

		})
	};

	//计算位置
	$scope.add_hotpoint = function (mouseEvent) {
		var video = angular.element(mouseEvent.toElement);
		video[0].pause();
		var width = video[0].width;
		var height = video[0].height;
		$scope.show_time = video[0].currentTime;
		if (!mouseEvent){
			mouseEvent = window.event;
		}

		if (mouseEvent.pageX || mouseEvent.pageY){
			$scope.position.l = mouseEvent.pageX;
			$scope.position.t = mouseEvent.pageY;
		}
		else if (mouseEvent.clientX || mouseEvent.clientY){
			$scope.position.l = mouseEvent.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			$scope.position.t = mouseEvent.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
		}

		if (mouseEvent.target){
			var offEl = mouseEvent.target;
			var offX = 0;
			var offY = 0;
			if (typeof(offEl.offsetParent) != "undefined"){
				while (offEl){
					offX += offEl.offsetLeft;
					offY += offEl.offsetTop;
					offEl = offEl.offsetParent;
				}
			}
			else{
				offX = offEl.left;
				offY = offEl.top;
			}

			$scope.position.l -= offX;
			$scope.position.t -= offY;
		}
	};

	//选择元素
	$scope.change_element = function (ele) {
		console.log('change element');
		$scope.current_element_Id = ele;
	};

	//添加位置和时间信息
	$scope.add_element =function () {
		for (ele in $scope.elementInfo){
			if ($scope.elementInfo[ele]._Id == $scope.current_element_Id._Id){
				break;
			}
		}
		$http({method: 'POST', url: pre_url+'element/addTimes',
			data: {element_Id: $scope.current_element_Id._Id, times: [$scope.show_time]},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success(response) {
				var t = $scope.show_time;
				$scope.elementInfo[ele].times.push(t);
			},function error() {
				console.log('添加时间失败')
			});
		$http({method: 'POST', url: pre_url+'element/addPositions',
			data: {element_Id: $scope.current_element_Id._Id, positions: [$scope.position]},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success() {
				var p = $.extend(true, {}, $scope.position)
				$scope.elementInfo[ele].positions.push(p);
			},function error() {

			});
		console.log('云图创建成功');
		$scope.current_element_Id = false;
	}
}]);

//广告
app.controller('adPhoto',['$scope', '$rootScope', 'fileReader', '$http', 'Upload', function ($scope, $rootScope, fileReader, $http, Upload) {
	$scope.video_url = 'video/sample.mp4';
	$scope.url = '';
	$scope.seturl = function () {
		$scope.video_url = $scope.url;
	};
	$scope.pic_file = null;
	$scope.new_element = {element_Id: '', kind: 2, name: '', pic:'', title: '', link: '', times: [], positions: [], color: '0', show: false, description:'',dur_time:5};
	$scope.position = {t: '', l: '', w: 0, h: 0};
	$scope.time = '';
	$scope.dur_time = 5;
	$scope.current_element_Id = false;
	$scope.show;
	$scope.getFile = function () {
		fileReader.readAsDataUrl($scope.file, $scope)
			.then(function (result) {
				$scope.new_element.pic = result;
			})
	};

	//获取播放器播放信息
	var video_id = document.getElementById('ad_photo_video');
	video_id.ontimeupdate=function(){tagtime_judge(this)};
	function tagtime_judge(event)
	{
		$scope.time = event.currentTime;
		$scope.$digest();
	}
	
	
	$scope.create_element = function () {
		$scope.new_element.dur_time = $scope.dur_time;
		var p = $.extend(true, {}, $scope.new_element);
		temp = {colors: [],images: [], kind: '', links: [], name: [],
			positions: [], sizes: [], description: '', times: [], titles: [], _id: '',show_count:''};
		temp.kind = 3;
		temp.links.push($scope.new_element.link);
		temp.name = $scope.new_element.name;
		temp.titles.push($scope.new_element.title);
		temp.description= $scope.new_element.description;
		temp.colors.push($scope.new_element.color);
		temp.show_count = $scope.dur_time;
		all = {properties: temp, project_Id: $scope.current_project.project_id};

		$http({method: 'POST', url: pre_url+'element/create', data: all,
			headers: {'x-access-token': $rootScope.token}})
			.then(function success(response) {
				p._Id = response.data.result;
				upload(response.data.result, $scope.pic_file, $scope.new_element.name);
			},function error() {
				console.log('create ad photo error');
			});
		p.kind = '广告云窗';
		$scope.elementInfo.push(p);
	};

	//计算位置
	$scope.add_hotpoint = function (mouseEvent) {
		var video = angular.element(mouseEvent.toElement);
		video[0].pause();
		var width = video[0].width;
		var height = video[0].height;
		$scope.show_time = video[0].currentTime;
		if (!mouseEvent){
			mouseEvent = window.event;
		}

		if (mouseEvent.pageX || mouseEvent.pageY){
			$scope.position.l = mouseEvent.pageX;
			$scope.position.t = mouseEvent.pageY;
		}
		else if (mouseEvent.clientX || mouseEvent.clientY){
			$scope.position.l = mouseEvent.clientX + document.body.scrollLeft +
				document.documentElement.scrollLeft;
			$scope.position.t = mouseEvent.clientY + document.body.scrollTop +
				document.documentElement.scrollTop;
		}

		if (mouseEvent.target){
			var offEl = mouseEvent.target;
			var offX = 0;
			var offY = 0;
			if (typeof(offEl.offsetParent) != "undefined"){
				while (offEl){
					offX += offEl.offsetLeft;
					offY += offEl.offsetTop;
					offEl = offEl.offsetParent;
				}
			}
			else{
				offX = offEl.left;
				offY = offEl.top;
			}

			$scope.position.l -= offX;
			$scope.position.t -= offY;
		}
	};

	$scope.video_pause = function (id) {
		video_id.pause();
		for(ele in $scope.elementInfo){
			if($scope.elementInfo[ele]._Id == id){
				break;
			}
		}
		$scope.elementInfo[ele].show =true;
	};

	$scope.video_start = function (id) {
		video_id.play();
		for(ele in $scope.elementInfo){
			if($scope.elementInfo[ele]._Id == id){
				break;
			}
		}
		$scope.elementInfo[ele].show = false;
	};

	//编辑元素信息
	$scope.edit_element = function (id) {
		for (ele in $scope.elementInfo){
			if ($scope.elementInfo[ele]._Id == id){
				break;
			}
		}
		$http({method: 'POST', url: pre_url+'element/updateName',
			data:{element_Id: $scope.elementInfo[ele], name: $scope.elementInfo[ele].name},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success() {
				console.log('update name');
			},function error() {

			});
		$http({method: 'POST', url: pre_url+'element/updateLinks',
			data:{element_Id: $scope.elementInfo[ele], index: [0], links: [$scope.elementInfo[ele].link()]},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success() {
				console.log('update link');
			},function error() {

			});
		$http({method: 'POST', url: pre_url+'element/updateTitles',
			data:{element_Id: $scope.elementInfo[ele], indexs:[0], titles: [$scope.elementInfo[ele].title]},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success(res) {
				console.log(res.data,332);
				console.log('update title');
			},function error() {

			});
		$http({method: 'POST', url: pre_url+'element/Description',
			data:{element_Id: $scope.elementInfo[ele], indexs:[0], titles: [$scope.elementInfo[ele].description]},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success() {
				console.log('update description');
			},function error() {

			});
	};

	//上传文件
	upload = function (_Id, file, name) {
		Upload.upload({url:pre_url+'image/upload',
			data:{element_Id: _Id, file_name: name, file: file},
		}).success(function () {

		}).error(function () {

		})
	};

	//选择元素
	$scope.change_element = function (ele) {
		console.log('change element');
		$scope.current_element_Id = ele;
	};

	//添加元素
	$scope.add_element =function () {
		for (ele in $scope.elementInfo){
			if ($scope.elementInfo[ele]._Id == $scope.current_element_Id._Id){
				break;
			}
		}
		$http({method: 'POST', url: pre_url+'element/addTimes',
			data: {element_Id: $scope.current_element_Id._Id, times: [$scope.show_time]},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success(response) {
				var t = $scope.show_time;
				$scope.elementInfo[ele].times.push(t);
			},function error() {
				console.log('添加时间失败');
			});
		$http({method: 'POST', url: pre_url+'element/addPositions',
			data: {element_Id: $scope.current_element_Id._Id, positions: [$scope.position]},
			headers: {'x-access-token': $rootScope.token}})
			.then(function success() {
				var p = $.extend(true, {}, $scope.position);
				$scope.elementInfo[ele].positions.push(p);
			},function error() {

			});
		console.log('添加广告成功');
		$scope.current_element_Id = false;
	}
}]);

//视频截图
app.controller('screenShot', ['$scope', 'fileReader', '$http', 'Upload', function ($scope, fileReader, $http, Upload) {
	$scope.video_url = 'video/sample.mp4';
	$scope.url = '';
	$scope.seturl = function () {
		$scope.video_url = $scope.url;
	};
	$scope.pic = '';
	$scope.position_info = {start_x:'', start_y:'', end_x:'', end_y:'', width:'', height:''};
	$scope.button_show = false;

	$scope.mouse_down = function (event) {
		var node = document.getElementById("canvas");
		var child = document.getElementById('icanvas');
		if(child != null){
			var res = node.removeChild(child);
			
		}
		$scope.position_info.start_x = event.offsetX;
		$scope.position_info.start_y = event.offsetY;
	};

	$scope.mouse_up =function (event) {
		$scope.position_info.end_x = event.offsetX;
		$scope.position_info.end_y = event.offsetY;
		$scope.position_info.width = $scope.position_info.end_x-$scope.position_info.start_x;
		$scope.position_info.height = $scope.position_info.end_y-$scope.position_info.start_y;
		$scope.button_show = true;
		var v=document.getElementById('screen_shot_video');
		var firstcanvas = document.createElement("canvas");
		var icanvasimg = document.createElement('canvas');
		firstcanvas.id = 'icanvas';
		icanvasimg.id = 'icanvacimg';
		var context=firstcanvas.getContext("2d");//第一个复制video的画布
		context.drawImage(v,0,0,400,300);
		var contextimg = icanvasimg.getContext("2d");
		var x = $scope.position_info.start_x;
		var y = $scope.position_info.start_y;
		var width = $scope.position_info.end_x-$scope.position_info.start_x;
		var height = $scope.position_info.end_y-$scope.position_info.start_y;
		contextimg.drawImage(firstcanvas, x, y, width, height, 0, 0, 400, 300);
		$scope.pic = icanvasimg.toDataURL("image/png");
	};

	$scope.send_photo = function () {
		$scope.button_show = false;
	};

	$scope.cancel_photo = function () {
		$scope.button_show = false;
	}

} ]);

//文件读取指令
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

//文件读取服务
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

//link
app.controller('linkCount', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
	$scope.data = {
		file: null
	};
	$scope.upload = function () {
		if (!$scope.data.file) {
			return;
		}

		var url = $scope.params.url;  //params是model传的参数，图片上传接口的url
		var data = angular.copy($scope.params.data || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
		data.file = $scope.data.file;

		Upload.upload({
			url: url,
			data: data
		}).success(function (data) {
			$scope.hide(data);
		}).error(function () {
			logger.log('error');
		});
	};
	$scope.num = 'p';
}]);

