import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'

const CityStepper = ({ activeStep, steps }: { activeStep: number; steps: string[] }): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant='button'>Cities:</Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{''}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
    </Box>
  )
}

export default CityStepper
