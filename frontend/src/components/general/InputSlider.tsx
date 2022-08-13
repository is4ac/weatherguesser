import Slider from '@mui/material/Slider'
import { Mark } from '@mui/base'
import { Stack } from '@mui/material'
import IntegerTextField from './IntegerTextField'
import React from 'react'

const InputSlider = ({
  marks,
  height,
  min,
  max,
  step,
  disabled,
  label,
  value,
  onChange,
  onError,
}: {
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
}): JSX.Element => {
  const handleSliderChange = (_event: Event, newValue: number | number[]) => {
    onChange(Array.isArray(newValue) ? '0' : newValue.toString())
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

  const sliderValue = parseInt(value)

  return (
    <Stack sx={{ height: height }} spacing={1} direction='row' alignItems='center'>
      <Slider
        orientation='vertical'
        value={sliderValue ? sliderValue : 0}
        valueLabelDisplay='auto'
        step={step}
        marks={marks}
        min={min}
        max={max}
        aria-labelledby='input-slider'
        onChange={handleSliderChange}
        disabled={disabled}
      />

      <IntegerTextField
        disabled={disabled}
        value={value}
        label={label}
        onChange={onChange}
        onError={onError}
        inputProps={{
          'aria-labelledby': 'input-slider',
        }}
        onBlur={handleBlur}
      />
    </Stack>
  )
}

export default InputSlider
