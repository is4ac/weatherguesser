import React, { Component } from 'react';

export default class CityDisplay extends Component {
    render() {
        let display = "";
        if (this.props.state != null && this.props.state !== "") {
            display = `${this.props.city}, ${this.props.state}, ${this.props.country}`;
        } else {
            display = `${this.props.city}, ${this.props.country}`;
        }

        return (
            <div className="city-display-prompt">
                <h3>Guess the current temperature for <span className="font-weight-bold">{display}</span>!</h3>
            </div>
        );
    }
}
