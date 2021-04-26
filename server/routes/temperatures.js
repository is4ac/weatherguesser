const router = require('express').Router();
let Temperature = require('../models/temperature.model');

// Get city, country temp
router.route('/temperatures').get((req, res) => {
    const city = req.query.city;
    const country = req.query.country;

    Temperature.findOne({ cityAscii: city, countryCode: country })
        .then(temp => res.json(temp))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/temperatures/random').get((req, res) => {
    // Get the count of all users
    Temperature.countDocuments()
        .then(count => {
            // Get a random entry
            let random = Math.floor(Math.random() * count)

            // Again query all users but only fetch one offset by our random #
            Temperature.findOne().skip(random).exec(
                function (err, result) {
                    res.json(result);
                })
        });
});

module.exports = router;
