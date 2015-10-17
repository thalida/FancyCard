'use strict';

app.directive('siteFooter', [
	'$rootScope',
	'$timeout',
	'$sce',
	'Utils',
	function($rootScope, $timeout, $sce, Utils){
		return {
			restrict: 'E',
			replace: true,
			template: require('./siteFooter.html'),
			transclude: false,
			link: function($scope, $el) {

			}
		};
	}
]);
