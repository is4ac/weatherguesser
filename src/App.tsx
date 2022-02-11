import { ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Routes from './Routes'
import { getDesignTokens, ColorModeContext } from './styles/theme'
import { TempModeContext } from './contexts'
import './index.css'

function App(): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light')
  const colorModeContext = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )

  const [tempMode, setTempMode] = useState<'F' | 'C'>('F')
  const tempModeContext = useMemo(
    () => ({
      toggleTempMode: () => {
        setTempMode((prevMode) => (prevMode === 'F' ? 'C' : 'F'))
      },
      mode: tempMode,
    }),
    [tempMode],
  )

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light')
  }, [prefersDarkMode])

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])

  return (
    <TempModeContext.Provider value={tempModeContext}>
      <ColorModeContext.Provider value={colorModeContext}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </TempModeContext.Provider>
  )
}

export default App
