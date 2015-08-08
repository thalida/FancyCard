'use strict';

app.directive('cardFace', [
	'$interval',
	'$sce',
	'Utils',
	function($interval, $sce, Utils){
		return {
			require: '^card',
			restrict: 'E',
			replace: true,
			templateUrl: 'components/card/templates/cardFace.html',
			transclude: true,
			scope: {
				cardFace: '@type'
			},
			link: function($scope, $el, $attrs, cardCtrl) {
				$scope.utils = Utils;

				//	init
				// 		Sets the card & runs the animation/update
				//--------------------------------------------------------------
				var init = function(){
					// Wait time between each card update
					var waitTime = 2 * 60 * 1000;

					$scope.cardFace = $scope.cardFace || 'front';
					$scope.cardClass = 'card-' + $scope.cardFace;

					updateCard();
					$interval(updateCard, waitTime);
				};

				//	updateCard
				// 		Update the card colors and sayings based on the current
				// 		"fancy" time as well as the # of visits
				//--------------------------------------------------------------
				var updateCard = function(){
					// Get the info for the current time (color, sayings, name, etc)
					var currFancyTime = cardCtrl.getFancyTime();

					// Pass the current fancy time to the parent controller
					$scope.currFancyTime = currFancyTime;

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
