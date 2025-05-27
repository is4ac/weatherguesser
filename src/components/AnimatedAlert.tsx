import { Alert, Transition } from '@mantine/core'
import { ReactNode } from 'react'

interface AnimatedAlertProps {
  show: boolean
  message: string
  color?: 'red' | 'yellow' | 'blue' | 'green'
  icon?: ReactNode
}

export default function AnimatedAlert({ 
  show, 
  message, 
  color = 'red',
  icon 
}: AnimatedAlertProps) {
  return (
    <Transition mounted={show} transition="fade" duration={400}>
      {(styles) => (
        <Alert color={color} icon={icon} style={styles}>
          {message}
        </Alert>
      )}
    </Transition>
  )
}