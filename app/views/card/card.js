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
		$scope.runAnimation = true;

		$scope.toggleFlip = function(){
			$scope.flipCard = !$scope.flipCard;
			$scope.stopAnimation();
		};

		$scope.stopAnimation = function(){
			$scope.runAnimation = false;
		};

		$scope.startAnimation = function(){
			$scope.runAnimation = true;
		};
	}
]);
