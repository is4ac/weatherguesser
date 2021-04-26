const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');
const methods = require('./lib/lib');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to cloud MongoDB Atlas
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Set up routes
const temperaturesRouter = require('./routes/temperatures');
app.use('/api', temperaturesRouter);

// Set up scheduled updates of city temperature data
// Schedule tasks to be run on the server.
cron.schedule('*/6 * * * * *', () => {
    methods.updateCityTemps();
});

// Run server on port
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
