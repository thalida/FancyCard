'use strict';

app.directive('dynamicCard', [
	'$interval',
	'$sce',
	'Utils',
	'FancyTimeService',
	'VisitsService',
	function($interval, $sce, Utils, FancyTime, Visits){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'views/_components/dynamicCard/dynamicCard.html',
			transclude: true,
			scope: {
				cardType: '@type',
				currFancyTime: '=?fancyTime'
			},
			link: function($scope, $el) {
				$scope.utils = Utils;

				//	init
				// 		Sets the card & runs the animation/update
				//--------------------------------------------------------------
				var init = function(){
					// Wait time between each card update
					var waitTime = 2 * 60 * 1000;

					$scope.cardType = $scope.cardType || 'front';
					$scope.cardClass = 'card-' + $scope.cardType;

					updateCard();
					$interval(updateCard, waitTime);
				};

				//	updateCard
				// 		Update the card colors and sayings based on the current
				// 		"fancy" time as well as the # of visits
				//--------------------------------------------------------------
				var updateCard = function(){
					// Get the info for the current time (color, sayings, name, etc)
					var currFancyTime = FancyTime.get();

					// Get which group the visitor is in
					var visitsGroup = Visits.getGroup();

					// Pass the current fancy time to the parent controller
					$scope.currFancyTime = currFancyTime;

					// Update the greeting text w/ a random saying
					$scope.greetingText = $scope.utils.getRandom(currFancyTime.closestPeriod.sayings);

					// Update the footer text w/ a ranom saing based on # of visits
					$scope.footerText = $scope.utils.getRandom(visitsGroup.sayings);

					// Update the contrast card color (either white/black)
					$scope.cardColor = currFancyTime.color.contrastColor();

					// Set the background to the hex color for this time
					$el.css( 'background', currFancyTime.hexColor );
				};

				init();
			}
		};
	}
]);
