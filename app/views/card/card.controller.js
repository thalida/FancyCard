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
		$scope.isFrontShown = true;
		$scope.runAnimation = true;

		$scope.flipCard = function(){
			$scope.isFrontShown = !$scope.isFrontShown;
			$scope.pauseAnimation();
		};

		$scope.pauseAnimation = function(){
			$scope.runAnimation = false;
		};

		$scope.playAnimation = function(){
			$scope.runAnimation = true;
		};
	}
]);
