import React, { Component } from 'react';

export default class GameOver extends Component {
    render() {
        return (
            <div className="game-over-display">
                <div className="alert alert-success" role="alert">Round over!</div>
                <h3>Final score: <strong>{this.props.gameRound.score}</strong></h3>
                <button type="button"
                        className="btn btn-primary"
                        onClick={this.props.onButtonClick}>{this.props.buttonText}</button>
            </div>
        );
    }
}
