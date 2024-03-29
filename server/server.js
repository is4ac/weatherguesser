const express = require('express')
const cors = require('cors')
const path = require('path')
const mongoose = require('mongoose')
const cron = require('node-cron')
const methods = require('./lib/lib')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Connect to cloud MongoDB Atlas
const uri = process.env.ATLAS_URI
mongoose.connect(uri)
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

// Set up routes
const temperaturesRouter = require(path.join(__dirname, 'api', 'routes', 'temperatures'))
app.use('/temperatures', temperaturesRouter)

// Set up scheduled updates of city temperature data
// Schedule tasks to be run on the server only if it's not in dev mode.
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'development') {
  cron.schedule('*/6 * * * * *', () => {
    methods.updateCityTemps()
  })
} 

// static files (build of frontend)
// need to serve through server so that Vercel works
app.use(express.static(path.join(__dirname, '../frontend', 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
})

// Run server on port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
