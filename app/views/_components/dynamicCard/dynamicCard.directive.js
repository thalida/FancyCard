'use strict';

app.directive('dynamicCard', [
	'$interval',
	'FancyTimeService',
	function($interval, FancyTime){
		return {
			restrict: 'E',
			replace: true,
			transclude: true,
			templateUrl: 'views/_components/dynamicCard/dynamicCard.html',
			scope: {
				cardType: '@type'
			},
			link: function($scope, $el) {
				var waitTime = 2 * 60 * 1000;
				var fancyTime = new FancyTime();

				var setup = function(){
					$scope.cardType = $scope.cardType || 'front';
					$scope.cardClass = 'card-' + $scope.cardType;

					updateCard();
					$interval(updateCard, waitTime);
				};

				var updateCard = function(){
					var time = fancyTime.get();
					console.log( time );
					$el.css( 'background', time.hexColor );
				};

				setup();
			}
		};
	}
]);
