import { Alert, Box, Button, Typography } from '@mui/material'
import React from 'react'
import GameRound from 'src/model/game-round'

const GameOver = ({
  gameRound,
  onButtonClick,
}: {
  gameRound: GameRound
  onButtonClick: (event: React.MouseEvent) => void
}): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Alert severity='success'>Round over!</Alert>

      <Typography variant='button' component='span' sx={{ mt: 4 }}>
        Final score:{' '}
        <Typography fontWeight={600} component='span'>
          {gameRound.score}
        </Typography>
      </Typography>

      <Button variant='contained' color='secondary' onClick={onButtonClick} sx={{ mt: 4 }}>
        Play Again
      </Button>
    </Box>
  )
}

export default GameOver
