import { Badge, Box, Stack, Text, Transition } from '@mantine/core'

interface CityPromptProps {
  location: string
}

export default function CityPrompt({ location }: CityPromptProps) {
  return (
    <Box ta="center">
      <Stack gap="sm" align="center">
        <Text size="lg">
          Guess the current temperature for
        </Text>
        <Transition mounted={true} transition="fade" duration={500}>
          {(styles) => (
            <Badge 
              size="xl" 
              variant="filled" 
              p="md"
              style={styles}
            >
              {location}
            </Badge>
          )}
        </Transition>
      </Stack>
    </Box>
  )
}