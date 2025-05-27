import { Group, Slider, Stack } from '@mantine/core'
import IntegerTextField from './IntegerTextField'

interface Mark {
  value: number
  label: string
}

interface InputSliderProps {
  marks: Mark[]
  height: number
  min: number
  max: number
  step: number
  disabled: boolean
  label: string
  value: string
  onChange: (value: string) => void
  onError: (error: boolean) => void
}

export default function InputSlider({
  marks,
  height,
  min,
  max,
  step,
  disabled,
  label,
  value,
  onChange,
  onError
}: InputSliderProps) {
  const handleSliderChange = (newValue: number) => {
    onChange(newValue.toString())
    onError(false)
  }

  const handleBlur = () => {
    const num = parseInt(value)
    if (!num) {
      return
    }

    if (num > max) {
      onChange(max.toString())
    } else if (num < min) {
      onChange(min.toString())
    }
  }

  const sliderValue = parseInt(value) || 0

  return (
    <Group align="center" gap="lg">
      <Stack h={height} justify="center">
        <Slider
          orientation="vertical"
          value={sliderValue}
          step={step}
          marks={marks}
          min={min}
          max={max}
          onChange={handleSliderChange}
          disabled={disabled}
          h={height - 40}
          thumbLabel="always"
        />
      </Stack>
      
      <IntegerTextField
        disabled={disabled}
        value={value}
        label={label}
        onChange={onChange}
        onError={onError}
        onBlur={handleBlur}
      />
    </Group>
  )
}