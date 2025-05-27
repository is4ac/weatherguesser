import { Text } from '@mantine/core'

interface ScoreDisplayProps {
  label: string
  score: number
}

export default function ScoreDisplay({ label, score }: ScoreDisplayProps) {
  return (
    <Text fw={500} size="sm" tt="uppercase">
      {label}: {score}
    </Text>
  )
}