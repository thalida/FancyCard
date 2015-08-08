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
	'$rootScope',
	'$scope',
	'$timeout',
	'Utils',
	'VisitsService',
	'skillsDict',
	function($rootScope, $scope, $timeout, Utils, Visits, skillsDict) {
		$rootScope.totalVisits = Visits.increment();

		$scope.utils = Utils;
		$scope.fancyTime = null;
		$scope.skills = skillsDict.get();

		$scope.getTagColor = function( tag ){
			if( $scope.fancyTime === null ){
				return '';
			}
			var currSaturation = $scope.fancyTime.color.saturation();
			var newColor = $scope.fancyTime.color.saturation( currSaturation - 0.3 );

			var rgba = newColor.rgba().join(', ');
			var rgb = rgba.substring(0, rgba.length - 1);
			var newAlpha;

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

		$scope.updatePhoto = function(){
			var timeName = $scope.fancyTime.closestPeriod.name;
			var photoOptions = [
				'assets/images/me_door.jpg',
				'assets/images/me_yellow.jpg',
				'assets/images/me_hat.jpg'
			];
			var photo;

			switch(timeName){
				case 'earlybird':
				case 'morning':
					photo = photoOptions[0];
					break;
				case 'afternoon':
				case 'midafternoon':
				case 'evening':
					photo = photoOptions[1];
					break;
				default:
					photo = photoOptions[2];
					break;
			}

			$scope.photo = photo;
		};

		$scope.$watch('fancyTime', function(fancyTime){
			if( fancyTime !== null ){
				$scope.updateText();
				$scope.updatePhoto();
			}
		});
	}
]);
