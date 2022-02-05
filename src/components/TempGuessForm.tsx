import { Alert, Box, Button, Container, Grow, TextField } from '@mui/material'
import React, { useState } from 'react'

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

  return (
    <form
      id='city-temp-form'
      onSubmit={(event: React.FormEvent) => {
        event.preventDefault()

        console.log(tempGuess)
        if (Number.isFinite(parseInt(tempGuess))) {
          onSubmit(event)
        } else {
          // Validation error on submit
          setHasError(true)
        }
      }}
    >
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = event.target
              const parsedInt = parseInt(value)
              if (value === '' || value === '-') {
                setHasError(false)
                onTempGuessChange(value)
              } else if (Number.isFinite(parsedInt)) {
                setHasError(false)
                onTempGuessChange(parsedInt.toString())
              }
            }}
            inputProps={{ inputMode: 'numeric', pattern: '-?[0-9]*', style: { textAlign: 'right' } }}
            title='Whole integers only'
          />
        </Box>

        {displayResults ? (
          <Button color='secondary' variant='contained' onClick={onNextButtonClick} sx={{ ml: 4 }}>
            Next
          </Button>
        ) : (
          <Button color='secondary' variant='contained' type='submit' sx={{ ml: 4 }}>
            Submit
          </Button>
        )}
      </Container>

      <Grow in={hasError} timeout={400} easing='ease-in-out'>
        <Alert severity='error'>Must be a valid whole number.</Alert>
      </Grow>
    </form>
  )
}

export default TempGuessForm
