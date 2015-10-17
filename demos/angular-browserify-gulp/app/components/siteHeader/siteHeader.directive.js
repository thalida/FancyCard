'use strict';

app.directive('siteHeader', [
	'$rootScope',
	'$timeout',
	'$sce',
	'Utils',
	function($rootScope, $timeout, $sce, Utils){
		return {
			restrict: 'E',
			replace: true,
			template: require('./siteHeader.html'),
			transclude: false,
			link: function($scope, $el) {

			}
		};
	}
]);
