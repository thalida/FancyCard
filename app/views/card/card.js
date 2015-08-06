'use strict';

app.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'views/card/card.html',
			controller: 'CardCtrl'
		});
	}
]);

app.controller('CardCtrl', [
	'$scope',
	function($scope) {
		$scope.flipCard = false;
		$scope.toggleFlip = function( e ){
			$scope.flipCard = !$scope.flipCard;
		};
	}
]);
