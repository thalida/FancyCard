'use strict';

app.service('VisitsService', [
	'$localStorage',
	'visitsDict',
	function($localStorage, visitsDict){
		var Visits = function(){
			this.groups = visitsDict.get();
			this.totalGroups = this.groups.length;
			this.storage = $localStorage.$default({
			    visits: 0
			});
		};

		Visits.prototype.addNew = function() {
			this.storage.visits += 1;
			this.storage.lastVisit = moment().format('x');
		};

		Visits.prototype.getGroup = function(){
			var foundGroup;

			for(var i = 0; i < this.totalGroups; i += 1){
				var group = this.groups[i];
				if( this.storage.visits <= group.minVisits || i == this.totalGroups - 1){
					foundGroup = group;
					break;
				}
			}

			return foundGroup;
		};

		return new Visits();
	}
]);
