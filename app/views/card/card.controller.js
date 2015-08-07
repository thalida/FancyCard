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
	'skillsDict',
	function($scope, Utils, Visits, skillsDict) {
		Visits.increment();

		$scope.utils = Utils;
		$scope.fancyTime = null;
		$scope.isFrontShown = true;
		$scope.runAnimation = true;
		$scope.photo = Utils.getRandom([
			'assets/images/me_yellow.jpg',
			'assets/images/me_door.jpg',
			'assets/images/me_hat.jpg'
		]);
		$scope.skills = skillsDict.get();

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

			return 'rgba(' +  rgb + newAlpha + ')';
		};

		$scope.updateText = function(){
			// Get which group the visitor is in
			var visitsGroup = Visits.getGroup();

			// Update the greeting text w/ a random saying
			$scope.greetingText = $scope.utils.getRandom($scope.fancyTime.closestPeriod.sayings);

			// Update the footer text w/ a ranom saing based on # of visits
			$scope.footerText = $scope.utils.getRandom(visitsGroup.sayings);

		};

		$scope.$watch('fancyTime', function(fancyTime){
			if( fancyTime !== null ){
				$scope.updateText();
			}
		});
	}
]);
