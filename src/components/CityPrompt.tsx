import { Box, Theme, Typography } from '@mui/material'
import { useTheme } from '@mui/styles'
import { Grow } from '@mui/material'
import React from 'react'

const CityPrompt = ({ location }: { location: string }): JSX.Element => {
  const theme = useTheme<Theme>()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography align='center' lineHeight='1.7rem' variant='body1'>
        Guess the current temperature for
        <br />
        <Grow in={true} timeout={500} easing='ease-in-out'>
          <Typography
            component='span'
            variant='h5'
            lineHeight='1.7rem'
            padding='0.35rem 0.25rem'
            color={theme.palette.secondary.contrastText}
            bgcolor={theme.palette.secondary.main}
            fontWeight={600}
          >
            {location}
          </Typography>
        </Grow>
      </Typography>
    </Box>
  )
}

export default CityPrompt
