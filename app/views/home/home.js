'use strict';

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/home/home.html',
		controller: 'HomeCtrl'
	});
}]);

app.controller('HomeCtrl', [function() {

}]);
