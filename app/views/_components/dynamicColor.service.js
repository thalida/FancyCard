'use strict';

app.service('DynamicColorService', [
	function(){
		var DynamicColor = function(){
			// Core transition colors
			this.colors = [
				{
					name: 'nightowl',
					hex: '#323C64',
					beginAt: 0
				},
				{
					name: 'earlybird',
					hex: '#97FFDF',
					beginAt: 4
				},
				{
					name: 'morning',
					hex: '#56D8FF',
					beginAt: 8
				},
				{
					name: 'afternoon',
					hex: '#FFD874',
					beginAt: 12
				},
				{
					name: 'midafternoon',
					hex: '#FFB774',
					beginAt: 15
				},
				{
					name: 'evening',
					hex: '#FF8774',
					beginAt: 18
				},
				{
					name: 'night',
					hex: '#284BD7',
					beginAt: 21
				}
			];

			this.totalColors = this.colors.length;
		};

		//======================================================================
		//
		//	@getRange
		//		Get the color transtion range based on the current time
		//
		//----------------------------------------------------------------------
		DynamicColor.prototype.getRange = function(){
			var now = moment();

			// Current hour + minutes in military time
			var hour = parseInt(now.format('H'), 10);
			var minute = parseInt(now.format('m'), 10);

			// Before noon: start search at midnight - else start at noon
			var startIdx = (hour < 12) ? 0 : 3;
			// Before noon: end loop at noon - else end loop at midnight
			var endIdx = (hour < 12 ) ? 4 : this.totalColors;

			// Home for the range colors found
			var colors = [];

			// Loop through the (shortend) array of colors
			for( var i = startIdx; i < endIdx; i += 1){
				var currColor = this.colors[i];
				var nextColor = (i + 1 < this.totalColors) ? this.colors[i + 1] : this.colors[0];

				// Check if we have found the correct color range:
				// 		current hour >= the currentColor's start time
				// 	AND current hour is < nextColor's start time
				// 	OR  nextColor's start time is midnight
				//		meaning that the currColor's index is the last in the arr
				if( hour >= currColor.beginAt
					&& (hour < nextColor.beginAt || nextColor.beginAt === 0)
				){
					colors[0] = currColor;
					colors[1] = nextColor;
					break;
				}
			}

			return {
				// the time used to find the color range
				time: {
					now: now,
					hour: hour,
					minute: minute
				},
				// The color range found
				colors: colors
			};
		};


		//==================================================================
		//
		//	@getColor
		//		Based on the start + end colors -- get the specific color
		// 		in that range that represents the time.
		//
		//		jQuery Color sets the distance for a transition from 0 - 1.
		//		We need to split that distance into various intervals that represent
		//		the current hour + mintue.
		//------------------------------------------------------------------
		DynamicColor.prototype.getColor = function(){
			// Get the start + end colors - as well as the time used
			var range = this.getRange();

			// Convert the hex colors to the jQuery colors library format
			var jqColors = {
				start: jQuery.Color(range.colors[0].hex),
				end: jQuery.Color(range.colors[1].hex)
			};

			var interval = {};
			var distance = {};
			var transitionColor;

			// Get the total # of hours b/w the two colors
			// Split the transition distance (1) to pieces for each hour mark
			interval.hour = 1 / Math.abs(range.colors[1].beginAt - range.colors[0].beginAt);

			// Split the hour interval into 60 pieces (1 for each minute)
			interval.minute = interval.hour / 60;

			// Calculate the current hour + minute values using the intervals
			distance.hour = interval.hour * Math.abs(range.time.hour - range.colors[0].beginAt);
			distance.minute = interval.minute * Math.abs(60 - range.time.minute);
			distance.total = distance.hour + distance.minute;

			// Get the color that falls x distance b/w the start + end colors
			transitionColor = jqColors.start.transition(jqColors.end, distance.total);

			return transitionColor.toHexString();
		};

		return DynamicColor;
	}
]);
