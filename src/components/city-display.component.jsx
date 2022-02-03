import React, { Component } from 'react';

export default class CityDisplay extends Component {
    render() {
        let display;
        if (this.props.state != null && this.props.state !== "") {
            display = `${this.props.city}, ${this.props.state}, ${this.props.country}`;
        } else {
            display = `${this.props.city}, ${this.props.country}`;
        }

        let params = `key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&q=${display.replace(" ", "+")}`;

        return (
            <div className="city-display-prompt">
                <h3>Guess the current temperature for <span className="font-weight-bold">{display}</span>!</h3>
                <iframe
                    title='Map'
                    width="600"
                    height="450"
                    style={{ "border" : "0"}}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps/embed/v1/place?${params}`}>
                </iframe>
            </div>
        );
    }
}
