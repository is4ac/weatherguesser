import { useState } from 'react';
import { Button, Badge, Card, Text, Skeleton } from '@mantine/core';
import { MapPin, RotateCcw } from 'lucide-react';
import type { City, GameState, TemperatureUnit } from '@/types';
import { convertToCelsius } from '@/utils';
import { LeaderboardModal } from '@/components/leaderboard-modal';
import { UnitToggle } from '@/components/unit-toggle';
import { WeatherIcon } from '@/components/weather-icon';
import { TemperatureInput } from '@/components/temperature-input';
import { GameFeedback } from '@/components/game-feedback';
import { GameStats } from '@/components/game-stats';
import { Instructions } from '@/components/instructions';
import { createFileRoute } from '@tanstack/react-router';
import { cityQueries } from '@/operations/city';
import { useSuspenseQueries } from '@tanstack/react-query';

export const Route = createFileRoute('/')({
	component: () => <GameComponent />,
	beforeLoad: async ({ context }) => {
		await context.queryClient.ensureQueryData(cityQueries.single(0));
		await context.queryClient.ensureQueryData(cityQueries.single(1));
		await context.queryClient.ensureQueryData(cityQueries.single(2));
		await context.queryClient.ensureQueryData(cityQueries.single(3));
		await context.queryClient.ensureQueryData(cityQueries.single(4));
	}
});

function GameComponent() {
	const [guess, setGuess] = useState('');
	const [score, setScore] = useState(0);
	const [attempts, setAttempts] = useState(0);
	const [step, setStep] = useState(0);
	const [feedback, setFeedback] = useState('');
	const [gameState, setGameState] = useState<GameState>('playing');
	const [streak, setStreak] = useState(0);
	const [unit, setUnit] = useState<TemperatureUnit>('fahrenheit');
	const cities = useSuspenseQueries({
		queries: [
			cityQueries.single(0),
			cityQueries.single(1),
			cityQueries.single(2),
			cityQueries.single(3),
			cityQueries.single(4)
		]
	});
	const [currentCity, setCurrentCity] = useState<City>(cities[step]?.data);

	const accuracy = attempts > 0 ? Math.round((score / (attempts * 10)) * 100) : 0;

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

		if (difference === 0) {
			setFeedback('🎯 Perfect! Exactly right!');
			setScore(score + 10);
			setStreak(streak + 1);
			setGameState('correct');
		} else if (difference <= 2) {
			setFeedback('🔥 Very close! Within 2°C');
			setScore(score + 7);
			setStreak(streak + 1);
			setGameState('correct');
		} else if (difference <= 5) {
			setFeedback('👍 Close! Within 5°C');
			setScore(score + 5);
			setStreak(streak + 1);
			setGameState('correct');
		} else if (difference <= 10) {
			setFeedback('🤔 Not bad, within 10°C');
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
		if (step === 4) {
			// TODO: game over

			return;
		}

		setGuess('');
		setGameState('playing');
		setFeedback('');
		setCurrentCity(cities[step + 1]?.data);
		setStep((prev) => prev + 1);
	};

	const resetGame = () => {
		setScore(0);
		setAttempts(0);
		setStep(0);
		setStreak(0);
		setGuess('');
		setGameState('playing');
		setFeedback('');
		setCurrentCity(cities[0]?.data ?? null);
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-600 via-sky-500 to-blue-700 p-4">
			<div className="w-full max-w-md space-y-6">
				{/* Header Stats */}
				<div className="flex items-center justify-between">
					<LeaderboardModal
						currentScore={score}
						currentAccuracy={accuracy}
						currentStreak={streak}
						attempts={attempts}
					/>
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
					{currentCity ? (
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
					) : (
						<Skeleton />
					)}
				</Card>

				{/* Instructions */}
				<Instructions unit={unit} />
			</div>
		</div>
	);
}
