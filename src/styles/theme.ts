import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface ThemeOptions {
    custom: {
      margin: number
      palette: {
        warning: {
          main: string
          contrastText: string
        }
        error: {
          main: string
          contrastText: string
        }
      }
    }
  }
  interface Theme {
    custom: {
      margin: number
      palette: {
        warning: {
          main: string
          contrastText: string
        }
        error: {
          main: string
          contrastText: string
        }
      }
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
    palette: {
      warning: {
        main: '#8c442c',
        contrastText: '#ffffff',
      },
      error: {
        main: '#8c2c74',
        contrastText: '#ffffff',
      },
    },
  },
})

const themeCustomComponents = createTheme({
  ...theme,
  components: {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
        standardInfo: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
        standardWarning: {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        },
        standardError: {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.contrastText,
        },
      },
    },
  },
})

export default themeCustomComponents
