import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Box, Stack } from '@mantine/core'
import Results from '../components/Results'
import CityPrompt from '../components/CityPrompt'
import GameRound from '../utils/game-round'
import GameOver from '../components/GameOver'
import TempGuessForm from '../components/TempGuessForm'
import ScoreDisplay from '../components/ScoreDisplay'
import CityStepper from '../components/CityStepper'

const steps = new Array(GameRound.NUM_CITIES).fill('c')

function TempGuessGame() {
  // API prefix logic - can be moved to environment config later
  let prefix = ''
  if (import.meta.env.DEV) {
    prefix = 'http://localhost:3000/'
  } else {
    prefix = 'https://weatherguesser.isaacsung.net/'
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
  }, [])

  const getRandomCity = async () => {
    try {
      const response = await fetch(`${prefix}temperatures/random`)
      const data = await response.json()
      
      if ('city' in data) {
        if (gameRoundRef.current.addCity(data.city, data.countryCode)) {
          setCity(data.city)
          setCityAscii(data.cityAscii)
          setCountry(data.country)
          setCountryCode(data.countryCode)
          setState(data.state)
          setDisplayResults(false)
          setTempGuess('')
        } else {
          getRandomCity()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onTempGuessChange = (guess: string) => {
    setTempGuess(guess)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let params = `city=${cityAscii}&country=${countryCode}`
    params = encodeURI(params)

    try {
      const response = await fetch(`${prefix}temperatures?${params}`)
      const data = await response.json()
      
      if ('temperature' in data) {
        const tempGuessNum = parseInt(tempGuess)
        const temperature = Math.round(data.temperature)
        const difference = Math.abs(tempGuessNum - temperature)
        setScoreEarned(gameRoundRef.current.updateScore(difference))
        setCorrectTemp(temperature)
        setDisplayResults(true)
        setScore(gameRoundRef.current.score)

        if (gameRoundRef.current.isGameOver()) {
          setGameOver(true)
        }
      }
    } catch (error) {
      console.log(error)
    }
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
    <Stack gap="md" p="md">
      {!displayResults && !gameOver && (
        <Box>
          <CityPrompt location={location} />
        </Box>
      )}

      {displayResults && (
        <Box>
          <Results
            correctTemp={correctTemp}
            guessedTemp={parseInt(tempGuess)}
            scoreEarned={scoreEarned}
            city={city}
          />
        </Box>
      )}

      {gameOver && (
        <Box>
          <GameOver gameRound={gameRoundRef.current} onButtonClick={onPlayAgain} />
        </Box>
      )}

      {!gameOver && (
        <TempGuessForm
          onSubmit={onSubmit}
          textFieldDisabled={displayResults}
          tempGuess={tempGuess}
          onTempGuessChange={onTempGuessChange}
          onNextButtonClick={onNext}
        />
      )}

      <Box ta="center">
        <ScoreDisplay label="Score" score={score} />
      </Box>

      <Box>
        <CityStepper
          activeStep={gameOver ? gameRoundRef.current.cityNumber : gameRoundRef.current.cityNumber - 1}
          steps={steps}
        />
      </Box>
    </Stack>
  )
}

export const Route = createFileRoute('/game')({
  component: TempGuessGame,
})