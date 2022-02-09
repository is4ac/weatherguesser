import { Alert, AlertColor, Grow } from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import React from 'react'

const AnimatedAlert = ({
  show,
  message,
  severity = 'error',
  icon = <ErrorOutlineIcon fontSize='inherit' />,
}: {
  show: boolean
  message: string
  severity?: AlertColor
  icon?: React.ReactNode
}): JSX.Element => {
  return (
    <Grow in={show} timeout={400} easing='ease-in-out'>
      <Alert severity={severity} icon={icon}>
        {message}
      </Alert>
    </Grow>
  )
}

export default AnimatedAlert
