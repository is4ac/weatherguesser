import { Button } from '@mui/material'
import React from 'react'

const GuessFormButton = ({
  next,
  onNext,
}: {
  next: boolean
  onNext: (event: React.MouseEvent) => void
}): JSX.Element => {
  return (
    <>
      {next ? (
        <Button color='secondary' variant='contained' onClick={onNext}>
          Next
        </Button>
      ) : (
        <Button color='secondary' variant='contained' type='submit'>
          Submit
        </Button>
      )}
    </>
  )
}

export default GuessFormButton
