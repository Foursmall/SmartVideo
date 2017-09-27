/**
 * Created by zhangyaqiang on 16/11/23.
 */

var app = angular.module('myApp', []);
app.run(function($rootScope) {
    $rootScope.name = "zyq";
});
