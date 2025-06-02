import { createFileRoute } from '@tanstack/react-router';
import { WeatherIcon } from '@/components/weather-icon';
import { TemperatureInput } from '@/components/temperature-input';
import { GameFeedback } from '@/components/game-feedback';
import { GameStats } from '@/components/game-stats';
import { Badge, Card, Text } from '@mantine/core';
import { MapPin } from 'lucide-react';

export const Route = createFileRoute('/cities/$city/')({
	component: CityRouteComponent,
	loader: ({ params }) => {
		return {
			city: params.city
		};
	}
});

function CityRouteComponent() {
	const { city } = Route.useLoaderData();

	return (
		<>
			<div className="pb-4 text-center">
				<div className="mb-2 flex items-center justify-center gap-2">
					<MapPin className="h-5 w-5 text-white" />
					<Text className="text-2xl font-bold text-white">{currentCity.name}</Text>
				</div>
				<Badge variant="secondary" className="border-white/30 bg-white/20 text-white">
					{currentCity.country}
				</Badge>
			</div>

			<Card.Section className="space-y-6 px-4">
				{/* Weather Icon Display */}
				<WeatherIcon temperature={currentCity.temp} />

				{/* Game State Display */}
				{gameState === 'playing' && (
					<TemperatureInput
						guess={guess}
						unit={unit}
						cityName={currentCity.name}
						onGuessChange={setGuess}
						onSubmitGuess={handleGuess}
					/>
				)}

				{/* Feedback Display */}
				{(gameState === 'correct' || gameState === 'wrong') && (
					<GameFeedback
						feedback={feedback}
						actualTemp={currentCity.temp}
						guess={guess}
						unit={unit}
						onNextCity={nextCity}
					/>
				)}

				{/* Game Stats */}
				<GameStats attempts={attempts} score={score} streak={streak} />
			</Card.Section>
		</>
	);
}
