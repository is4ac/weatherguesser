import { Alert, AlertColor, Box, Theme, Typography, useTheme } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import Grow from '@mui/material/Grow'
import React from 'react'

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
  const theme = useTheme<Theme>()

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
      <Grow in={true} timeout={400} easing='ease-in-out'>
        <Alert
          icon={<ErrorOutlineIcon fontSize='inherit' />}
          severity={alertVariant}
          sx={{
            mb: 2,
          }}
        >
          {message}
        </Alert>
      </Grow>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography component='span'>
            The current temperature in{' '}
            <Typography
              component='span'
              lineHeight='1.7rem'
              padding='0.35rem 0.25rem'
              color={theme.palette.secondary.contrastText}
              bgcolor={theme.palette.secondary.main}
              fontWeight={600}
            >
              {city}
            </Typography>{' '}
            is{' '}
            <Typography fontWeight={600} component='span'>
              {correctTemp}
            </Typography>
            °F!
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Results
