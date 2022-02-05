import React, { Component } from 'react'
import axios from 'axios'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'
import Results from 'src/components/Results'
import CityPrompt from 'src/components/CityPrompt'
import GameRound from 'src/model/game-round'
import GameOver from 'src/components/GameOver'
import Layout from 'src/components/page-parts/Layout'
import GoogleMap from 'src/components/GoogleMap'
import TempGuessForm from 'src/components/TempGuessForm'

const steps = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

export default class TempGuessGame extends Component {
  constructor(props) {
    super(props)

    this.onTempGuessChange = this.onTempGuessChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onNext = this.onNext.bind(this)
    this.onPlayAgain = this.onPlayAgain.bind(this)

    // check if in development mode
    if (process.env.REACT_APP_ENV === 'development') {
      this.prefix = 'http://localhost:5000/'
    } else {
      this.prefix = 'https://weatherguesser.isaacsung.net/api/'
    }

    this.gameRound = new GameRound()

    this.state = {
      city: '',
      cityAscii: '',
      country: '',
      countryCode: '',
      state: '',
      tempGuess: 0,
      correctTemp: 0,
      displayResults: false,
      resultDifference: 0,
      score: 0,
      gameOver: false,
      scoreEarned: 0,
    }
  }

  componentDidMount() {
    this.getRandomCity()
  }

  getRandomCity() {
    axios
      .get(`${this.prefix}temperatures/random`)
      .then((response) => {
        if ('city' in response.data) {
          if (this.gameRound.addCity(response.data.city, response.data.countryCode)) {
            this.setState({
              city: response.data.city,
              cityAscii: response.data.cityAscii,
              country: response.data.country,
              countryCode: response.data.countryCode,
              state: response.data.state,
              displayResults: false,
              resultDifference: 0,
              tempGuess: 0,
            })
          } else {
            this.getRandomCity()
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onTempGuessChange(e) {
    this.setState({
      tempGuess: e.target.value,
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const tempGuess = this.state.tempGuess

    let params = `city=${this.state.cityAscii}&country=${this.state.countryCode}`
    params = encodeURI(params)

    axios
      .get(`${this.prefix}temperatures?${params}`)
      .then((response) => {
        if ('temperature' in response.data) {
          let temperature = Math.round(response.data.temperature)
          let difference = Math.abs(tempGuess - temperature)
          let scoreEarned = this.gameRound.updateScore(difference)

          if (this.gameRound.isGameOver()) {
            this.setState({
              correctTemp: temperature,
              displayResults: true,
              resultDifference: difference,
              score: this.gameRound.score,
              gameOver: true,
              scoreEarned: scoreEarned,
            })
          } else {
            this.setState({
              correctTemp: temperature,
              displayResults: true,
              resultDifference: difference,
              score: this.gameRound.score,
              scoreEarned: scoreEarned,
            })
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onNext(e) {
    e.preventDefault()
    this.getRandomCity()
  }

  onPlayAgain(e) {
    e.preventDefault()
    this.gameRound.reset()
    this.setState({
      city: '',
      cityAscii: '',
      country: '',
      countryCode: '',
      state: '',
      tempGuess: 0,
      correctTemp: 0,
      displayResults: false,
      resultDifference: 0,
      score: 0,
      gameOver: false,
    })
    this.getRandomCity()
  }

  render() {
    let location
    if (this.state.state && this.state.state !== '') {
      location = `${this.state.city}, ${this.state.state}, ${this.state.country}`
    } else {
      location = `${this.state.city}, ${this.state.country}`
    }

    return (
      <Layout>
        {!this.state.gameOver && (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {!this.state.displayResults && (
              <Box sx={{ mb: 2 }}>
                <CityPrompt location={location} />
              </Box>
            )}

            <Box>
              <TempGuessForm
                onSubmit={this.onSubmit}
                displayResults={this.state.displayResults}
                tempGuess={this.state.tempGuess}
                onTempGuessChange={this.onTempGuessChange}
              />
            </Box>

            {this.state.displayResults && (
              <Box sx={{ mb: 2 }}>
                <Results
                  tempGuess={this.state.tempGuess}
                  correctTemp={this.state.correctTemp}
                  resultDifference={this.state.resultDifference}
                  scoreEarned={this.state.scoreEarned}
                  city={this.state.city}
                  gameOver={this.state.gameOver}
                  buttonText='Next City'
                  onButtonClick={this.onNext}
                />
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <Typography variant='button'>Score: {this.state.score}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
              <Typography variant='button'>Cities:</Typography>
              <Stepper activeStep={this.gameRound.cityNumber - 1}>
                {steps.map((label, index) => {
                  return (
                    <Step
                      key={label}
                      // sx={{
                      //   '& .MuiStepLabel-root .Mui-completed': {
                      //     color: 'secondary.main', // circle color (COMPLETED)
                      //   },
                      //   '& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel': {
                      //     color: 'grey.500', // Just text label (COMPLETED)
                      //   },
                      //   '& .MuiStepLabel-root .Mui-active': {
                      //     color: 'secondary.main', // circle color (ACTIVE)
                      //   },
                      //   '& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel': {
                      //     color: 'common.white', // Just text label (ACTIVE)
                      //   },
                      //   '& .MuiStepLabel-root .Mui-active .MuiStepIcon-text': {
                      //     fill: 'secondary.contrastText', // circle's number (ACTIVE)
                      //   },
                      // }}
                    >
                      <StepLabel>{''}</StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
            </Box>

            <GoogleMap location={location} />
          </Box>
        )}
        {this.state.gameOver && <GameOver gameRound={this.gameRound} onButtonClick={this.onPlayAgain} />}
      </Layout>
    )
  }
}
