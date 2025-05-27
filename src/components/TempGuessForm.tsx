import { Box, Container, Group, Stack } from '@mantine/core'
import { useState, useMemo } from 'react'
import AnimatedAlert from './AnimatedAlert'
import GuessFormButton from './GuessFormButton'
import InputSlider from './InputSlider'

interface TempGuessFormProps {
  onSubmit: (event: React.FormEvent) => void
  textFieldDisabled: boolean
  tempGuess: string
  onTempGuessChange: (guess: string) => void
  onNextButtonClick: (event: React.MouseEvent) => void
}

export default function TempGuessForm({
  onSubmit,
  textFieldDisabled,
  tempGuess,
  onTempGuessChange,
  onNextButtonClick
}: TempGuessFormProps) {
  const [hasError, setHasError] = useState<boolean>(false)

  // For now, using Fahrenheit. Can be extended to support temperature mode context
  const tempMode = 'F'

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault()

    if (Number.isFinite(parseInt(tempGuess))) {
      onSubmit(event)
    } else {
      setHasError(true)
    }
  }

  const marks = useMemo(
    () =>
      tempMode === 'F'
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
    [tempMode],
  )

  const max = tempMode === 'F' ? 140 : 60
  const min = tempMode === 'F' ? -140 : -96

  return (
    <form id="city-temp-form" onSubmit={submitHandler}>
      <Container>
        <Stack gap="md" align="center">
          <Group align="center" gap="xl">
            <InputSlider
              height={250}
              marks={marks}
              min={min}
              max={max}
              step={tempMode === 'F' ? 1 : 0.5}
              label={tempMode === 'F' ? 'Temp. (°F)' : 'Temp. (°C)'}
              disabled={textFieldDisabled}
              value={tempGuess}
              onChange={onTempGuessChange}
              onError={setHasError}
            />
            
            <Box>
              <GuessFormButton next={textFieldDisabled} onNext={onNextButtonClick} />
            </Box>
          </Group>
          
          <AnimatedAlert show={hasError} message="Must be a valid whole number." />
        </Stack>
      </Container>
    </form>
  )
}