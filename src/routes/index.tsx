import { createFileRoute, Link } from '@tanstack/react-router';
import { Container, Title, Text, Button, Stack, Card } from '@mantine/core';

export const Route = createFileRoute('/')({
	component: () => <WeatherGuesser />
});

export function WeatherGuesser() {
	return (
		<Container size="md" py="xl">
			<Stack gap="xl">
				<div className="text-center">
					<Title order={1} size="h1" className="mb-4 text-4xl font-bold text-blue-600">
						WeatherGuesser
					</Title>
					<Text size="lg" c="dimmed">
						Can you guess the weather? Test your meteorological intuition!
					</Text>
				</div>

				<Card shadow="sm" padding="lg" radius="md" withBorder>
					<Stack gap="md">
						<Title order={2} size="h3">
							Welcome to WeatherGuesser
						</Title>
						<Text>
							Test your ability to guess the current temperature in cities around the world! Each
							round presents you with 5 random cities. Get closer to the actual temperature to earn
							more points.
						</Text>
						<Button
							component={Link}
							to="/game"
							variant="filled"
							size="lg"
							className="bg-blue-500 hover:bg-blue-600"
						>
							Start Playing Temperature Guesser
						</Button>
					</Stack>
				</Card>
			</Stack>
		</Container>
	);
}
