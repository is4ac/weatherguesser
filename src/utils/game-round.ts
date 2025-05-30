export default class GameRound {
  score: number
  cities: string[]
  cityNumber: number
  static NUM_CITIES = 5

  constructor() {
    this.score = 0
    this.cities = []
    this.cityNumber = 0
  }

  addCity(city: string, countryCode: string) {
    let key = city + ',' + countryCode
    if (this.cities.includes(key)) {
      return false
    } else {
      this.cities.push(key)
      this.cityNumber++
      return true
    }
  }

  updateScore(difference: number) {
    let scoreEarned = Math.max(20 - difference, -20)
    this.score += scoreEarned
    return scoreEarned
  }

  isGameOver() {
    return this.cities.length >= GameRound.NUM_CITIES
  }

  reset() {
    this.score = 0
    this.cities = []
    this.cityNumber = 0
  }
}