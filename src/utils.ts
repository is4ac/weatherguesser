import { City } from './types';

export const convertToFahrenheit = (celsius: number) => Math.round((celsius * 9) / 5 + 32);
export const convertToCelsius = (fahrenheit: number) => Math.round(((fahrenheit - 32) * 5) / 9);

export const getTemperatureColor = (temp: number) => {
	if (temp < 0) return 'from-blue-600 to-blue-800';
	if (temp < 10) return 'from-blue-400 to-blue-600';
	if (temp < 20) return 'from-blue-300 to-green-400';
	if (temp < 30) return 'from-green-400 to-yellow-400';
	return 'from-yellow-400 to-red-500';
};

export const cities = [
	{ name: 'Tokyo', country: 'Japan', temp: 22 },
	{ name: 'London', country: 'UK', temp: 15 },
	{ name: 'New York', country: 'USA', temp: 18 },
	{ name: 'Sydney', country: 'Australia', temp: 25 },
	{ name: 'Dubai', country: 'UAE', temp: 35 },
	{ name: 'Moscow', country: 'Russia', temp: -5 },
	{ name: 'Mumbai', country: 'India', temp: 32 },
	{ name: 'Paris', country: 'France', temp: 16 },
	{ name: 'Cairo', country: 'Egypt', temp: 28 },
	{ name: 'Stockholm', country: 'Sweden', temp: 8 },
	{ name: 'Bangkok', country: 'Thailand', temp: 34 },
	{ name: 'Reykjavik', country: 'Iceland', temp: 3 },
	{ name: 'Rio de Janeiro', country: 'Brazil', temp: 26 },
	{ name: 'Singapore', country: 'Singapore', temp: 30 },
	{ name: 'Vancouver', country: 'Canada', temp: 12 }
];

export const getRandomCity = () => {
	const randomIndex = Math.floor(Math.random() * cities.length);
	return cities[randomIndex] as City;
};
