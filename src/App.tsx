import { ThemeProvider } from '@mui/material'
import React, { useEffect } from 'react'
import Routes from './Routes'
import theme from './styles/theme'
import './index.css'

function App(): JSX.Element {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App
