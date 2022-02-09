import React, { Component } from 'react'
import axios from 'axios'
import { Box } from '@mui/material'
import Results from 'src/components/Results'
import CityPrompt from 'src/components/CityPrompt'
import GameRound from 'src/model/game-round'
import GameOver from 'src/components/GameOver'
import Layout from 'src/components/page-parts/Layout'
import GoogleMap from 'src/components/GoogleMap'
import TempGuessForm from 'src/components/TempGuessForm'
import ScoreDisplay from 'src/components/ScoreDisplay'
import CityStepper from 'src/components/CityStepper'

const steps = new Array(GameRound.NUM_CITIES).fill('c')

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

  onTempGuessChange(guess) {
    this.setState({
      tempGuess: guess,
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const tempGuess = parseInt(this.state.tempGuess)

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
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {!this.state.displayResults && !this.state.gameOver && (
            <Box sx={{ mb: 2 }}>
              <CityPrompt location={location} />
            </Box>
          )}

          {this.state.displayResults && (
            <Box sx={{ mb: 2 }}>
              <Results
                correctTemp={this.state.correctTemp}
                guessedTemp={this.state.tempGuess}
                scoreEarned={this.state.scoreEarned}
                city={this.state.city}
              />
            </Box>
          )}

          {this.state.gameOver && (
            <Box sx={{ mb: 4 }}>
              <GameOver gameRound={this.gameRound} onButtonClick={this.onPlayAgain} />
            </Box>
          )}

          <Box>
            <TempGuessForm
              onSubmit={this.onSubmit}
              displayResults={this.state.displayResults}
              tempGuess={this.state.tempGuess}
              onTempGuessChange={this.onTempGuessChange}
              onNextButtonClick={this.onNext}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <ScoreDisplay label='Score' score={this.state.score} />
          </Box>

          <Box sx={{ mb: 4 }}>
            <CityStepper
              activeStep={this.state.gameOver ? this.gameRound.cityNumber : this.gameRound.cityNumber - 1}
              steps={steps}
            />
          </Box>

          <GoogleMap location={location} />
        </Box>
      </Layout>
    )
  }
}
