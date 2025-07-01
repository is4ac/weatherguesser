import { City } from './types';
import { cities } from './data';

export const convertToFahrenheit = (celsius: number) => Math.round((celsius * 9) / 5 + 32);
export const convertToCelsius = (fahrenheit: number) => ((fahrenheit - 32) * 5) / 9;

function random(seed: number, step: number) {
	const numbers: Record<number, boolean> = {};

	let x = Math.tan(seed++) * 10000;
	let randNumber = Math.floor((x - Math.floor(x)) * cities.length);
	numbers[randNumber] = true;
	let i = 0;

	while (i < step) {
		x = Math.tan(seed++) * 10000;
		randNumber = Math.floor((x - Math.floor(x)) * cities.length);
		if (!(randNumber in numbers)) {
			numbers[randNumber] = true;
			i++;
		}
	}

	return randNumber;
}

export const getRandomCity = (step: number) => {
	const dateSeed = new Date();
	const randomIndex = random(
		parseInt(`${dateSeed.getDay()}${dateSeed.getMonth()}${dateSeed.getFullYear()}`),
		step
	);
	return cities[randomIndex] as City;
};
