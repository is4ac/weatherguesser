export interface City {
  name: string
  country: string
  temp: number
}

export interface LeaderboardEntry {
  name: string
  score: number
  accuracy: number
  streak: number
  date: string
}

export type GameState = "playing" | "correct" | "wrong"
export type TemperatureUnit = "celsius" | "fahrenheit"
