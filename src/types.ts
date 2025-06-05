export interface City {
	name: string;
	country: string;
	temp: number;
	lat: number;
	lon: number;
}

export interface LeaderboardEntry {
	name: string;
	score: number;
	streak: number;
	date: string;
}

export type GameState = 'playing' | 'correct' | 'wrong' | 'gameover';
export type TemperatureUnit = 'celsius' | 'fahrenheit';
