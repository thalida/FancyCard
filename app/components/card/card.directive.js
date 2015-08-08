'use strict';

app.directive('card', [
	'$rootScope',
	'$timeout',
	'$sce',
	'Utils',
	'FancyTimeService',
	function($rootScope, $timeout, $sce, Utils, FancyTime){
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'components/card/templates/card.html',
			transclude: true,
			scope: {
				currFancyTime: '=?fancyTime'
			},
			controller: ['$scope','$element','$attrs', function ($scope, $element, $attrs){
				this.getFancyTime = function(){
					$scope.currFancyTime = FancyTime.get();
					return $scope.currFancyTime;
				};
			}],
			link: function($scope, $el) {
				$scope.utils = Utils;

				$scope.isFrontShown = true;
				$scope.runAnimation = true;
				$scope.hasClicked = false;

				$scope.flipCard = function(){
					$scope.hasClicked = true;
					$scope.isFrontShown = !$scope.isFrontShown;

					if( $scope.isFrontShown === true ){
						$scope.setAnimation( true );
					} else {
						$scope.setAnimation( false );
					}
				};

				$scope.setAnimation = function( isRunning ){
					$scope.runAnimation = isRunning;
				};

				$timeout(function(){
					if( $rootScope.totalVisits <= 1 && $scope.hasClicked === false ){
						$scope.flipCard();
					}
				}, 5 * 1000);
			}
		};
	}
]);
