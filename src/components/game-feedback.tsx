import { Button } from '@mantine/core';
import type { TemperatureUnit } from '../types';
import { convertToFahrenheit } from '../utils';

interface GameFeedbackProps {
	feedback: string;
	actualTemp: number;
	guess: string;
	unit: TemperatureUnit;
	onNextCity: () => void;
}

export function GameFeedback({ feedback, actualTemp, guess, unit, onNextCity }: GameFeedbackProps) {
	const getDisplayTemp = (tempCelsius: number) => {
		return unit === 'fahrenheit' ? convertToFahrenheit(tempCelsius) : tempCelsius;
	};

	const getUnitSymbol = () => (unit === 'fahrenheit' ? '°F' : '°C');

	return (
		<div className="space-y-4 text-center">
			<div className="rounded-lg bg-white/20 p-4">
				<p className="mb-2 font-semibold text-white">{feedback}</p>
				<p className="text-sm text-white/80">
					The actual temperature was{' '}
					<span className="font-bold">
						{getDisplayTemp(actualTemp)}
						{getUnitSymbol()}
					</span>
				</p>
				<p className="text-sm text-white/80">
					Your guess:{' '}
					<span className="font-bold">
						{guess}
						{getUnitSymbol()}
					</span>
				</p>
			</div>

			<Button
				onClick={onNextCity}
				className="w-full border-white/30 bg-white/20 text-white hover:bg-white/30"
			>
				Next City
			</Button>
		</div>
	);
}
