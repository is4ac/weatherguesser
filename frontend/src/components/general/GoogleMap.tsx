import { Box, Theme, useTheme } from '@mui/material'
import React from 'react'

const GoogleMap = ({ location }: { location: string }): JSX.Element => {
  const theme = useTheme<Theme>()
  const googleMapsKey = 'AIzaSyBmOybe2xJQa8qhC4j1pw-UQrSHc6HdWlk'

  let params = `key=${googleMapsKey}&q=${location.replace(' ', '+')}`

  return (
    <Box
      sx={{
        // Trick for making iframe responsive: https://stackoverflow.com/questions/17838607/making-an-iframe-responsive
        position: 'relative',
        pb: '75%', // 4:3 ratio
        pt: '25px',
        height: 0,
        iframe: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
      }}
    >
      <iframe
        title='Map'
        width='525'
        height='400'
        style={{ border: '0', filter: theme.palette.mode === 'dark' ? 'invert(90%)' : undefined }}
        loading='lazy'
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?${params}`}
      ></iframe>
    </Box>
  )
}

export default GoogleMap
