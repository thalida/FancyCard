'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngSanitize']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);

app.run([function(){
	// method taken from https://gist.github.com/960189
	jQuery.Color.fn.contrastColor = function() {
	    var r = this._rgba[0], g = this._rgba[1], b = this._rgba[2];
	    return (((r*299)+(g*587)+(b*144))/1000) >= 160.5 ? 'black' : 'white';
	};
	// jQuery.Color.fn.contrastColor = function() {
	//     var r = this._rgba[0], g = this._rgba[1], b = this._rgba[2];
	//     return (((r*299)+(g*587)+(b*144))/1000) >= 131.5 ? 'black' : 'white';
	// };

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
