export interface City {
	name: string;
	country: string;
	countryCode: string;
	temp: number;
	lat: number;
	lon: number;
	condition: WeatherCondition;
}

export interface LeaderboardEntry {
	name: string;
	score: number;
	streak: number;
	date: string;
}

export type GameState = 'playing' | 'correct' | 'wrong' | 'gameover';
export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WeatherCondition =
	| 'Thunderstorm'
	| 'Drizzle'
	| 'Rain'
	| 'Snow'
	| 'Clear'
	| 'Clouds'
	| 'Mist'
	| 'Smoke'
	| 'Haze'
	| 'Dust'
	| 'Fog'
	| 'Sand'
	| 'Dust'
	| 'Ash'
	| 'Squall'
	| 'Tornado';
