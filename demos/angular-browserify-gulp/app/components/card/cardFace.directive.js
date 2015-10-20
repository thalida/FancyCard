'use strict';

//==============================================================================
//
//	Card Face Directive
// 		Renders the face of a card element
// 		Usage:
// 			- Requires the card directive as it's parent
// 			- Requires a face attribute either "front" or "back"
// 		Example:
// 			<card:face face="front"></card:face>
//------------------------------------------------------------------------------

app.directive('cardFace', [
	'$interval',
	'$sce',
	'Utils',
	function($interval, $sce, Utils){
		return {
			require: '^card',
			restrict: 'E',
			replace: true,
			template: require('./templates/cardFace.html'),
			transclude: true,
			scope: {
				cardFace: '@face'
			},
			link: function($scope, $el, $attrs, cardCtrl) {
				var $body = $('body');
				var interval;
				// Wait 2 minutes between each card update
				var waitTime = 2 * 60 * 1000;
				// var waitTime = 5 * 1000;

				$scope.utils = Utils;

				//	init
				// 		Setups the animation interval for the card and default
				// 		attributes needed to display the card.
				//--------------------------------------------------------------
				var init = function(){
					$scope.cardClass = 'card-' + $scope.cardFace;
					setUpdateInterval();
				};

				var setUpdateInterval = function(){
					if( typeof interval !== 'undefined' ){
						$interval.cancel( interval );
					}
					updateCard();
					interval = $interval(updateCard, waitTime);
				};

				//	updateCard
				// 		Update the card colors and sayings based on the current
				// 		"fancy" time as well as the # of visits
				//--------------------------------------------------------------
				var updateCard = function(){
					// Get the info for the current time (color, sayings, name, etc)
					var currFancyTime = cardCtrl.getFancyTime();
					var secondaryColors = currFancyTime.color.secondaryColors();

					// Set the body background to a secondary color
					$body.css( 'background', secondaryColors.left.toHexString() );

					// Get the contrast color: either white/black
					$scope.cardColor = currFancyTime.color.contrastColor();
					$el.css( 'background', currFancyTime.hexColor );
				};

				init();

				$scope.$watch(
					function(){
						return cardCtrl.isFaceShown( $scope.cardFace );
					},
					function( newState, oldState ){
						if( newState === true && oldState === false ){
							setUpdateInterval();
						} else if( newState === false ){
							$interval.cancel( interval );
						}
					}
				);
			}
		};
	}
]);
