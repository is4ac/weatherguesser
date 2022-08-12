import { Typography } from '@mui/material'
import React from 'react'

const ScoreDisplay = ({ label, score }: { label: string; score: number }): JSX.Element => {
  return (
    <Typography variant='button'>
      {label}: {score}
    </Typography>
  )
}

export default ScoreDisplay
