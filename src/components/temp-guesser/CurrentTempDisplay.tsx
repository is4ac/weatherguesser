import { Box, Theme, Typography, useTheme } from '@mui/material'
import React from 'react'

const CurrentTempDisplay = ({ city, temp }: { city: string; temp: number }): JSX.Element => {
  const theme = useTheme<Theme>()

  return (
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
          {temp}
        </Typography>
        °F!
      </Typography>
    </Box>
  )
}

export default CurrentTempDisplay
