'use strict';

app.service('visitsDict', [
	function(){
		var visits = [
			{
				name: 'first',
				minVisits: 1,
				sayings: [
					'Hi, I&rsquo;m Thalida',
					'Hey, I&rsquo;m Thalida',
					'I&rsquo;m Thalida',
					'Welcome, I&rsquo;m Thalida'
				]
			},
			{
				name: 'second',
				minVisits: 2,
				sayings: [
					'Welcome back!',
					'Missed me?',
					'Back again?',
					'Came back for seconds?'
				]
			},
			{
				name: 'many',
				minVisits: 3,
				sayings: [
					'Ah, a serial visitor...',
					'How sweet, you&rsquo;re back!',
					'You know the drill by now',
					'Nice to have you back!'
				]
			},
		];

		return {
			get: function(){
				return visits;
			}
		};
	}
]);
