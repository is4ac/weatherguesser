import { Box, Button, Container, TextField } from '@mui/material'
import React from 'react'

const TempGuessForm = ({
  onSubmit,
  displayResults,
  tempGuess,
  onTempGuessChange,
}: {
  onSubmit: (event: React.FormEvent) => void
  displayResults: boolean
  tempGuess: number
  onTempGuessChange: (event: React.ChangeEvent) => void
}): JSX.Element => {
  const displayForm = displayResults ? 'none' : 'flex'

  return (
    <form id='city-temp-form' onSubmit={onSubmit}>
      <Container
        sx={{
          display: displayForm,
          justifyContent: 'center',
          mt: 2,
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <TextField
            type='number'
            variant='outlined'
            size='small'
            label='Temperature (°F)'
            value={tempGuess}
            onChange={onTempGuessChange}
          />
        </Box>
        {!displayResults && (
          <Button color='secondary' variant='contained' type='submit' sx={{ ml: 4 }}>
            Submit Guess
          </Button>
        )}
      </Container>
    </form>
  )
}

export default TempGuessForm
