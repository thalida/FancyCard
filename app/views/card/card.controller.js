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
			'assets/images/me_yellow.jpg',
			'assets/images/me_door.jpg',
			'assets/images/me_hat.jpg'
		]);
		$scope.skills = [
			{
				weight: 'strong',
				type: 'framework',
				label: 'AngularJS'
			},
			{
				weight: 'strong',
				type: 'preprocessor',
				label: 'CoffeScript'
			},
			{
				weight: 'medium',
				type: 'builder',
				label: 'Grunt'
			},
			{
				weight: 'light',
				type: 'builder',
				label: 'Gulp'
			},
			{
				weight: 'light',
				type: 'framework',
				label: 'Backbone'
			},
			{
				weight: 'light',
				type: 'framework',
				label: 'React'
			}
		];

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

		$scope.getTagColor = function( tag ){
			if( $scope.fancyTime === null ){
				return '';
			}
			var currSaturation = $scope.fancyTime.color.saturation();
			var newColor = $scope.fancyTime.color.saturation( currSaturation - 0.3 );

			var rgba = newColor.rgba().join(', ');
			var rgb = rgba.substring(0, rgba.length - 1);
			var newAlpha;
			var tagColor;

			if( tag.weight === 'strong' ){
				newAlpha = 1;
			} else if( tag.weight === 'medium' ){
				newAlpha = 0.5;
			} else {
				newAlpha = 0.2;
			}

			tagColor = 'rgba(' +  rgb + newAlpha + ')';

			return tagColor;
		};
	}
]);
