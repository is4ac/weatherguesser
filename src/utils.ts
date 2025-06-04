import { City } from './types';

export const convertToFahrenheit = (celsius: number) => Math.round((celsius * 9) / 5 + 32);
export const convertToCelsius = (fahrenheit: number) => ((fahrenheit - 32) * 5) / 9;

export const getTemperatureColor = (temp: number) => {
	if (temp < 0) return 'from-blue-600 to-blue-800';
	if (temp < 10) return 'from-blue-400 to-blue-600';
	if (temp < 20) return 'from-blue-300 to-green-400';
	if (temp < 30) return 'from-green-400 to-yellow-400';
	return 'from-yellow-400 to-red-500';
};

export const cities = [
	{ name: 'Tokyo', country: 'Japan', temp: 22, lat: 35.6768601, lon: 139.7638947 },
	{ name: 'London', country: 'UK', temp: 15, lat: 51.5073219, lon: -0.1276474 },
	{ name: 'New York', country: 'USA', temp: 18, lat: 40.7127281, lon: -74.0060152 },
	{ name: 'Sydney', country: 'Australia', temp: 25, lat: -33.8698439, lon: 151.2082848 },
	{ name: 'Dubai', country: 'UAE', temp: 35, lat: 25.2653471, lon: 55.2924914 },
	{ name: 'Moscow', country: 'Russia', temp: -5, lat: 55.7504461, lon: 37.6174943 },
	{ name: 'Mumbai', country: 'India', temp: 32, lat: 19.079, lon: 72.878176 },
	{ name: 'Paris', country: 'France', temp: 16, lat: 48.8588897, lon: 2.3200410217200766 },
	{ name: 'Cairo', country: 'Egypt', temp: 28, lat: 30.0443879, lon: 31.2357257 },
	{ name: 'Stockholm', country: 'Sweden', temp: 8, lat: 59.3251172, lon: 18.0710935 },
	{ name: 'Bangkok', country: 'Thailand', temp: 34, lat: 13.7524938, lon: 100.494 },
	{ name: 'Reykjavik', country: 'Iceland', temp: 3, lat: 64.145981, lon: -21.9422367 },
	{ name: 'Rio de Janeiro', country: 'Brazil', temp: 26, lat: -22.9110137, lon: -43.2093727 },
	{ name: 'Singapore', country: 'Singapore', temp: 30, lat: 1.2899175, lon: 103.8519072 },
	{ name: 'Vancouver', country: 'Canada', temp: 12, lat: 49.2608724, lon: -123.113952 }
];

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
