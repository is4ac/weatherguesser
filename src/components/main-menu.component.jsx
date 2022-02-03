import React, { Component } from 'react';

export default class MainMenu extends Component {
    render() {
        return (
            <div className="container-fluid menu-container">
                <h1>WeatherGuesser</h1>
                Welcome to WeatherGuesser! Choose a game mode to start playing: <br/>
                <br/>
                <div className="card-deck">
                    {true ? <div></div>
                        :
                        <div>
                            <a href="cities" className="card text-decoration-none stretched-link">
                                <div className="card-body">
                                    <h5 className="card-title">City/Country Names</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up
                                        the bulk of the card's content.</p>
                                </div>
                            </a>

                            <a href="maps" className="card text-decoration-none stretched-link">
                                <div className="card-body">
                                    <h5 className="card-title">Map Locations (No Labels)</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up
                                        the bulk of the card's content.</p>
                                </div>
                            </a>
                        </div>
                    }

                        <a href="citiesandmaps" className="card text-decoration-none stretched-link">
                            <div className="card-body">
                                <h5 className="card-title">Map Locations with City Labels</h5>
                                <p className="card-text">Guess the current temperatures of cities around the world! This
                                mode shows you the city/country name along with a location on the map.</p>
                            </div>
                        </a>
                </div>
            </div>
        )
    }
}
