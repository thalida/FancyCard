'use strict';

app.directive('dynamicColor', [
	'$interval',
	'DynamicColorService',
	function($interval, DynamicColor){
		return {
			restrict: 'A',
			link: function($scope, $el) {
				var waitTime = 2 * 60 * 1000;
				var dynamicColor = new DynamicColor();
				var setBackground = function(){
					$el.css( 'background', dynamicColor.getColor() );
				};

				setBackground();
				$interval(setBackground, waitTime);

				// (function animloop(){
				// 	window.requestAnimFrame(animloop);
				// 	setBackground();
				// })();
			}
		};
	}
]);
