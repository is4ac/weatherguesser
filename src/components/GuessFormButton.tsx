import { Button } from '@mantine/core'

interface GuessFormButtonProps {
  next: boolean
  onNext: (event: React.MouseEvent) => void
}

export default function GuessFormButton({ next, onNext }: GuessFormButtonProps) {
  return next ? (
    <Button onClick={onNext}>
      Next
    </Button>
  ) : (
    <Button type="submit">
      Submit
    </Button>
  )
}