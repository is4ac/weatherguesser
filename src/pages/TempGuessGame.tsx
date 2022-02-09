import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/material'
import Results from 'src/components/temp-guesser/Results'
import CityPrompt from 'src/components/temp-guesser/CityPrompt'
import GameRound from 'src/model/game-round'
import GameOver from 'src/components/general/GameOver'
import Layout from 'src/components/page-parts/Layout'
import GoogleMap from 'src/components/general/GoogleMap'
import TempGuessForm from 'src/components/temp-guesser/TempGuessForm'
import ScoreDisplay from 'src/components/general/ScoreDisplay'
import CityStepper from 'src/components/general/CityStepper'

const steps = new Array(GameRound.NUM_CITIES).fill('c')

const TempGuessGame = (): JSX.Element => {
  // check if in development mode
  let prefix = ''
  if (process.env.REACT_APP_ENV === 'development') {
    prefix = 'http://localhost:5000/'
  } else {
    prefix = 'https://weatherguesser.isaacsung.net/api/'
  }

  const gameRoundRef = useRef(new GameRound())

  const [city, setCity] = useState('')
  const [cityAscii, setCityAscii] = useState('')
  const [country, setCountry] = useState('')
  const [countryCode, setCountryCode] = useState('')
  const [state, setState] = useState('')
  const [tempGuess, setTempGuess] = useState('')
  const [correctTemp, setCorrectTemp] = useState(0)
  const [displayResults, setDisplayResults] = useState(false)
  const [score, setScore] = useState(0)
  const [scoreEarned, setScoreEarned] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    getRandomCity()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRandomCity = () => {
    axios
      .get(`${prefix}temperatures/random`)
      .then((response) => {
        if ('city' in response.data) {
          if (gameRoundRef.current.addCity(response.data.city, response.data.countryCode)) {
            setCity(response.data.city)
            setCityAscii(response.data.cityAscii)
            setCountry(response.data.country)
            setCountryCode(response.data.countryCode)
            setState(response.data.state)
            setDisplayResults(false)
            setTempGuess('')
          } else {
            getRandomCity()
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onTempGuessChange = (guess: string) => {
    setTempGuess(guess)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    let params = `city=${cityAscii}&country=${countryCode}`
    params = encodeURI(params)

    axios
      .get(`${prefix}temperatures?${params}`)
      .then((response) => {
        if ('temperature' in response.data) {
          const tempGuessNum = parseInt(tempGuess)
          const temperature = Math.round(response.data.temperature)
          const difference = Math.abs(tempGuessNum - temperature)
          setScoreEarned(gameRoundRef.current.updateScore(difference))
          setCorrectTemp(temperature)
          setDisplayResults(true)
          setScore(gameRoundRef.current.score)

          if (gameRoundRef.current.isGameOver()) {
            setGameOver(true)
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onNext = (e: React.MouseEvent) => {
    e.preventDefault()
    getRandomCity()
  }

  const onPlayAgain = (e: React.MouseEvent) => {
    e.preventDefault()
    gameRoundRef.current.reset()

    setTempGuess('')
    setCorrectTemp(0)
    setDisplayResults(false)
    setScore(0)
    setScoreEarned(0)
    setGameOver(false)

    getRandomCity()
  }

  let location
  if (state && state !== '') {
    location = `${city}, ${state}, ${country}`
  } else {
    location = `${city}, ${country}`
  }

  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {!displayResults && !gameOver && (
          <Box sx={{ mb: 2 }}>
            <CityPrompt location={location} />
          </Box>
        )}

        {displayResults && (
          <Box sx={{ mb: 2 }}>
            <Results
              correctTemp={correctTemp}
              guessedTemp={parseInt(tempGuess)}
              scoreEarned={scoreEarned}
              city={city}
            />
          </Box>
        )}

        {gameOver && (
          <Box sx={{ mb: 4 }}>
            <GameOver gameRound={gameRoundRef.current} onButtonClick={onPlayAgain} />
          </Box>
        )}

        <Box>
          <TempGuessForm
            onSubmit={onSubmit}
            displayResults={displayResults}
            tempGuess={tempGuess}
            onTempGuessChange={onTempGuessChange}
            onNextButtonClick={onNext}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <ScoreDisplay label='Score' score={score} />
        </Box>

        <Box sx={{ mb: 4 }}>
          <CityStepper
            activeStep={gameOver ? gameRoundRef.current.cityNumber : gameRoundRef.current.cityNumber - 1}
            steps={steps}
          />
        </Box>

        <GoogleMap location={location} />
      </Box>
    </Layout>
  )
}

export default TempGuessGame
