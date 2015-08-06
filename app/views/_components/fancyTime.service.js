'use strict';

app.service('FancyTimeService', [
	'timePeriods',
	function( timePeriods ){
		var FancyTime = function(){
			this.groups = timePeriods.get();
			this.totalGroups = this.groups.length;
		};

		//======================================================================
		//
		//	@getRange
		//		Get the color transtion range based on the current time
		//
		//----------------------------------------------------------------------
		FancyTime.prototype.getRange = function(){
			var now = moment();

			// Current hour + minutes in military time
			var hour = parseInt(now.format('H'), 10);
			var minute = parseInt(now.format('m'), 10);

			// Before noon: start search at midnight - else start at noon
			var startIdx = (hour < 12) ? 0 : 3;
			// Before noon: end loop at noon - else end loop at midnight
			var endIdx = (hour < 12 ) ? 4 : this.totalGroups;

			// Home for the range times found
			var timeRange = [];

			// Loop through the (shortend) array of groups
			for( var i = startIdx; i < endIdx; i += 1){
				var currGroup = this.groups[i];
				var nextGroup = (i + 1 < this.totalGroups) ? this.groups[i + 1] : this.groups[0];

				// Check if we have found the correct color range:
				// 		current hour >= the currGroups's start time
				// 	AND current hour is < nextGroup's start time
				// 	OR  nextGroup's start time is midnight
				//		meaning that the currGroup's index is the last in the arr
				if( hour >= currGroup.beginAt
					&& (hour < nextGroup.beginAt || nextGroup.beginAt === 0)
				){
					timeRange[0] = currGroup;
					timeRange[1] = nextGroup;
					break;
				}
			}

			return {
				// the time used to find the groups
				time: {
					now: now,
					hour: hour,
					minute: minute
				},
				// The time range found
				groups: timeRange
			};
		};


		//==================================================================
		//
		//	@get
		//		Based on the start + end colors -- get the specific color
		// 		in that range that represents the time.
		//
		//		jQuery Color sets the distance for a transition from 0 - 1.
		//		We need to split that distance into various intervals that represent
		//		the current hour + mintue.
		//------------------------------------------------------------------
		FancyTime.prototype.get = function(){
			// Get the start + end colors - as well as the time used
			var range = this.getRange();

			// Convert the hex colors to the jQuery colors library format
			var jqColors = {
				start: jQuery.Color(range.groups[0].color),
				end: jQuery.Color(range.groups[1].color)
			};

			var interval = {};
			var distance = {};
			var transitionColor;

			// Get the total # of hours b/w the two groups
			// Split the transition distance (1) to pieces for each hour mark
			interval.hour = 1 / Math.abs(range.groups[1].beginAt - range.groups[0].beginAt);

			// Split the hour interval into 60 pieces (1 for each minute)
			interval.minute = interval.hour / 60;

			// Calculate the current hour + minute values using the intervals
			distance.hour = interval.hour * Math.abs(range.time.hour - range.groups[0].beginAt);
			distance.minute = interval.minute * Math.abs(60 - range.time.minute);
			distance.total = distance.hour + distance.minute;

			// Get the color that falls x distance b/w the start + end colors
			transitionColor = jqColors.start.transition(jqColors.end, distance.total);

			return {
				range: range.groups,
				color: transitionColor,
				hexColor: transitionColor.toHexString()
			};
		};

		return FancyTime;
	}
]);
