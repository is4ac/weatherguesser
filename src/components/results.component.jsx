import React, { Component } from 'react';

export default class Results extends Component {
    render() {
        let alertClass = "";
        let message = "";

        if (this.props.resultDifference === 0) {
            alertClass = "alert-success";
            message = `Perfect!! You earned ${this.props.scoreEarned} points!`;
        } else if (this.props.resultDifference <= 5) {
            alertClass = "alert-primary";
            message = `So close! Only off by ${this.props.resultDifference}\xB0F! You earned ${this.props.scoreEarned} points!`;
        } else if (this.props.resultDifference <= 20) {
            alertClass = "alert-warning";
            message = `You were off by ${this.props.resultDifference}\xB0F! You earned ${this.props.scoreEarned} points!`;
        } else {
            alertClass = "alert-danger";
            message = `You were off by ${this.props.resultDifference}\xB0F! You lost ${-this.props.scoreEarned} points...`;
        }

        return (
            <div className="results">
                <div className={`alert ${alertClass}`} role="alert">
                    {message}
                </div>

                Your guess: <strong>{this.props.tempGuess}</strong> <br/>

                The current temperature in <strong>{this.props.city}</strong> is <strong>{this.props.correctTemp}</strong>!
                <br/>

                {!this.props.gameOver &&
                <button type="button"
                        className="btn btn-secondary"
                        onClick={this.props.onButtonClick}>{this.props.buttonText}</button>
                }
            </div>
        );
    }
}
