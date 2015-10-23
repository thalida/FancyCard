'use strict';

app.service('fancyTimeDict', [
	function(){
		var timePeriods = [
			{
				name: 'nightowl',
				beginAt: 0,
				color: '#323C64',
				sayings: [
					'Woah, Nightowl!',
					'Up Late?',
					'Can&rsquo;t sleep?',
					'Burning the night oil?'
				]
			},
			{
				name: 'earlybird',
				beginAt: 4,
				color: '#8B98CE',
				// color: '#97FFDF',
				sayings: [
					'OMG, the elusive EarlyBird!',
					'Hi, Early Riser!',
					'Good Dreams?',
					'Have a great day!'
				]
			},
			{
				name: 'morning',
				beginAt: 8,
				color: '#56D8FF',
				sayings: [
					'Good Morning!',
					'Good Dreams?',
					'Have a wonderful day!',
					'How&rsquo;d ya sleep?'
				]
			},
			{
				name: 'afternoon',
				beginAt: 12,
				color: '#FFD874',
				sayings: [
					'Good Afternoon!',
					'Food o\'Clock',
					'Lunch time?',
					'What&rsquo;s up!?'
				]
			},
			{
				name: 'midafternoon',
				beginAt: 15,
				color: '#FFB774',
				sayings: [
					'Oh, Hi!',
					'How are you?',
					'Oh, Hey you!',
					'How ya doing?'
				]
			},
			{
				name: 'evening',
				beginAt: 18,
				color: '#FF8774',
				sayings: [
					'Good Evening!',
					'Good day?',
					'Dinner plans?',
					'How&rsquo;s it going?'
				]
			},
			{
				name: 'night',
				beginAt: 21,
				color: '#284BD7',
				sayings: [
					'Good Night!',
					'Plans Tonight?',
					'Netfix &amp; Chinese?',
					'Have a great night!'
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
