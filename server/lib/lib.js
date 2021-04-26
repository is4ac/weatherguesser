let Temperature = require('../models/temperature.model');
const fetch = require('node-fetch');
const csv = require('csv-parser');
const fs = require('fs');
const path = require("path");
require('dotenv').config();

function fetchCity(cityObj) {
    const city = cityObj.city;
    const cityAscii = cityObj.cityAscii;
    const countryCode = cityObj.countryCode;
    const country = cityObj.country;
    const state = cityObj.state;

    let q = "";
    if (state.length > 0) {
        q = cityAscii + "," + state + "," + countryCode;
    } else {
        q = cityAscii + "," + countryCode;
    }
    q = encodeURI(q);

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${q}` +
        `&units=imperial&appid=${process.env.OPENWEATHER_KEY}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // check data
            if ('cod' in data && data.cod === "404") {
                console.log(data);
                return;
            }

            // check if document exists
            Temperature.findOne({ cityAscii: cityAscii, countryCode: countryCode })
                .then(result => {
                    const temperature = data.main.temp;

                    if (result == null) {
                        const newTemp = new Temperature({
                            city,
                            cityAscii,
                            state,
                            countryCode,
                            country,
                            temperature
                        });

                        newTemp.save()
                            .then(() => console.log(`Temperature for ${city}, ${country} added as ${temperature}!`))
                            .catch(err => console.log('Error: ' + err));
                    } else {
                        Temperature.updateOne({cityAscii: cityAscii, countryCode: countryCode},
                            { $set: {temperature: temperature}})
                            .then(value => {
                                console.log(`Temperature for ${city}, ${country} updated to ${temperature}!`);
                            })
                            .catch(err => console.log("Error: " + err));
                    }
                })
                .catch(err => console.log("Error: " + err));
        })
        .catch(err => console.log('Error: ' + err));
}

function updateOldestCity() {
    Temperature.findOne({}, {}, { sort: { 'updatedAt' : 1 } })
        .then(res => {
            console.log("Oldest city is: " + res.city)
            fetchCity({
                city: res.city,
                cityAscii: res.cityAscii,
                countryCode: res.countryCode,
                country: res.country,
                state: res.state || ""
            });
        })
        .catch(err => console.log('Error: ' + err));
}

function updateNextCity(cities, index) {
    if (index >= cities.length) {
        updateOldestCity();
    } else {
        const cityObj = cities[index];
        const city = cityObj.city;
        const cityAscii = cityObj.cityAscii;
        const countryCode = cityObj.countryCode;
        const country = cityObj.country;
        const state = cityObj.state;

        Temperature.exists({cityAscii: cityAscii, countryCode: countryCode})
            .then(res => {
                if (!res) {
                    fetchCity({
                        city: city,
                        cityAscii: cityAscii,
                        countryCode: countryCode,
                        country: country,
                        state: state
                    });
                } else {
                    updateNextCity(cities, index + 1);
                }
            });
    }
}

function updateCityTemps() {
    console.log("Updating city temps.");

    // load cities from .csv file
    let cities = [];
    let stream = fs.createReadStream(path.resolve(__dirname, '../imports/cities.csv'))
        .pipe(csv())
        .on('data', (row) => {
            const obj = {
                city: row.city,
                cityAscii: row.cityAscii,
                countryCode: row.countryCode,
                country: row.country,
                state: row.state
            };

            cities.push(obj);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
            Temperature.countDocuments()
                .then(value => {
                    // Check to see if database is full, if so, then just update oldest city
                    if (value == cities.length) {
                        updateOldestCity();
                    } else {
                        // recurse through until you find the first missing city
                        updateNextCity(cities, 0);
                    }
                })
                .catch(err => console.log("Error: " + err));
        });
}

module.exports = { updateCityTemps };
