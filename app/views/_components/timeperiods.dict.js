'use strict';

app.service('timePeriods', [
	function(){
		var timePeriods = [
			{
				name: 'nightowl',
				beginAt: 0,
				color: '#323C64',
				sayings: [
					'Woah, Nightowl!',
					'Up Late?',
					'Can&rsquo;t sleep?'
				]
			},
			{
				name: 'earlybird',
				beginAt: 4,
				color: '#97FFDF',
				sayings: [
					'Woah, Nightowl!',
					'Up Late?',
					'Can&rsquo;t sleep?'
				]
			},
			{
				name: 'morning',
				beginAt: 8,
				color: '#56D8FF',
				sayings: [
					'Woah, Nightowl!',
					'Up Late?',
					'Can&rsquo;t sleep?'
				]
			},
			{
				name: 'afternoon',
				beginAt: 12,
				color: '#FFD874',
				sayings: [
					'Woah, Nightowl!',
					'Up Late?',
					'Can&rsquo;t sleep?'
				]
			},
			{
				name: 'midafternoon',
				beginAt: 15,
				color: '#FFB774',
				sayings: [
					'Woah, Nightowl!',
					'Up Late?',
					'Can&rsquo;t sleep?'
				]
			},
			{
				name: 'evening',
				beginAt: 18,
				color: '#FF8774',
				sayings: [
					'Woah, Nightowl!',
					'Up Late?',
					'Can&rsquo;t sleep?'
				]
			},
			{
				name: 'night',
				beginAt: 21,
				color: '#284BD7',
				sayings: [
					'Woah, Nightowl!',
					'Up Late?',
					'Can&rsquo;t sleep?'
				]
			}
		];

		return {
			get: function(){
				return timePeriods;
			}
		};
	}
]);
