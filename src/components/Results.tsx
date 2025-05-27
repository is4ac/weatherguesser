import { Box, Stack } from '@mantine/core'
import AnimatedAlert from './AnimatedAlert'
import CurrentTempDisplay from './CurrentTempDisplay'

interface ResultsProps {
  guessedTemp: number
  scoreEarned: number
  correctTemp: number
  city: string
}

export default function Results({ guessedTemp, scoreEarned, correctTemp, city }: ResultsProps) {
  const resultDifference = Math.abs(correctTemp - guessedTemp)
  let alertColor: 'red' | 'yellow' | 'blue' | 'green' = 'green'
  let message = ''

  if (resultDifference === 0) {
    alertColor = 'green'
    message = `Your guess of ${guessedTemp} was perfect!! You earned ${scoreEarned} points!`
  } else if (resultDifference <= 5) {
    alertColor = 'blue'
    message = `So close! Your guess of ${guessedTemp} was only off by ${resultDifference}°F! You earned ${scoreEarned} points!`
  } else if (resultDifference <= 20) {
    alertColor = 'yellow'
    message = `Your guess of ${guessedTemp} was off by ${resultDifference}°F! You earned ${scoreEarned} points!`
  } else {
    alertColor = 'red'
    message = `Your guess of ${guessedTemp} was off by ${resultDifference}°F! You lost ${-scoreEarned} points...`
  }

  return (
    <Stack gap="md">
      <AnimatedAlert show={true} message={message} color={alertColor} />
      <Box ta="center">
        <CurrentTempDisplay city={city} temp={correctTemp} />
      </Box>
    </Stack>
  )
}