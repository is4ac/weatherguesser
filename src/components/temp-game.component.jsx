import React, { Component } from 'react';
import CityTempGuess from './city-temp-guess.component'

export default class TempGame extends Component {
    render() {
        return (
            <div className="gameContainer">
                <h1>WeatherGuessr</h1>
                <CityTempGuess />
            </div>
        )
    }
}
