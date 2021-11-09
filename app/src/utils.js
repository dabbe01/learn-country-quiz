import countries from './countries.js';

const hardCodedQuestions = {
	1: {
		alternatives: {
			1: 'swe',
			2: 'fra',
			3: 'dnk',
			4: 'bra',
		},
		correct: 'swe',
	},
	2: {
		alternatives: {
			1: 'blz',
			2: 'fra',
			3: 'cub',
			4: 'cog',
		},
		correct: 'fra',
	}
}

export const getRandomQuestions = () => {
	const keys = Object.keys(countries);
	const randomCountries = {};
	for (let i = 0; i < 5; i++) {
		const randomKeys = [];
		const randomValues = [];
		for (let j = 0; j < 4; j++) {
			const randomKey = keys[Math.floor(Math.random() * keys.length)];
			if (randomKeys.includes(randomKey.toLowerCase())) {
				j--;
				continue;
			}
			randomKeys.push(randomKey.toLowerCase());
			randomValues.push(countries[randomKey]);
		}
		randomCountries[i + 1] = { alternatives: { 1: randomKeys[0], 2: randomKeys[1], 3: randomKeys[2], 4: randomKeys[3] }, correct: randomKeys[Math.floor(Math.random() * 4)] };
	}
	return randomCountries;
}

export const shuffle = (array) => {
	var m = array.length, t, i;

	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];

		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

export const createGame = () => {
	const generatedQuestions = JSON.parse(localStorage.getItem('features'))?.randomQuestions.enabled ? getRandomQuestions() : hardCodedQuestions;

	return {
		currentQuestion: 1,
		questions: generatedQuestions,
		score: { player1: 0, player2: 0 },
		status: 'starting',
	}
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
