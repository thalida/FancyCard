'use strict';

var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);
