export default class GameRound {
    static NUM_CITIES = 10;

    constructor() {
        this.score = 0;
        this.cities = [];
        this.cityNumber = 0;
    }

    addCity(city, countryCode) {
        let key = city + "," + countryCode;
        if (this.cities.includes(key)) {
            return false;
        } else {
            this.cities.push(key);
            this.cityNumber++;
            return true;
        }
    }

    updateScore(difference) {
        let scoreEarned = 20 - difference;
        this.score += scoreEarned;
        return scoreEarned;
    }

    isGameOver() {
        return this.cities.length >= GameRound.NUM_CITIES;
    }

    reset() {
        this.score = 0;
        this.cities = []
        this.cityNumber = 0;
    }
}
