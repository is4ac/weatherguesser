import { Group, Stepper, Text } from '@mantine/core'

interface CityStepperProps {
  activeStep: number
  steps: string[]
}

export default function CityStepper({ activeStep, steps }: CityStepperProps) {
  return (
    <Group justify="center" align="center">
      <Text fw={500} size="sm" tt="uppercase">Cities:</Text>
      <Stepper active={activeStep} size="sm">
        {steps.map((_, index) => (
          <Stepper.Step key={index} />
        ))}
      </Stepper>
    </Group>
  )
}