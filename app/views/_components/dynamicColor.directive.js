'use strict';

app.directive('dynamicColor', [
	'DynamicColorService',
	function(DynamicColor){
		return {
			restrict: 'A',
			link: function($scope, $el) {
				$scope.background = new DynamicColor();
				$scope.bgColor = $scope.background.calcColor();

				$el.css({
					'background': $scope.bgColor
				});
			}
		};
	}
]);
