'use strict';

window.jQuery = window.$ = require('jquery');
window.moment = require('moment');
require('jquery-color/jquery.color');
require('angular');
require('ngstorage');

window.app = angular.module('myApp', [
	'ngStorage',
	require('angular-route'),
	require('angular-sanitize'),
	require('angular-animate')
]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);

app.run(['$templateCache', function($templateCache){
	// method taken from https://gist.github.com/960189
	jQuery.Color.fn.contrastColor = function() {
	    var r = this._rgba[0], g = this._rgba[1], b = this._rgba[2];
	    return (((r*299)+(g*587)+(b*144))/1000) >= 200 ? 'black' : 'white';
	};

	jQuery.Color.fn.secondaryColors = function() {
		var secondaryColors = {};
		var hsla = {
			current: this.hsla(),
		};
		var hues = {
			left: hsla.current[0] - 35,
			right: hsla.current[0] + 35
		};

		hsla.left = angular.copy( hsla.current );
		hsla.right = angular.copy( hsla.current );

		hues.left = ( hues.left < 0 ) ? 359 + hues.left : hues.left;
		hsla.left[0] = hues.left;
		secondaryColors.left = jQuery.Color().hsla(hsla.left);

		hues.right = ( hues.right > 359 ) ? hues.right - 359 : hues.right;
		hsla.right[0] = hues.right;
		secondaryColors.right = jQuery.Color().hsla(hsla.right);

		return secondaryColors;
	};

	// shim layer with setTimeout fallback
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame    ||
				function( callback ){
					window.setTimeout(callback, 1000 / 60);
				};
	})();
}]);

require('./components');
require('./views');
