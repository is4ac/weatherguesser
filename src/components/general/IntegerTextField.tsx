import { Box, InputBaseComponentProps, TextField } from '@mui/material'
import React from 'react'

const IntegerTextField = ({
  disabled,
  value,
  inputProps,
  onChange,
  onError,
  onBlur,
}: {
  disabled: boolean
  value: string
  inputProps?: InputBaseComponentProps
  onChange: (value: string) => void
  onError: (error: boolean) => void
  onBlur: () => void
}): JSX.Element => {
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const parsedInt = parseInt(value)
    if (value === '' || value === '-') {
      onError(false)
      onChange(value)
    } else if (Number.isFinite(parsedInt)) {
      onError(false)
      onChange(parsedInt.toString())
    }
  }

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { width: '12ch' },
      }}
    >
      <TextField
        disabled={disabled}
        type='text'
        variant='outlined'
        size='small'
        label='Temp. (°F)'
        value={value}
        onChange={changeHandler}
        onBlur={onBlur}
        inputProps={{ pattern: '-?[0-9]*', style: { textAlign: 'right' }, ...inputProps }}
        title='Whole integers only'
      />
    </Box>
  )
}

export default IntegerTextField
