const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const temperatureSchema = new Schema({
    city: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    cityAscii: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    state: {
        type: String,
        required: false,
        trim: true
    },
    countryCode: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },
    country: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    temperature: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

module.exports = Temperature;
