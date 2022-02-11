import { PaletteMode } from '@mui/material'
import { grey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { createContext } from 'react'

declare module '@mui/material/styles' {
  interface ThemeOptions {
    custom?: {
      margin: number
    }
  }
  interface Theme {
    custom?: {
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

const colorPalette = createTheme({
  palette: {
    primary: {
      main: '#2c748c',
    },
    secondary: {
      main: '#442c8c',
    },
  },
})

export const lightPalette = createTheme({
  palette: {
    primary: {
      main: colorPalette.palette.primary.light,
    },
    secondary: {
      main: colorPalette.palette.secondary.light,
    },
  },
})

export const lighterPalette = createTheme({
  palette: {
    primary: {
      main: lightPalette.palette.primary.light,
    },
    secondary: {
      main: lightPalette.palette.secondary.light,
    },
  },
})

export const darkPalette = createTheme({
  palette: {
    primary: {
      main: colorPalette.palette.primary.dark,
    },
    secondary: {
      main: colorPalette.palette.secondary.dark,
    },
  },
})

const themeCustomComponents = {
  components: {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: colorPalette.palette.primary.main,
          color: colorPalette.palette.primary.contrastText,
        },
        standardInfo: {
          backgroundColor: colorPalette.palette.primary.main,
          color: colorPalette.palette.primary.contrastText,
        },
        standardWarning: {
          backgroundColor: colorPalette.palette.secondary.main,
          color: colorPalette.palette.secondary.contrastText,
        },
        standardError: {
          backgroundColor: colorPalette.palette.secondary.main,
          color: colorPalette.palette.secondary.contrastText,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colorPalette.palette.primary.contrastText,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {},
        switchBase: {
          '&.Mui-checked': {
            // Controls checked color for the thumb
            color: lighterPalette.palette.primary.main,
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: lighterPalette.palette.primary.main,
          },
        },
        checked: {},
        track: {},
      },
    },
  },
}

export const getDesignTokens = (mode: PaletteMode) => ({
  ...themeCustomComponents,
  custom: {
    margin: 4,
  },
  spacing: 4,
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
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            ...colorPalette.palette.primary,
          },
          secondary: {
            ...colorPalette.palette.secondary,
          },
          background: {
            paper: grey[200],
            default: grey[200],
          },
          text: {
            primary: '#000000',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            ...colorPalette.palette.primary,
          },
          secondary: {
            ...colorPalette.palette.secondary,
          },
          background: {
            paper: grey[900],
            default: grey[900],
          },
          text: {
            primary: '#ffffff',
          },
        }),
  },
})

export const ColorModeContext = createContext({ toggleColorMode: () => {} })
