import { AlertColor, Box } from '@mui/material'
import AnimatedAlert from './AnimatedAlert'
import CurrentTempDisplay from './CurrentTempDisplay'

const Results = ({
  guessedTemp,
  scoreEarned,
  correctTemp,
  city,
}: {
  guessedTemp: number
  scoreEarned: number
  correctTemp: number
  city: string
}): JSX.Element => {
  const resultDifference = Math.abs(correctTemp - guessedTemp)
  let alertVariant: AlertColor = 'success'
  let message = ''

  if (resultDifference === 0) {
    alertVariant = 'success'
    message = `Your guess of ${guessedTemp} was perfect!! You earned ${scoreEarned} points!`
  } else if (resultDifference <= 5) {
    alertVariant = 'info'
    message = `So close! Your guess of ${guessedTemp} was only off by ${resultDifference}\xB0F! You earned ${scoreEarned} points!`
  } else if (resultDifference <= 20) {
    alertVariant = 'warning'
    message = `Your guess of ${guessedTemp} was off by ${resultDifference}\xB0F! You earned ${scoreEarned} points!`
  } else {
    alertVariant = 'error'
    message = `Your guess of ${guessedTemp} was off by ${resultDifference}\xB0F! You lost ${-scoreEarned} points...`
  }

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <AnimatedAlert show={true} message={message} severity={alertVariant} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CurrentTempDisplay city={city} temp={correctTemp} />
      </Box>
    </Box>
  )
}

export default Results
