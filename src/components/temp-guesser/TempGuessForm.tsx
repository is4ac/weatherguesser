import { Box, Container, Stack } from '@mui/material'
import React, { useState, useContext, useMemo } from 'react'
import AnimatedAlert from '../general/AnimatedAlert'
import GuessFormButton from '../general/GuessFormButton'
import InputSlider from '../general/InputSlider'
import { TempModeContext } from 'src/contexts'

const TempGuessForm = ({
  onSubmit,
  textFieldDisabled,
  tempGuess,
  onTempGuessChange,
  onNextButtonClick,
}: {
  onSubmit: (event: React.FormEvent) => void
  textFieldDisabled: boolean
  tempGuess: string
  onTempGuessChange: (guess: string) => void
  onNextButtonClick: (event: React.MouseEvent) => void
}): JSX.Element => {
  const tempMode = useContext(TempModeContext)

  const [hasError, setHasError] = useState<boolean>(false)

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    if (Number.isFinite(parseInt(tempGuess))) {
      onSubmit(event)
    } else {
      // Validation error on submit
      setHasError(true)
    }
  }

  const marks = useMemo(
    () =>
      tempMode.mode === 'F'
        ? [
            {
              value: 0,
              label: '0°F',
            },
            {
              value: 140,
              label: '140°F',
            },
            {
              value: -140,
              label: '-140°F',
            },
          ]
        : [
            {
              value: 0,
              label: '0°C',
            },
            {
              value: 60,
              label: '60°C',
            },
            {
              value: -96,
              label: '-96°C',
            },
          ],
    [tempMode.mode],
  )

  const max = tempMode.mode === 'F' ? 140 : 60
  const min = tempMode.mode === 'F' ? -140 : -96

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
        <Stack spacing={1} direction='row' alignItems='center'>
          <InputSlider
            height={250}
            marks={marks}
            min={min}
            max={max}
            step={tempMode.mode === 'F' ? 1 : 0.5}
            label={tempMode.mode === 'F' ? 'Temp. (°F)' : 'Temp. (°C)'}
            disabled={textFieldDisabled}
            value={tempGuess}
            onChange={onTempGuessChange}
            onError={setHasError}
          />

          <Box sx={{ ml: 4 }}>
            <GuessFormButton next={textFieldDisabled} onNext={onNextButtonClick} />
          </Box>
        </Stack>
      </Container>

      <AnimatedAlert show={hasError} message='Must be a valid whole number.' />
    </form>
  )
}

export default TempGuessForm
