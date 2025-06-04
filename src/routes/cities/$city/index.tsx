import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { WeatherIcon } from '@/components/weather-icon';
import { TemperatureInput } from '@/components/temperature-input';
import { GameFeedback } from '@/components/game-feedback';
import { GameStats } from '@/components/game-stats';
import { Badge, Button, Card, Skeleton, Text } from '@mantine/core';
import { MapPin, RotateCcw } from 'lucide-react';
import { cityQueries } from '@/operations/city';
import { useQuery } from '@tanstack/react-query';
import { City, GameState, TemperatureUnit } from '@/types';
import { Instructions } from '@/components/instructions';
import { LeaderboardModal } from '@/components/leaderboard-modal';
import { UnitToggle } from '@/components/unit-toggle';
import { useState } from 'react';
import { convertToCelsius } from '@/utils';

export const Route = createFileRoute('/cities/$city/')({
	component: CityRouteComponent,
	loader: ({ context, params }) => {
		const cityStep = parseInt(params.city);

		context.queryClient.ensureQueryData(cityQueries.single(cityStep));

		return {
			cityStep
		};
	}
});

function CityRouteComponent() {
	const navigate = useNavigate();
	const { cityStep } = Route.useLoaderData();
	const { data, isLoading } = useQuery(cityQueries.single(cityStep));
	const currentCity = data as City | undefined;

	const [guess, setGuess] = useState('');
	const [score, setScore] = useState(0);
	const [attempts, setAttempts] = useState(0);
	const [feedback, setFeedback] = useState('');
	const [gameState, setGameState] = useState<GameState>('playing');
	const [streak, setStreak] = useState(0);
	const [unit, setUnit] = useState<TemperatureUnit>('fahrenheit');

	const handleGuess = () => {
		if (!currentCity) {
			return;
		}

		const guessNum = Number.parseInt(guess);
		if (isNaN(guessNum)) return;

		// Convert guess to celsius for comparison if needed
		const guessInCelsius = unit === 'fahrenheit' ? convertToCelsius(guessNum) : guessNum;
		const difference = Math.abs(guessInCelsius - currentCity.temp);
		setAttempts((prev) => prev + 1);

		if (difference < 1) {
			setFeedback('+10 🎯 Perfect! Exactly right!');
			setScore(score + 10);
			setStreak(streak + 1);
			setGameState('correct');
		} else if (difference <= 2) {
			setFeedback(`+7 🔥 Very close! Within ${unit === 'fahrenheit' ? '4°F' : '2°C'}`);
			setScore(score + 7);
			setStreak(streak + 1);
			setGameState('correct');
		} else if (difference <= 5) {
			setFeedback(`+5 👍 Close! Within ${unit === 'fahrenheit' ? '9°F' : '5°C'}`);
			setScore(score + 5);
			setStreak(streak + 1);
			setGameState('correct');
		} else if (difference <= 10) {
			setFeedback(`+2 🤔 Not bad, within ${unit === 'fahrenheit' ? '18°F' : '10°C'}`);
			setScore(score + 2);
			setStreak(0);
			setGameState('wrong');
		} else {
			setFeedback('❄️ Too far off! Try again next time');
			setStreak(0);
			setGameState('wrong');
		}
	};

	const nextCity = () => {
		if (cityStep === 9) {
			// TODO: game over
			return;
		}

		setGameState('playing');
		setGuess('');
		navigate({ to: '/cities/$city', params: { city: `${cityStep + 1}` } });
	};

	const resetGame = () => {
		navigate({ to: '/cities' });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-600 via-sky-500 to-blue-700 p-4">
			<div className="w-full max-w-md space-y-6">
				{/* Header Stats */}
				<div className="flex items-center justify-between">
					<LeaderboardModal currentScore={score} currentStreak={streak} attempts={attempts} />
					<div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
						<span className="text-sm text-white">Streak: {streak}</span>
					</div>
					<Button
						onClick={resetGame}
						variant="ghost"
						size="sm"
						className="rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
					>
						<RotateCcw className="h-4 w-4" />
					</Button>
				</div>

				{/* Unit Toggle */}
				<UnitToggle unit={unit} onUnitChange={setUnit} />

				{/* Main Game Card */}
				<Card className="border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
					<div className="pb-4 text-center">
						<div className="mb-2 flex items-center justify-center gap-2">
							<MapPin className="size-8 text-white" />
							<Skeleton visible={isLoading} className="h-8 w-fit self-center">
								<Text className="text-2xl font-bold text-white">
									{currentCity?.name || 'Random City'}
								</Text>
							</Skeleton>
						</div>
						<Badge variant="secondary" className="border-white/30 bg-white/20 text-white">
							{currentCity?.country}
						</Badge>
					</div>

					<Card.Section className="space-y-6 px-4">
						{/* Weather Icon Display */}
						<Skeleton circle visible={isLoading} className="w-fit justify-self-center">
							<WeatherIcon temperature={currentCity?.temp || 0} />
						</Skeleton>

						{/* Game State Display */}
						{gameState === 'playing' && (
							<Skeleton visible={isLoading} className="justify-self-center">
								<TemperatureInput
									guess={guess}
									unit={unit}
									cityName={currentCity?.name || ''}
									onGuessChange={setGuess}
									onSubmitGuess={handleGuess}
								/>
							</Skeleton>
						)}

						{/* Feedback Display */}
						{(gameState === 'correct' || gameState === 'wrong') && (
							<GameFeedback
								feedback={feedback}
								actualTemp={currentCity?.temp || 0}
								guess={guess}
								unit={unit}
								onNextCity={nextCity}
							/>
						)}

						{/* Game Stats */}
						<GameStats attempts={cityStep} score={score} streak={streak} />
					</Card.Section>
				</Card>

				{/* Instructions */}
				<Instructions unit={unit} />
			</div>
		</div>
	);
}
