'use strict';

app.directive('dynamicCard', [
	'$interval',
	'$sce',
	'FancyTimeService',
	'VisitsService',
	function($interval, $sce, FancyTime, Visits){
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: 'views/_components/dynamicCard/dynamicCard.html',
			scope: {
				cardType: '@type'
			},
			link: function($scope, $el) {
				$scope.utils = {
					getRandom: function( arr ){
						return arr[Math.floor(Math.random()*arr.length)];
					},
					sanitize: function(str){
						return $sce.trustAsHtml(str);
					}
				};

				var waitTime = 2 * 60 * 1000;
				var fancyTime = new FancyTime();

				var setup = function(){
					$scope.cardType = $scope.cardType || 'front';
					$scope.cardClass = 'card-' + $scope.cardType;

					updateCard();
					$interval(updateCard, waitTime);
				};

				var getGreetingText = function( fancyTime ){
					// Current time in military format using moment library
					var now = moment();
					var hour = parseInt(now.format('H'), 10);

					var numHrsInRange = Math.abs(fancyTime.range[1].beginAt - fancyTime.range[0].beginAt);
					var timeSinceBegin = hour - fancyTime.range[0].beginAt;
					var closestPeriod = ( timeSinceBegin < numHrsInRange / 2 ) ? fancyTime.range[0] : timePeriod.range[1];

					return $scope.utils.getRandom(closestPeriod.sayings);
				};

				var getFooterText = function(){
					var visitsGroup = Visits.getGroup();
					return $scope.utils.getRandom(visitsGroup.sayings);
				};

				var updateCard = function(){
					var currFancyTime = fancyTime.get();

					$scope.greetingText = getGreetingText( currFancyTime );
					$scope.footerText = getFooterText();
					$scope.cardColor = currFancyTime.color.contrastColor();
					$el.css( 'background', currFancyTime.hexColor );
				};

				setup();
			}
		};
	}
]);
