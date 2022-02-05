import { Alert, AlertColor, Box, Button, Theme, Typography, useTheme } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import React from 'react'

const Results = ({
  resultDifference,
  scoreEarned,
  tempGuess,
  city,
  correctTemp,
  gameOver,
  onButtonClick,
}: {
  resultDifference: number
  scoreEarned: number
  tempGuess: number
  correctTemp: number
  city: string
  gameOver: boolean
  onButtonClick: (event: React.MouseEvent) => void
}): JSX.Element => {
  const theme = useTheme<Theme>()

  let alertVariant: AlertColor = 'success'
  let message = ''

  if (resultDifference === 0) {
    alertVariant = 'success'
    message = `Perfect!! You earned ${scoreEarned} points!`
  } else if (resultDifference <= 5) {
    alertVariant = 'info'
    message = `So close! Only off by ${resultDifference}\xB0F! You earned ${scoreEarned} points!`
  } else if (resultDifference <= 20) {
    alertVariant = 'warning'
    message = `You were off by ${resultDifference}\xB0F! You earned ${scoreEarned} points!`
  } else {
    alertVariant = 'error'
    message = `You were off by ${resultDifference}\xB0F! You lost ${-scoreEarned} points...`
  }

  return (
    <Box>
      <Alert icon={<ErrorOutlineIcon fontSize='inherit' />} severity={alertVariant} sx={{ mb: 2 }}>
        {message}
      </Alert>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography component='span'>
            Your guess:{' '}
            <Typography fontWeight={600} component='span'>
              {tempGuess}
            </Typography>
          </Typography>

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
            !
          </Typography>
        </Box>

        {!gameOver && (
          <Button color='secondary' variant='contained' onClick={onButtonClick} sx={{ mt: 2, ml: 4 }}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Results
