import { Box, Container } from '@mui/material'
import { Theme } from '@mui/material/styles'
import { useTheme } from '@mui/styles'
import React, { ReactNode } from 'react'
import NavBar from './NavBar'

const Layout = ({ children }: { children?: ReactNode }): JSX.Element => {
  const theme = useTheme<Theme>()

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <NavBar />
      <Container maxWidth='sm'>
        <Box
          sx={{
            mt: 4,
            ml: theme.custom?.margin,
            mr: theme.custom?.margin,
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}

export default Layout
