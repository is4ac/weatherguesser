import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface ThemeOptions {
    custom: {
      margin: number
    }
  }
  interface Theme {
    custom: {
      margin: number
    }
  }
}

// https://stackoverflow.com/questions/47977618/accessing-previous-theme-variables-in-createmuitheme.
// const baseTheme = createTheme()

const headingDefaults = {
  fontWeight: 500,
  lineHeight: 1.2,
}

const theme = createTheme({
  spacing: 4,
  palette: {
    primary: {
      main: '#2c748c',
    },
    secondary: {
      main: '#442c8c',
    },
  },
  typography: {
    h1: {
      ...headingDefaults,
      fontSize: '2.25rem',
    },
    h2: {
      ...headingDefaults,
      fontSize: '2rem',
    },
    h3: {
      ...headingDefaults,
      fontSize: '1.75rem',
    },
    h4: {
      ...headingDefaults,
      fontSize: '1.5rem',
    },
    h5: {
      ...headingDefaults,
      fontSize: '1.25rem',
    },
    h6: {
      ...headingDefaults,
      fontSize: '1rem',
    },
  },
  custom: {
    margin: 4,
  },
})

export default theme
