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
	'Utils',
	'VisitsService',
	function($scope, Utils, Visits) {
		Visits.increment();

		$scope.fancyTime = null;
		$scope.isFrontShown = true;
		$scope.runAnimation = true;
		$scope.photo = Utils.getRandom([
			'images/me_yellow.jpg',
			'images/me_door.jpg',
			'images/me_hat.jpg'
		]);

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

		$scope.$watchCollection('fancyTime', function(){
			console.log( $scope.fancyTime );
		});
	}
]);
