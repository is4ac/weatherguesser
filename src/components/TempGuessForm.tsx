import { Box, Container, TextField } from '@mui/material'
import React, { useState } from 'react'
import AnimatedAlert from './AnimatedAlert'
import GuessFormButton from './GuessFormButton'

const TempGuessForm = ({
  onSubmit,
  displayResults,
  tempGuess,
  onTempGuessChange,
  onNextButtonClick,
}: {
  onSubmit: (event: React.FormEvent) => void
  displayResults: boolean
  tempGuess: string
  onTempGuessChange: (guess: string) => void
  onNextButtonClick: (event: React.MouseEvent) => void
}): JSX.Element => {
  const [hasError, setHasError] = useState<boolean>(false)

  const textFieldDisabled = displayResults ? true : false

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    if (Number.isFinite(parseInt(tempGuess))) {
      onSubmit(event)
    } else {
      // Validation error on submit
      setHasError(true)
    }
  }

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const parsedInt = parseInt(value)
    if (value === '' || value === '-') {
      setHasError(false)
      onTempGuessChange(value)
    } else if (Number.isFinite(parsedInt)) {
      setHasError(false)
      onTempGuessChange(parsedInt.toString())
    }
  }

  return (
    <form id='city-temp-form' onSubmit={submitHandler}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& .MuiTextField-root': { width: '12ch' },
          }}
        >
          <TextField
            disabled={textFieldDisabled}
            type='text'
            variant='outlined'
            size='small'
            label='Temp. (°F)'
            value={tempGuess}
            onChange={changeHandler}
            inputProps={{ pattern: '-?[0-9]*', style: { textAlign: 'right' } }}
            title='Whole integers only'
          />
        </Box>

        <Box sx={{ ml: 4 }}>
          <GuessFormButton next={displayResults} onNext={onNextButtonClick} />
        </Box>
      </Container>

      <AnimatedAlert show={hasError} message='Must be a valid whole number.' />
    </form>
  )
}

export default TempGuessForm
