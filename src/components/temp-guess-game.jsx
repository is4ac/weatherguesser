import React, { Component } from 'react';
import axios from 'axios';
import Results from './results.component';
import CityDisplay from "./city-display.component";
import GameRound from "../model/game-round";
import GameOver from "./game-over.component";

export default class TempGuessGame extends Component {
    constructor(props) {
        super(props);

        this.onChangeTempGuess = this.onChangeTempGuess.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onPlayAgain = this.onPlayAgain.bind(this);

        // check if in development mode
        if (process.env.REACT_APP_ENV === "development") {
            this.prefix = "http://localhost:5000/";
        } else {
            this.prefix = "https://weatherguesser.isaacsung.net/";
        }

        this.gameRound = new GameRound();

        this.state = {
            city: '',
            cityAscii: '',
            country: '',
            countryCode: '',
            state: '',
            tempGuess: 0,
            correctTemp: 0,
            displayResults: false,
            resultDifference: 0,
            score: 0,
            gameOver: false,
            scoreEarned: 0
        }
    }

    componentDidMount() {
        this.getRandomCity();
    }

    getRandomCity() {
        axios.get(`${this.prefix}temperatures/random`)
            .then(response => {
                if ("city" in response.data) {
                    if (this.gameRound.addCity(response.data.city, response.data.countryCode)) {
                        this.setState({
                            city: response.data.city,
                            cityAscii: response.data.cityAscii,
                            country: response.data.country,
                            countryCode: response.data.countryCode,
                            state: response.data.state,
                            displayResults: false,
                            resultDifference: 0,
                            tempGuess: 0
                        });
                    } else {
                        this.getRandomCity();
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onChangeTempGuess(e) {
        this.setState({
            tempGuess: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const tempGuess = this.state.tempGuess;

        let params = `city=${this.state.cityAscii}&country=${this.state.countryCode}`;
        params = encodeURI(params);

        axios.get(`${this.prefix}temperatures?${params}`)
            .then(response => {
                if ("temperature" in response.data) {
                    let temperature = Math.round(response.data.temperature);
                    let difference = Math.abs(tempGuess - temperature);
                    let scoreEarned = this.gameRound.updateScore(difference);

                    if (this.gameRound.isGameOver()) {
                        this.setState({
                            correctTemp: temperature,
                            displayResults: true,
                            resultDifference: difference,
                            score: this.gameRound.score,
                            gameOver: true,
                            scoreEarned: scoreEarned
                        });
                    } else {
                        this.setState({
                            correctTemp: temperature,
                            displayResults: true,
                            resultDifference: difference,
                            score: this.gameRound.score,
                            scoreEarned: scoreEarned
                        });
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    onNext(e) {
        e.preventDefault();
        this.getRandomCity();
    }

    onPlayAgain(e) {
        e.preventDefault();
        this.gameRound.reset();
        this.setState({
            city: '',
            cityAscii: '',
            country: '',
            countryCode: '',
            state: '',
            tempGuess: 0,
            correctTemp: 0,
            displayResults: false,
            resultDifference: 0,
            score: 0,
            gameOver: false
        });
        this.getRandomCity();
    }

    render() {
        return (
            <div id="city-temp-guess">
                {
                    !this.state.gameOver &&
                    <div className="main-game">
                        Cities: {this.gameRound.cityNumber} / {GameRound.NUM_CITIES}
                        <h3><strong>Score: {this.state.score}</strong></h3>
                        <CityDisplay city={this.state.city} state={this.state.state} country={this.state.country}
                                        mode={this.props.mode}/>
                        <form id="city-temp-form" onSubmit={this.onSubmit}>
                            <div className={`${!this.state.displayResults ? "" : "d-none"} form-group`}>
                                <label>Temperature ({'\xB0'}F)?</label>
                                <input
                                    type="text"
                                    id="temp-guess-input"
                                    className="form-control"
                                    value={this.state.tempGuess}
                                    onChange={this.onChangeTempGuess}
                                />
                            </div>
                            <div className="form-group">
                                {!this.state.displayResults &&
                                <input type="submit" value="Submit Guess" className="btn btn-primary"/>
                                }
                            </div>
                        </form>
                    </div>
                }
                {
                    this.state.displayResults &&
                    <Results
                        tempGuess={this.state.tempGuess}
                        correctTemp={this.state.correctTemp}
                        resultDifference={this.state.resultDifference}
                        scoreEarned={this.state.scoreEarned}
                        city={this.state.city}
                        gameOver={this.state.gameOver}
                        buttonText="Next City"
                        onButtonClick={this.onNext}
                    />
                }
                {
                    this.state.gameOver &&
                    <GameOver
                        gameRound={this.gameRound}
                        buttonText="Play Again"
                        onButtonClick={this.onPlayAgain}
                    />
                }
            </div>
        )
    }
}
