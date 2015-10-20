'use strict';

//==============================================================================
//
//	Card Controller
// 		Creates the card element to be shown to the users when the hit the site
// 		The controller takes of of the dynamically changing content used.
//------------------------------------------------------------------------------

app.config([
	'$routeProvider',
	function($routeProvider) {
		$routeProvider.when('/', {
			template: require('./card.view.html'),
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
	'socialDict',
	function($rootScope, $scope, $timeout, Utils, Visits, skillsDict, socialDict) {
		var fancyTime = null;

		$rootScope.totalVisits = Visits.increment();

		$scope.utils = Utils;
		$scope.skills = skillsDict.get();
		$scope.social = socialDict.get();

		$scope.disableFlip = function( e ){
			e.stopPropagation();
			e.preventDefault();
		};

		$scope.navigateTo = function( e, site ){
			e.stopPropagation();
			e.preventDefault();

			window.location = site.url;
		};

		var updateGreetingText = function(){
			var sayings = angular.copy( fancyTime.closestPeriod.sayings );
			var currGreetingText = angular.copy( $scope.greetingText );

			if( typeof currGreetingText !== 'undefined' && currGreetingText.length > 0 ){
				var currGreetingIdx = sayings.indexOf( currGreetingText );
				sayings.splice( currGreetingIdx, 1 );
			}

			// Update the greeting text w/ a random saying
			var newGreetingText = $scope.utils.getRandom(sayings);

			return newGreetingText;
		};

		//	@updateText
		// 		Display a randomly selected saying based on the current time
		// 		as well as how many times the user has visited the site.
		//----------------------------------------------------------------------
		var updateText = function( ){
			$scope.greetingText = updateGreetingText();

			// Update the footer text w/ a ranom saing based on # of visits
			$scope.footerText = $scope.utils.getRandom(Visits.getGroup().sayings);

		};

		//	@updatePhoto
		// 		Display a photo of myself based on the current time
		//----------------------------------------------------------------------
		var updatePhoto = function(){
			// The key name of the nearest time period
			var timeName = fancyTime.closestPeriod.name;
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


		//	@getTagColor
		// 		Display an opaque version of the current FancyTime color
		// 		Where each alpha level represents the weight (skill strength)
		// 		of the tag
		//----------------------------------------------------------------------
		var getTagColor = function( tag ){
			if( fancyTime === null ){
				return '';
			}

			// Convert the rgba array to a string and remove the alpha value
			var rgba = fancyTime.color.rgba().join(', ');
			var rgb = rgba.substring(0, rgba.length - 1);

			// Get the new alpha opacity based on the weight of the tag
			var newAlpha;
			if( tag.weight === 'strong' ){
				newAlpha = 1;
			} else if( tag.weight === 'medium' ){
				newAlpha = 0.7;
			} else {
				newAlpha = 0.5;
			}

			// Return the base rgb color + new alpha
			return 'rgba(' +  rgb + newAlpha + ')';
		};

		var updateTags = function(){
			$.each($scope.skills, function(i, skill){
				skill.color = getTagColor(skill);
			});
		};

		$scope.onFaceUpdate = function( face, newFancyTime ){
			fancyTime = newFancyTime;

			if( face === 'front' ){
				updateText();
			} else if ( face === 'back' ){
				updatePhoto();
				updateTags();
			}
		};
	}
]);
