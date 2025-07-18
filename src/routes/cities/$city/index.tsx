import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { WeatherIcon } from '@/components/weather-icon';
import { TemperatureInput } from '@/components/temperature-input';
import { GameFeedback } from '@/components/game-feedback';
import { GameStats } from '@/components/game-stats';
import { Badge, Button, Card, Text } from '@mantine/core';
import { MapPin, RotateCcw } from 'lucide-react';
import { cityQueries } from '@/operations/city';
import { useSuspenseQuery } from '@tanstack/react-query';
import { City, GameState, TemperatureUnit } from '@/types';
import { Instructions } from '@/components/instructions';
import { LeaderboardModal } from '@/components/leaderboard-modal';
import { UnitToggle } from '@/components/unit-toggle';
import { useEffect, useState } from 'react';
import { convertToCelsius } from '@/utils';
import { GameOver } from '@/components/game-over';
import { MAX_ROUNDS, SCORE, STREAK } from '@/constants';
import { useLocalStorage } from 'usehooks-ts';

export const Route = createFileRoute('/cities/$city/')({
	component: CityRouteComponent,
	beforeLoad: async ({ context, params }) => {
		const cityStep = parseInt(params.city);

		if (cityStep >= MAX_ROUNDS) {
			return redirect({ to: '/game-over' });
		}

		await context.queryClient.ensureQueryData(cityQueries.single(cityStep));
	},
	loader: ({ params }) => {
		const cityStep = parseInt(params.city);

		return {
			cityStep
		};
	}
});

function CityRouteComponent() {
	const navigate = useNavigate();
	const { cityStep } = Route.useLoaderData();
	const { data } = useSuspenseQuery(cityQueries.single(cityStep));
	const currentCity = data as City;

	const [guess, setGuess] = useState('');
	const [feedback, setFeedback] = useState('');
	const [score, setScore] = useLocalStorage(SCORE, 0);
	const [streak, setStreak] = useLocalStorage(STREAK, 0);
	const [gameState, setGameState] = useState<GameState>('playing');
	const [unit, setUnit] = useState<TemperatureUnit>('fahrenheit');

	useEffect(() => {
		if (cityStep === 0) {
			// Reset score and streak
			setScore(0);
			setStreak(0);
		}
	}, [cityStep]);

	const handleGuess = () => {
		if (!currentCity) {
			return;
		}

		const guessNum = Number.parseInt(guess);
		if (isNaN(guessNum)) return;

		// Convert guess to celsius for comparison if needed
		const guessInCelsius = unit === 'fahrenheit' ? convertToCelsius(guessNum) : guessNum;
		const difference = Math.abs(guessInCelsius - currentCity.temp);

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
		if (cityStep === MAX_ROUNDS - 1) {
			setGameState('gameover');
			navigate({ to: '/game-over' });
			return;
		}

		setGameState('playing');
		setGuess('');
		navigate({ to: '/cities/$city', params: { city: `${cityStep + 1}` } });
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-600 via-sky-500 to-blue-700 p-4 pb-12">
			<div className="w-full max-w-md space-y-6">
				<div className="flex items-center justify-between">
					<LeaderboardModal currentScore={score} currentStreak={streak} attempts={cityStep + 1} />
					<div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
						<span className="text-sm text-white">Streak: {streak}</span>
					</div>
				</div>

				<UnitToggle unit={unit} onUnitChange={setUnit} />

				<Card className="border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
					{gameState !== 'gameover' && (
						<div className="pb-4 text-center">
							<div className="mb-2 flex items-center justify-center gap-2">
								<MapPin className="size-8 text-white" />
								<Text className="text-2xl font-bold text-white">{currentCity.name}</Text>
							</div>
							<Badge
								variant="secondary"
								size="lg"
								className="border-white/30 bg-white/20 text-white"
								leftSection={
									<img
										width={25}
										alt={currentCity.country}
										src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${currentCity.countryCode}.svg`}
									/>
								}
							>
								{currentCity.country}
							</Badge>
						</div>
					)}

					<Card.Section className="space-y-6 px-4">
						{gameState !== 'gameover' && <WeatherIcon condition={currentCity.condition} />}

						{gameState === 'playing' && (
							<TemperatureInput
								guess={guess}
								unit={unit}
								cityName={currentCity?.name || ''}
								onGuessChange={setGuess}
								onSubmitGuess={handleGuess}
							/>
						)}

						{(gameState === 'correct' || gameState === 'wrong') && (
							<GameFeedback
								feedback={feedback}
								actualTemp={currentCity?.temp || 0}
								guess={guess}
								unit={unit}
								onNextCity={nextCity}
							/>
						)}

						{gameState === 'gameover' && <GameOver />}

						<GameStats attempts={cityStep + 1} score={score} streak={streak} />
					</Card.Section>
				</Card>

				<Instructions unit={unit} />
			</div>
		</div>
	);
}
