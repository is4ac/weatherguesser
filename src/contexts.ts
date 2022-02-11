import { createContext } from 'react'

export const TempModeContext = createContext({
  toggleTempMode: () => {},
  mode: 'F',
})
