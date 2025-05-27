import { Alert, Button, Group, Stack, Text } from '@mantine/core'
import GameRound from '../utils/game-round'

interface GameOverProps {
  gameRound: GameRound
  onButtonClick: (event: React.MouseEvent) => void
}

export default function GameOver({ gameRound, onButtonClick }: GameOverProps) {
  return (
    <Stack align="center" gap="xl">
      <Alert color="green">Round over!</Alert>
      
      <Text fw={500} size="sm" tt="uppercase">
        Final score: <Text component="span" fw={700}>{gameRound.score}</Text>
      </Text>
      
      <Button onClick={onButtonClick} size="md">
        Play Again
      </Button>
    </Stack>
  )
}