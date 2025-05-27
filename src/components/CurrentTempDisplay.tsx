import { Badge, Box, Text } from '@mantine/core'

interface CurrentTempDisplayProps {
  city: string
  temp: number
}

export default function CurrentTempDisplay({ city, temp }: CurrentTempDisplayProps) {
  return (
    <Box ta="center">
      <Text size="md">
        The current temperature in{' '}
        <Badge variant="filled" size="lg">
          {city}
        </Badge>
        {' '}is{' '}
        <Text component="span" fw={700}>
          {temp}
        </Text>
        °F!
      </Text>
    </Box>
  )
}