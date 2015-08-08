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

		//	@getTagColor
		// 		Display a saturated opaque version of the current FancyTime color
		// 		Where each alpha level represents the weight (skill strength)
		// 		of the tag
		//----------------------------------------------------------------------
		$scope.getTagColor = function( tag ){
			if( $scope.fancyTime === null ){
				return '';
			}

			// Get the current saturation level of the color
			var currSaturation = $scope.fancyTime.color.saturation();
			// Create a new color w/ a decreased level of saturation
			var newColor = $scope.fancyTime.color.saturation( currSaturation - 0.3 );

			// Convert the rgba array to a string -- and remove the alpha
			// portion of the newly created sting.
			var rgba = newColor.rgba().join(', ');
			var rgb = rgba.substring(0, rgba.length - 1);

			// Get the new alpha opacity based on the weight of the tag
			var newAlpha;
			if( tag.weight === 'strong' ){
				newAlpha = 1;
			} else if( tag.weight === 'medium' ){
				newAlpha = 0.5;
			} else {
				newAlpha = 0.2;
			}

			// Return the base rgb color + new alpha
			return 'rgba(' +  rgb + newAlpha + ')';
		};

		//	@updateText
		// 		Display a randomly selected saying based on the current time
		// 		as well as how many times the user has visited the site.
		//----------------------------------------------------------------------
		$scope.updateText = function(){
			// Update the greeting text w/ a random saying
			$scope.greetingText = $scope.utils.getRandom($scope.fancyTime.closestPeriod.sayings);

			// Update the footer text w/ a ranom saing based on # of visits
			$scope.footerText = $scope.utils.getRandom(Visits.getGroup().sayings);

		};

		//	@updatePhoto
		// 		Display a photo of myself based on the current time
		//----------------------------------------------------------------------
		$scope.updatePhoto = function(){
			// The key name of the nearest time period
			var timeName = $scope.fancyTime.closestPeriod.name;
			var photoOptions = [
				'assets/images/me_door.jpg',
				'assets/images/me_yellow.jpg',
				'assets/images/me_hat.jpg'
			];
			var photo;

			// Based on the time display the approriate photo
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

		// Anytime the fancyTime changes/updates
		// Update the text + photo shown on the site
		$scope.$watch('fancyTime', function(fancyTime){
			if( fancyTime !== null ){
				$scope.updateText();
				$scope.updatePhoto();
			}
		});
	}
]);
